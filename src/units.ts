/**
 * Unit handling for bandwidth sensors.
 *
 * Home Assistant integrations expose wildly different units. The distinction
 * between bits (`b`, `bit`) and bytes (`B`, `byte`) is case sensitive, so the
 * parsing below is deliberately explicit instead of lowercasing everything.
 */

export type UnitKind = "rate" | "counter";

export interface ParsedUnit {
  /** `rate` for per-second sensors, `counter` for cumulative counters. */
  kind: UnitKind;
  /** Mbps per unit for rates, bytes per unit for counters. */
  factor: number;
  /** True when the unit uses binary prefixes (Ki, Mi, Gi, ...). */
  binary: boolean;
  /** Original unit string. */
  unit: string;
}

const DECIMAL: Record<string, number> = {
  "": 1,
  k: 1e3,
  m: 1e6,
  g: 1e9,
  t: 1e12,
  p: 1e15,
};

const BINARY: Record<string, number> = {
  "": 1,
  ki: 1024,
  mi: 1024 ** 2,
  gi: 1024 ** 3,
  ti: 1024 ** 4,
  pi: 1024 ** 5,
};

const PREFIX_WORDS: Record<string, string> = {
  kilo: "k",
  mega: "m",
  giga: "g",
  tera: "t",
  peta: "p",
  kibi: "ki",
  mebi: "mi",
  gibi: "gi",
  tebi: "ti",
  pebi: "pi",
  ki: "ki",
  mi: "mi",
  gi: "gi",
  ti: "ti",
  pi: "pi",
  k: "k",
  m: "m",
  g: "g",
  t: "t",
  p: "p",
  "": "",
};

const RATE_SUFFIX = /^(.*?)(?:\/sec(?:ond)?s?|\/s|persec|persecond|ps)$/i;

function splitUnit(value: string): { prefix: string; bytes: boolean } | null {
  const word =
    /^(kilo|mega|giga|tera|peta|kibi|mebi|gibi|tebi|pebi|ki|mi|gi|ti|pi|k|m|g|t|p)?(bits?|bytes?)$/i.exec(
      value
    );
  if (word) {
    const prefix = PREFIX_WORDS[(word[1] ?? "").toLowerCase()];
    if (prefix === undefined) return null;
    return { prefix, bytes: word[2].toLowerCase().startsWith("byte") };
  }

  const short = /^([a-zA-Z]{0,2})(b|B|o)$/.exec(value);
  if (short) {
    const prefix = PREFIX_WORDS[short[1].toLowerCase()];
    if (prefix === undefined) return null;
    return { prefix, bytes: short[2] !== "b" };
  }

  return null;
}

export function parseUnit(raw?: string | null): ParsedUnit | null {
  if (raw === undefined || raw === null) return null;
  let value = String(raw).trim().replace(/\s+/g, "");
  if (!value) return null;

  let isRate = false;
  const rateMatch = RATE_SUFFIX.exec(value);
  if (rateMatch && rateMatch[1]) {
    isRate = true;
    value = rateMatch[1];
  }

  const split = splitUnit(value);
  if (!split) return null;

  const binary = split.prefix.endsWith("i");
  const scale = (binary ? BINARY : DECIMAL)[split.prefix];
  if (!scale) return null;

  const bytesPerUnit = split.bytes ? scale : scale / 8;

  return {
    kind: isRate ? "rate" : "counter",
    factor: isRate ? (bytesPerUnit * 8) / 1e6 : bytesPerUnit,
    binary,
    unit: String(raw),
  };
}

/** Convert a rate reading in its native unit to Mbps. */
export function convertToMbps(value: number, factor: number): number {
  return value * factor;
}

export function formatRate(mbps: number, unit: "Mbps" | "MBps", decimals = 0): string {
  const value = unit === "MBps" ? mbps / 8 : mbps;
  const digits = value >= 100 ? 0 : decimals;
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);
}

/** Compact grouped number for the totals footer. */
export function formatTotal(mbps: number, unit: "Mbps" | "MBps"): string {
  return formatRate(mbps, unit, 0);
}
