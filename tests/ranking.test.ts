import { describe, expect, it } from "vitest";
import { CounterRateTracker } from "../src/counter";
import { buildSources } from "../src/discovery";
import {
  applyHold,
  evaluateSources,
  groupAggregates,
  rankReadings,
  type Reading,
} from "../src/ranking";
import { makeHass } from "./helpers";

function reading(
  name: string,
  mbps: number | null,
  direction: "download" | "upload" = "download",
  deviceId?: string,
  aggregate = false,
  label = name
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
    aggregate,
    label,
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

describe("groupAggregates", () => {
  it("pairs download and upload per interface", () => {
    const groups = groupAggregates([
      reading("WAN", 412, "download", "fw", true, "WAN"),
      reading("WAN", 33, "upload", "fw", true, "WAN"),
      reading("NordVPN", 120, "download", "fw", true, "NordVPN"),
      reading("NordVPN", 12, "upload", "fw", true, "NordVPN"),
      reading("Desktop-PC", 845, "download", "dev_pc", false, "Desktop-PC"),
    ]);

    expect(groups.map((group) => group.label)).toEqual(["WAN", "NordVPN"]);
    expect(groups[0].download?.mbps).toBe(412);
    expect(groups[0].upload?.mbps).toBe(33);
    expect(groups[1].upload?.mbps).toBe(12);
  });

  it("keeps the highest reading when an interface has several sensors", () => {
    const groups = groupAggregates([
      reading("WAN", 100, "download", "fw", true, "WAN"),
      reading("WAN", 250, "download", "fw", true, "WAN"),
    ]);
    expect(groups).toHaveLength(1);
    expect(groups[0].download?.mbps).toBe(250);
  });

  it("returns nothing when there are no interface sensors", () => {
    expect(groupAggregates([reading("Laptop", 92)])).toEqual([]);
  });
});

describe("applyHold", () => {
  it("keeps the last value while a sensor is unavailable", () => {
    const cache = new Map();
    const first = applyHold([{ ...reading("Laptop", 92), sampledAt: 1000 }], cache, {
      now: 1000,
      holdMs: 60_000,
    });
    expect(first[0].mbps).toBe(92);

    const gone = { ...reading("Laptop", null), status: "unavailable" as const };
    const held = applyHold([gone], cache, { now: 31_000, holdMs: 60_000 });
    expect(held[0].mbps).toBe(92);
    expect(held[0].status).toBe("stale");
    expect(held[0].ageMs).toBe(30_000);
  });

  it("drops the held value after the hold window", () => {
    const cache = new Map();
    applyHold([{ ...reading("Laptop", 92), sampledAt: 1000 }], cache, {
      now: 1000,
      holdMs: 60_000,
    });

    const gone = { ...reading("Laptop", null), status: "unavailable" as const };
    const held = applyHold([gone], cache, { now: 120_000, holdMs: 60_000 });
    expect(held[0].mbps).toBeNull();
    expect(cache.size).toBe(0);
  });

  it("does nothing when holding is disabled", () => {
    const cache = new Map();
    applyHold([{ ...reading("Laptop", 92), sampledAt: 1000 }], cache, {
      now: 1000,
      holdMs: 0,
    });
    const gone = { ...reading("Laptop", null), status: "unavailable" as const };
    expect(applyHold([gone], cache, { now: 2000, holdMs: 0 })[0].mbps).toBeNull();
  });

  it("does not replace a real zero with an old value", () => {
    const cache = new Map();
    applyHold([{ ...reading("Laptop", 92), sampledAt: 1000 }], cache, {
      now: 1000,
      holdMs: 60_000,
    });
    const idle = applyHold([{ ...reading("Laptop", 0), sampledAt: 2000 }], cache, {
      now: 2000,
      holdMs: 60_000,
    });
    expect(idle[0].mbps).toBe(0);
    expect(idle[0].status).toBe("ok");
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
