import { describe, expect, it } from "vitest";
import { CounterRateTracker } from "../src/counter";
import { buildSources } from "../src/discovery";
import { evaluateSources, rankReadings, type Reading } from "../src/ranking";
import { makeHass } from "./helpers";

function reading(
  name: string,
  mbps: number | null,
  direction: "download" | "upload" = "download",
  deviceId?: string
): Reading {
  const entityId = `sensor.${name.toLowerCase().replace(/\s+/g, "_")}`;
  return {
    entityId,
    deviceId,
    name,
    direction,
    mbps,
    sampledAt: 0,
    ageMs: 0,
    status: "ok",
    entityIds: [entityId],
    isCounter: false,
    unit: "Mbit/s",
  };
}

describe("rankReadings", () => {
  const readings = [
    reading("Desktop-PC", 845),
    reading("NAS Server", 412),
    reading("Laptop", 92),
    reading("iPhone", 38),
    reading("Laptop upload", 48, "upload"),
    reading("Offline", null),
  ];

  it("sorts descending, limits and totals the top rows", () => {
    const result = rankReadings(readings, "entity", { limit: 3, sort: "desc" });
    expect(result.rows.map((row) => row.reading.name)).toEqual([
      "Desktop-PC",
      "NAS Server",
      "Laptop",
    ]);
    expect(result.total).toBeCloseTo(845 + 412 + 92);
    expect(result.rows[0].ratio).toBeCloseTo(1);
    expect(result.rows[2].ratio).toBeCloseTo(92 / 845);
    expect(result.rows.every((row) => row.level === "normal")).toBe(true);
  });

  it("supports ascending order", () => {
    const downloads = readings.filter((entry) => entry.direction === "download");
    const result = rankReadings(downloads, "entity", { limit: 2, sort: "asc" });
    expect(result.rows.map((row) => row.reading.name)).toEqual(["iPhone", "Laptop"]);
  });

  it("scales bars to a configured maximum and applies thresholds", () => {
    const result = rankReadings(
      [reading("Fast", 900), reading("Medium", 500), reading("Slow", 100)],
      "entity",
      { limit: 10, sort: "desc", maxSpeed: 1000, warnThreshold: 75, criticalThreshold: 90 }
    );
    expect(result.rows[0].level).toBe("critical");
    expect(result.rows[0].ratio).toBeCloseTo(0.9);
    expect(result.rows[1].level).toBe("normal");
    expect(result.rows[0].ratio).toBeLessThanOrEqual(1);
  });

  it("merges per device without double counting interfaces", () => {
    const merged = rankReadings(
      [
        reading("NAS", 100, "download", "dev_nas"),
        reading("NAS eth0", 900, "download", "dev_nas"),
        reading("NAS", 50, "upload", "dev_nas"),
      ],
      "device",
      { limit: 10, sort: "desc" }
    );
    expect(merged.rows).toHaveLength(2);
    expect(merged.rows[0].reading.mbps).toBe(900);
    expect(merged.rows[0].reading.entityIds).toHaveLength(2);
    expect(merged.total).toBeCloseTo(950);
  });

  it("ignores readings without a value", () => {
    const result = rankReadings([reading("Unknown", null)], "entity", {
      limit: 5,
      sort: "desc",
    });
    expect(result.rows).toHaveLength(0);
    expect(result.total).toBe(0);
  });
});

describe("evaluateSources", () => {
  const hass = makeHass({
    "sensor.pc_download": {
      state: "845",
      attributes: {
        unit_of_measurement: "Mbit/s",
        device_class: "data_rate",
        friendly_name: "Desktop-PC Download",
      },
      last_updated: "2026-01-01T00:00:10.000Z",
    },
    "sensor.pc_upload": {
      state: "125000000",
      attributes: {
        unit_of_measurement: "B",
        device_class: "data_size",
        friendly_name: "Desktop-PC Upload Total",
      },
      last_updated: "2026-01-01T00:00:20.000Z",
    },
    "sensor.offline_download": {
      state: "unavailable",
      attributes: {
        unit_of_measurement: "Mbit/s",
        device_class: "data_rate",
        friendly_name: "Offline Download",
      },
    },
  });

  it("converts rates and flags unavailable sensors", () => {
    const sources = buildSources(hass, { type: "custom:network-speed-monitor" });
    const tracker = new CounterRateTracker();
    const now = Date.parse("2026-01-01T00:00:20.000Z");

    const readings = evaluateSources(hass, sources, {
      now,
      staleAfterMs: 300_000,
      tracker,
    });

    const download = readings.find((entry) => entry.entityId === "sensor.pc_download");
    expect(download?.mbps).toBeCloseTo(845);
    expect(download?.status).toBe("ok");

    const offline = readings.find((entry) => entry.entityId === "sensor.offline_download");
    expect(offline?.status).toBe("unavailable");
    expect(offline?.mbps).toBeNull();
  });

  it("warms up counters and reports a rate after the second sample", () => {
    const sources = buildSources(hass, { type: "custom:network-speed-monitor" });
    const tracker = new CounterRateTracker();
    const first = Date.parse("2026-01-01T00:00:20.000Z");

    let readings = evaluateSources(hass, sources, { now: first, staleAfterMs: 300_000, tracker });
    const upload = readings.find((entry) => entry.entityId === "sensor.pc_upload");
    expect(upload?.status).toBe("warmup");
    expect(upload?.mbps).toBeNull();

    const laterHass = makeHass({
      ...hass.states,
      "sensor.pc_upload": {
        ...hass.states["sensor.pc_upload"],
        state: "137500000",
        last_updated: "2026-01-01T00:00:30.000Z",
      },
    });

    readings = evaluateSources(laterHass, sources, {
      now: Date.parse("2026-01-01T00:00:30.000Z"),
      staleAfterMs: 300_000,
      tracker,
    });
    const second = readings.find((entry) => entry.entityId === "sensor.pc_upload");
    // 12.5 MB in 10 s -> 10 Mbps
    expect(second?.mbps).toBeCloseTo(10);
  });

  it("marks old samples as stale", () => {
    const sources = buildSources(hass, { type: "custom:network-speed-monitor" });
    const tracker = new CounterRateTracker();
    const readings = evaluateSources(hass, sources, {
      now: Date.parse("2026-01-01T00:05:00.000Z"),
      staleAfterMs: 60_000,
      tracker,
    });
    const download = readings.find((entry) => entry.entityId === "sensor.pc_download");
    expect(download?.status).toBe("stale");
  });
});
