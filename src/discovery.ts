import type {
  Direction,
  HomeAssistant,
  ManualPair,
  NetworkSpeedMonitorConfig,
} from "./types";
import { parseUnit } from "./units";

export interface SourceConfig {
  entityId: string;
  deviceId?: string;
  platform: string;
  direction: Direction;
  kind: "rate" | "counter";
  /** Mbps per unit for rates, bytes per unit for counters. */
  factor: number;
  unit: string;
  name: string;
  icon?: string;
  entityCategory?: string;
  manual: boolean;
}

const DOWNLOAD_PATTERN =
  /\b(download|downloads|down|dl|rx|receive[ds]?|receiving|inbound|ingress|nedladdning|herunterladen|descarga)\b/i;
const UPLOAD_PATTERN =
  /\b(upload|uploads|up|ul|tx|transmit(ted|ting)?|outbound|egress|uppladdning|hochladen|subida)\b/i;

const RATE_HINT = /speed|rate|bandwidth|download|upload|throughput|traffic|mbps|kbps|gbps/i;

/** Words that are noise once the reading is displayed as a ranked device row. */
const NOISE =
  /\b(download|downloads|upload|uploads|down|up|dl|ul|rx|tx|receive[ds]?|transmit(ted|ting)?|inbound|outbound|ingress|egress|speed|rate|throughput|bandwidth|traffic|total|current|now|utilization|utilisation)\b/gi;

export function detectDirection(text: string): Direction | null {
  const normalized = text.replace(/[_.]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
  const down = DOWNLOAD_PATTERN.test(normalized);
  const up = UPLOAD_PATTERN.test(normalized);
  if (down === up) return null;
  return down ? "download" : "upload";
}

export function cleanName(raw: string): string {
  const source = raw.replace(/\s+/g, " ").trim();
  const stripped = source
    .replace(NOISE, " ")
    .replace(/[\s|:_–-]{2,}/g, " ")
    .replace(/^[\s|:_–-]+|[\s|:_–-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return stripped || source;
}

function textFor(entityId: string, attributes: Record<string, unknown>, extra: string): string {
  const friendly = typeof attributes.friendly_name === "string" ? attributes.friendly_name : "";
  return [entityId, friendly, extra].filter(Boolean).join(" ");
}

/**
 * Turns Home Assistant entities into ranked bandwidth sources.
 *
 * Discovery is intentionally conservative: a sensor only becomes a candidate
 * when its unit can be parsed as a bit/byte rate or counter *and* either the
 * device class or its name indicates network traffic.
 */
export function buildSources(
  hass: HomeAssistant,
  config: NetworkSpeedMonitorConfig
): SourceConfig[] {
  const registry = hass.entities ?? {};
  const states = hass.states ?? {};
  const includeEntities = new Set(config.include_entities ?? []);
  const excludeEntities = new Set(config.exclude_entities ?? []);
  const includeIntegrations = config.include_integrations ?? [];
  const excludeIntegrations = config.exclude_integrations ?? [];
  const overrides = config.name_overrides ?? {};

  const manualByEntity = new Map<string, { pair: ManualPair; direction: Direction }>();
  for (const pair of config.pairs ?? []) {
    if (pair.download) manualByEntity.set(pair.download, { pair, direction: "download" });
    if (pair.upload) manualByEntity.set(pair.upload, { pair, direction: "upload" });
  }

  const sources: SourceConfig[] = [];
  const seen = new Set<string>();

  for (const entityId of Object.keys(states)) {
    if (seen.has(entityId)) continue;
    if (excludeEntities.has(entityId)) continue;

    const state = states[entityId];
    const entry = registry[entityId];
    if (!state) continue;
    if (entry?.disabled_by || entry?.hidden_by) continue;

    const manual = manualByEntity.get(entityId);
    if (includeEntities.size > 0 && !includeEntities.has(entityId) && !manual) continue;

    const platform = entry?.platform ?? "unknown";
    if (includeIntegrations.length > 0 && !includeIntegrations.includes(platform) && !manual) {
      continue;
    }
    if (excludeIntegrations.includes(platform) && !manual) continue;

    const attributes = (state.attributes ?? {}) as Record<string, unknown>;
    const unit =
      (attributes.unit_of_measurement as string | undefined) ??
      entry?.unit_of_measurement ??
      undefined;
    const parsed = parseUnit(unit);
    if (!parsed) continue;

    const deviceClass =
      (attributes.device_class as string | undefined) ??
      entry?.original_device_class ??
      entry?.device_class ??
      undefined;

    const hintText = textFor(entityId, attributes, String(entry?.translation_key ?? ""));

    if (parsed.kind === "counter") {
      const looksLikeCounter =
        deviceClass === "data_size" ||
        /total|traffic|bytes|counter|transferred|usage|volume/i.test(hintText);
      if (!looksLikeCounter) continue;
    } else if (deviceClass !== "data_rate" && !RATE_HINT.test(hintText)) {
      continue;
    }

    const direction = manual?.direction ?? detectDirection(hintText);
    if (!direction) continue;

    const device = entry?.device_id ? hass.devices?.[entry.device_id] : undefined;
    const rawName =
      manual?.pair.name ??
      overrides[entityId] ??
      (attributes.friendly_name as string | undefined) ??
      entry?.name ??
      entry?.original_name ??
      device?.name_by_user ??
      device?.name ??
      entityId;

    const name = manual?.pair.name ?? overrides[entityId] ?? cleanName(String(rawName));

    sources.push({
      entityId,
      deviceId: entry?.device_id ?? undefined,
      platform,
      direction,
      kind: parsed.kind,
      factor: parsed.factor,
      unit: parsed.unit,
      name,
      icon:
        manual?.pair.icon ??
        (attributes.icon as string | undefined) ??
        entry?.icon ??
        undefined,
      entityCategory: entry?.entity_category ?? undefined,
      manual: Boolean(manual),
    });
    seen.add(entityId);
  }

  return sources;
}

/** Integrations that currently expose at least one bandwidth-like sensor. */
export function availableIntegrations(hass: HomeAssistant): string[] {
  const platforms = new Set<string>();
  for (const entry of Object.values(hass.entities ?? {})) {
    if (entry.platform) platforms.add(entry.platform);
  }
  return [...platforms].sort();
}
