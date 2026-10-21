import { describe, expect, it } from "vitest";
import { formatRate, parseUnit } from "../src/units";

describe("parseUnit", () => {
  it("parses bit rate units to Mbps", () => {
    expect(parseUnit("bit/s")?.factor).toBeCloseTo(1e-6);
    expect(parseUnit("kbit/s")?.factor).toBeCloseTo(1e-3);
    expect(parseUnit("Mbit/s")?.factor).toBeCloseTo(1);
    expect(parseUnit("Gbit/s")?.factor).toBeCloseTo(1e3);
    expect(parseUnit("Mbps")?.factor).toBeCloseTo(1);
    expect(parseUnit("kbps")?.factor).toBeCloseTo(1e-3);
    expect(parseUnit("Mbit/s")?.kind).toBe("rate");
  });

  it("distinguishes bytes from bits", () => {
    expect(parseUnit("B/s")?.factor).toBeCloseTo(8e-6);
    expect(parseUnit("kB/s")?.factor).toBeCloseTo(8e-3);
    expect(parseUnit("MB/s")?.factor).toBeCloseTo(8);
    expect(parseUnit("MBps")?.factor).toBeCloseTo(8);
    expect(parseUnit("mbps")?.factor).toBeCloseTo(1);
  });

  it("supports binary prefixes", () => {
    expect(parseUnit("KiB/s")?.binary).toBe(true);
    expect(parseUnit("KiB/s")?.factor).toBeCloseTo((1024 * 8) / 1e6);
    expect(parseUnit("MiB/s")?.factor).toBeCloseTo((1024 * 1024 * 8) / 1e6);
  });

  it("recognises cumulative byte counters", () => {
    const bytes = parseUnit("B");
    expect(bytes?.kind).toBe("counter");
    expect(bytes?.factor).toBe(1);

    const kb = parseUnit("kB");
    expect(kb?.kind).toBe("counter");
    expect(kb?.factor).toBe(1000);

    const mib = parseUnit("MiB");
    expect(mib?.factor).toBe(1024 * 1024);
  });

  it("rejects unsupported units", () => {
    expect(parseUnit(undefined)).toBeNull();
    expect(parseUnit("")).toBeNull();
    expect(parseUnit("kWh")).toBeNull();
    expect(parseUnit("°C")).toBeNull();
    expect(parseUnit("%")).toBeNull();
  });
});

describe("formatRate", () => {
  it("formats Mbps and MB/s", () => {
    expect(formatRate(1589.4, "Mbps", 0).replace(/\s/g, " ")).toMatch(/^1[\s,.]?589$/);
    expect(formatRate(80, "MBps", 0)).toBe("10");
  });

  it("handles non finite values", () => {
    expect(formatRate(Number.NaN, "Mbps", 1)).toBe("0");
  });
});
