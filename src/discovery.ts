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
  /** True for interface/aggregate sensors (WAN, LAN, VPN tunnel, ...). */
  aggregate: boolean;
  /** Group label used for aggregates, e.g. `WAN` or `NordVPN`. */
  label: string;
  /** Detection confidence, used for debugging and the editor preview. */
  confidence: number;
}

const DOWNLOAD_PATTERN =
  /\b(download|downloads|down|dl|rx|recv|receive[ds]?|receiving|inbound|ingress|in|nedladdning|herunterladen|descarga)\b/i;
const UPLOAD_PATTERN =
  /\b(upload|uploads|up|ul|tx|send|sent|transmit(ted|ting)?|outbound|egress|out|uppladdning|hochladen|subida)\b/i;

const RATE_HINT = /speed|rate|bandwidth|download|upload|throughput|traffic|mbps|kbps|gbps/i;

/** Throughput that is definitely not network traffic. */
const NON_NETWORK = /\b(disk|storage|hdd|ssd|drive|memory|ram|swap|cpu|gpu|fan|temperature)\b/i;

/**
 * Interface level sources. Their traffic is the sum of many devices, so they
 * are kept out of the per-device ranking by default.
 */
const AGGREGATE_HINT =
  /\b(wan|wan6|lan|wlan|guest|vpn|nordvpn|wireguard|openvpn|ipsec|tun\d*|wg\d*|pppoe\d*|interface|iface|opt\d+|bridge|uplink|internet|eth\d+|igb\d+|em\d+|re\d+|vtnet\d+|lagg\d+|br\d+|bond\d+|port\s?\d+|if\s?\d+|sfp\d*|xe-?\d+|ae\d+|swp\d+|te\d+|ge\d+)\b/i;

/** Words that are noise once the reading is displayed as a ranked device row. */
const NOISE =
  /\b(download|downloads|upload|uploads|down|up|dl|ul|rx|tx|in|out|receive[ds]?|sent|transmit(ted|ting)?|inbound|outbound|ingress|egress|speed|rate|throughput|bandwidth|traffic|total|bytes?|current|now|utilization|utilisation)\b/gi;

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

/**
 * Label for an interface level source, e.g. `OPNsense WAN In` -> `OPNsense WAN`,
 * `NordVPN out` -> `NordVPN`.
 */
export function aggregateLabel(raw: string): string {
  const base = cleanName(raw);
  const stripped = base
    .replace(/\b(in|out|rx|tx|sent|recv|received|bytes?|kbps|mbps|gbps|bps|per|second|sec)\b/gi, " ")
    .replace(/[\s|:_–-]{2,}/g, " ")
    .replace(/^[\s|:_–-]+|[\s|:_–-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return stripped || base;
}

const INTERFACE_RULES: Array<[RegExp, string | ((match: RegExpMatchArray) => string)]> = [
  [/\bnordvpn\b/i, "NordVPN"],
  [/\bwireguard\b|\bwg(\d+)\b/i, (match) => (match[1] ? `WireGuard ${match[1]}` : "WireGuard")],
  [/\bopenvpn\b/i, "OpenVPN"],
  [/\bipsec\b/i, "IPsec"],
  [/\btailscale\b/i, "Tailscale"],
  [/\bvpn\b/i, "VPN"],
  [/\bwan6\b/i, "WAN6"],
  [/\bwan\b/i, "WAN"],
  [/\bwlan(\d*)\b/i, (match) => `WLAN${match[1] ?? ""}`],
  [/\blan(\d*)\b/i, (match) => `LAN${match[1] ?? ""}`],
  [/\bopt(\d+)\b/i, (match) => `OPT${match[1]}`],
  [/\bpppoe\b/i, "PPPoE"],
  [/\bguest\b/i, "Guest"],
  [/\btun(\d+)\b/i, (match) => `TUN${match[1]}`],
  [/\b(eth|igb|em|re|vtnet|lagg|br|bond|pppoe|port|if|sfp|xe|ae|swp|te|ge)\s?(\d+)\b/i, (match) => `${match[1].toUpperCase()}${match[2]}`],
];

/**
 * Interfaces are usually only identifiable from the entity id, because the
 * friendly name is shared across them (`Traffic In Rate` for every interface
 * in the OPNsense integration).
 */
export function interfaceLabel(entityId: string, hintText: string, fallback: string): string {
  const slug = entityId.includes(".") ? entityId.slice(entityId.indexOf(".") + 1) : entityId;
  const haystack = `${slug.replace(/_/g, " ")} ${hintText}`;
  for (const [pattern, label] of INTERFACE_RULES) {
    const match = pattern.exec(haystack);
    if (match) return typeof label === "function" ? label(match) : label;
  }
  return fallback;
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
    // Underscores and dots are word characters, so `\b` would not match `wan`
    // inside `sensor.fw_wan_rx`. Normalise before keyword tests.
    const hintWords = hintText.replace(/[._]/g, " ");

    if (parsed.kind === "counter") {
      const looksLikeCounter =
        deviceClass === "data_size" ||
        /total|traffic|bytes|counter|transferred|usage|volume/i.test(hintText);
      if (!looksLikeCounter) continue;
    } else if (
      deviceClass !== "data_rate" &&
      !RATE_HINT.test(hintWords) &&
      !AGGREGATE_HINT.test(hintWords)
    ) {
      // A rate unit alone is not enough (disk and memory throughput use the
      // same units), but interface names such as `WAN in` are a clear signal.
      continue;
    }
    if (deviceClass !== "data_rate" && NON_NETWORK.test(hintWords)) continue;

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
    const aggregate = AGGREGATE_HINT.test(`${entityId.replace(/[._]/g, " ")} ${hintWords}`);

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
      aggregate,
      label: aggregate
        ? interfaceLabel(entityId, hintWords, aggregateLabel(String(rawName)))
        : name,
      confidence: aggregate ? 0.6 : manual ? 1 : 0.9,
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
