import { describe, expect, it } from "vitest";
import { CounterRateTracker } from "../src/counter";

const START = Date.parse("2026-01-01T00:00:00.000Z");

describe("CounterRateTracker", () => {
  it("returns null until a second sample exists", () => {
    const tracker = new CounterRateTracker();
    expect(tracker.update("sensor.a", 1000, START)).toBeNull();
  });

  it("computes Mbps from the byte delta and elapsed time", () => {
    const tracker = new CounterRateTracker();
    tracker.update("sensor.a", 0, START);
    // 12_500_000 bytes in 10 s -> 10 Mbps
    const rate = tracker.update("sensor.a", 12_500_000, START + 10_000);
    expect(rate?.mbps).toBeCloseTo(10);
    expect(rate?.at).toBe(START + 10_000);
  });

  it("uses actual sample timestamps, not a fixed interval", () => {
    const tracker = new CounterRateTracker();
    tracker.update("sensor.a", 0, START);
    const rate = tracker.update("sensor.a", 1_250_000, START + 1000);
    expect(rate?.mbps).toBeCloseTo(10);
  });

  it("treats a counter reset as traffic since the reset", () => {
    const tracker = new CounterRateTracker();
    tracker.update("sensor.a", 5_000_000, START);
    const rate = tracker.update("sensor.a", 1_250_000, START + 1000);
    expect(rate?.mbps).toBeCloseTo(10);
  });

  it("drops the baseline after a long gap", () => {
    const tracker = new CounterRateTracker({ staleMs: 60_000 });
    tracker.update("sensor.a", 0, START);
    expect(tracker.update("sensor.a", 1_000_000, START + 120_000)).toBeNull();
    expect(tracker.get("sensor.a")).toBeUndefined();
  });

  it("ignores duplicate timestamps", () => {
    const tracker = new CounterRateTracker();
    tracker.update("sensor.a", 0, START);
    const rate = tracker.update("sensor.a", 1_250_000, START + 1000);
    expect(rate?.mbps).toBeCloseTo(10);
    const duplicate = tracker.update("sensor.a", 2_500_000, START + 1000);
    expect(duplicate?.mbps).toBeCloseTo(10);
  });

  it("rejects implausible readings", () => {
    const tracker = new CounterRateTracker({ maxMbps: 100 });
    tracker.update("sensor.a", 0, START);
    expect(tracker.update("sensor.a", 1e15, START + 1000)).toBeNull();
  });

  it("prunes old entries", () => {
    const tracker = new CounterRateTracker();
    tracker.update("sensor.a", 0, START);
    tracker.update("sensor.a", 1_250_000, START + 1000);
    tracker.prune(1000, START + 10_000);
    expect(tracker.get("sensor.a")).toBeUndefined();
  });
});
