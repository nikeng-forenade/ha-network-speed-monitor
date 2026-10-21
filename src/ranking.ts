import type { CounterRateTracker } from "./counter";
import type { SourceConfig } from "./discovery";
import type { Direction, HomeAssistant, Scope, SortDirection } from "./types";

export type ReadingStatus = "ok" | "warmup" | "stale" | "unavailable";

export interface Reading {
  entityId: string;
  deviceId?: string;
  name: string;
  icon?: string;
  direction: Direction;
  mbps: number | null;
  sampledAt: number | null;
  ageMs: number | null;
  status: ReadingStatus;
  entityIds: string[];
  isCounter: boolean;
  unit: string;
}

export interface EvaluateOptions {
  now: number;
  staleAfterMs: number;
  tracker: CounterRateTracker;
}

function parseNumber(value: string): number | null {
  if (value === undefined || value === null) return null;
  const trimmed = String(value).trim();
  if (trimmed === "" || trimmed === "unavailable" || trimmed === "unknown") return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

function sampleTime(state: { last_updated?: string; last_changed?: string }): number | null {
  for (const value of [state.last_updated, state.last_changed]) {
    if (!value) continue;
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

export function evaluateSources(
  hass: HomeAssistant,
  sources: SourceConfig[],
  options: EvaluateOptions
): Reading[] {
  const { now, staleAfterMs, tracker } = options;
  const readings: Reading[] = [];

  for (const source of sources) {
    const state = hass.states[source.entityId];
    const base: Omit<Reading, "mbps" | "sampledAt" | "ageMs" | "status"> = {
      entityId: source.entityId,
      deviceId: source.deviceId,
      name: source.name,
      icon: source.icon,
      direction: source.direction,
      entityIds: [source.entityId],
      isCounter: source.kind === "counter",
      unit: source.unit,
    };

    if (!state) {
      readings.push({ ...base, mbps: null, sampledAt: null, ageMs: null, status: "unavailable" });
      continue;
    }

    const value = parseNumber(state.state);
    if (value === null || value < 0) {
      readings.push({ ...base, mbps: null, sampledAt: null, ageMs: null, status: "unavailable" });
      continue;
    }

    const at = sampleTime(state);

    if (source.kind === "rate") {
      const mbps = value * source.factor;
      if (!Number.isFinite(mbps)) {
        readings.push({ ...base, mbps: null, sampledAt: at, ageMs: null, status: "unavailable" });
        continue;
      }
      const ageMs = at === null ? null : Math.max(0, now - at);
      readings.push({
        ...base,
        mbps,
        sampledAt: at,
        ageMs,
        status: ageMs !== null && ageMs > staleAfterMs ? "stale" : "ok",
      });
      continue;
    }

    const bytes = value * source.factor;
    const rate: ReturnType<CounterRateTracker["update"]> =
      at === null ? null : tracker.update(`${source.entityId}:${source.factor}`, bytes, at);
    const ageMs = rate === null ? null : Math.max(0, now - rate.at);
    readings.push({
      ...base,
      mbps: rate?.mbps ?? null,
      sampledAt: rate?.at ?? null,
      ageMs,
      status:
        rate === null
          ? "warmup"
          : ageMs !== null && ageMs > staleAfterMs
            ? "stale"
            : "ok",
    });
  }

  return readings;
}

export interface RankedRow {
  rank: number;
  reading: Reading;
  /** Bar fill 0..1, relative to the scale (configured max speed or the top reading). */
  ratio: number;
  level: "normal" | "warn" | "critical";
}

export interface RankOptions {
  limit: number;
  sort: SortDirection;
  maxSpeed?: number;
  warnThreshold?: number;
  criticalThreshold?: number;
}

export interface RankResult {
  rows: RankedRow[];
  total: number;
  scale: number;
  candidates: number;
}

interface GroupedReading {
  reading: Reading;
  entityIds: string[];
}

function groupByDevice(readings: Reading[]): GroupedReading[] {
  const groups = new Map<string, GroupedReading>();
  for (const reading of readings) {
    const key = reading.deviceId ? `d:${reading.deviceId}:${reading.direction}` : `e:${reading.entityId}`;
    const existing = groups.get(key);
    if (!existing) {
      groups.set(key, { reading: { ...reading, entityIds: [...reading.entityIds] }, entityIds: [...reading.entityIds] });
      continue;
    }
    existing.entityIds.push(...reading.entityIds);
    if ((reading.mbps ?? -1) > (existing.reading.mbps ?? -1)) {
      const entityIds = existing.entityIds;
      existing.reading = { ...reading, entityIds };
    } else {
      existing.reading.entityIds = existing.entityIds;
    }
  }
  return [...groups.values()];
}

export function rankReadings(
  readings: Reading[],
  scope: Scope,
  options: RankOptions
): RankResult {
  const usable = readings.filter(
    (reading) => reading.mbps !== null && Number.isFinite(reading.mbps)
  );

  const grouped = scope === "device" ? groupByDevice(usable).map((group) => group.reading) : usable;

  const sorted = [...grouped].sort((a, b) => {
    const delta = (b.mbps ?? 0) - (a.mbps ?? 0);
    return options.sort === "asc" ? -delta : delta;
  });

  const top = sorted.slice(0, Math.max(0, options.limit));
  const configuredScale = options.maxSpeed && options.maxSpeed > 0 ? options.maxSpeed : 0;
  const highest = sorted.reduce((max, reading) => Math.max(max, reading.mbps ?? 0), 0);
  const scale = configuredScale > 0 ? configuredScale : Math.max(highest, 1);

  const warn = options.warnThreshold ?? 75;
  const critical = options.criticalThreshold ?? 90;

  const rows: RankedRow[] = top.map((reading, index) => {
    const ratio = Math.min(1, Math.max(0, (reading.mbps ?? 0) / scale));
    const percent = ratio * 100;
    const level: RankedRow["level"] =
      configuredScale > 0 && percent >= critical
        ? "critical"
        : configuredScale > 0 && percent >= warn
          ? "warn"
          : "normal";
    return { rank: index + 1, reading, ratio, level };
  });

  return {
    rows,
    total: top.reduce((sum, reading) => sum + (reading.mbps ?? 0), 0),
    scale,
    candidates: sorted.length,
  };
}
