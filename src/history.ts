import type { HomeAssistant } from "./types";

interface CacheEntry {
  at: number;
  points: number[];
}

interface HistoryPoint {
  s?: string;
  state?: string;
  lu?: number;
  last_updated?: string;
}

const cache = new Map<string, CacheEntry>();

export interface SparklineOptions {
  minutes?: number;
  width?: number;
  height?: number;
  ttl?: number;
}

/** Build an SVG polyline (viewBox units) from numeric history values. */
export function toPolyline(values: number[], width = 100, height = 24): string {
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width;
      const y = height - ((value - min) / span) * (height - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Fetch recorder history for the visible rows. History is best effort: any
 * failure simply hides the sparklines instead of breaking the card.
 */
export async function fetchSparklines(
  hass: HomeAssistant,
  entityIds: string[],
  options: SparklineOptions = {}
): Promise<Record<string, string>> {
  const { minutes = 60, width = 100, height = 24, ttl = 60_000 } = options;
  if (entityIds.length === 0) return {};
  if (cache.size > 500) cache.clear();

  const now = Date.now();
  const stale = entityIds.filter((id) => {
    const entry = cache.get(id);
    return !entry || now - entry.at > ttl;
  });

  if (stale.length > 0) {
    try {
      const result = await hass.callWS<Record<string, HistoryPoint[]>>({
        type: "history/history_during_period",
        start_time: new Date(now - minutes * 60_000).toISOString(),
        end_time: new Date(now).toISOString(),
        entity_ids: stale,
        minimal_response: true,
        no_attributes: true,
        significant_changes_only: false,
      });

      for (const entityId of stale) {
        const series = result?.[entityId];
        if (!Array.isArray(series)) {
          cache.delete(entityId);
          continue;
        }
        const points = series
          .map((point) => Number(point.s ?? point.state))
          .filter((value) => Number.isFinite(value));
        cache.set(entityId, { at: now, points });
      }
    } catch {
      for (const entityId of stale) cache.delete(entityId);
      return {};
    }
  }

  const sparklines: Record<string, string> = {};
  for (const entityId of entityIds) {
    const entry = cache.get(entityId);
    if (!entry || entry.points.length < 2) continue;
    sparklines[entityId] = toPolyline(entry.points, width, height);
  }
  return sparklines;
}
