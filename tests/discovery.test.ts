import { describe, expect, it } from "vitest";
import { buildSources, cleanName, detectDirection } from "../src/discovery";
import type { NetworkSpeedMonitorConfig } from "../src/types";
import { makeHass } from "./helpers";

const baseConfig: NetworkSpeedMonitorConfig = { type: "custom:network-speed-monitor" };

describe("detectDirection", () => {
  it("detects download and upload wording", () => {
    expect(detectDirection("sensor.laptop_download")).toBe("download");
    expect(detectDirection("sensor.laptop_rx_mbps")).toBe("download");
    expect(detectDirection("Server Upload Speed")).toBe("upload");
    expect(detectDirection("wan_tx")).toBe("upload");
  });

  it("ignores unrelated names", () => {
    expect(detectDirection("sensor.kitchen_temperature")).toBeNull();
    expect(detectDirection("backup cloud")).toBeNull();
  });
});

describe("cleanName", () => {
  it("removes speed and direction noise", () => {
    expect(cleanName("Desktop-PC Download Speed")).toBe("Desktop-PC");
    expect(cleanName("NAS upload rate")).toBe("NAS");
    expect(cleanName("Living Room TV")).toBe("Living Room TV");
  });
});

describe("buildSources", () => {
  const hass = makeHass(
    {
      "sensor.pc_download": {
        state: "845",
        attributes: {
          unit_of_measurement: "Mbit/s",
          device_class: "data_rate",
          friendly_name: "Desktop-PC Download Speed",
        },
      },
      "sensor.pc_upload": {
        state: "125",
        attributes: {
          unit_of_measurement: "Mbit/s",
          device_class: "data_rate",
          friendly_name: "Desktop-PC Upload Speed",
        },
      },
      "sensor.nas_rx_bytes": {
        state: "412000000",
        attributes: {
          unit_of_measurement: "B",
          device_class: "data_size",
          friendly_name: "NAS Download Total",
        },
      },
      "sensor.disk_read": {
        state: "12",
        attributes: { unit_of_measurement: "MB/s", friendly_name: "Disk read" },
      },
      "sensor.hidden_download": {
        state: "10",
        attributes: {
          unit_of_measurement: "Mbit/s",
          device_class: "data_rate",
          friendly_name: "Hidden Download",
        },
      },
      "sensor.manual_rx": {
        state: "5",
        attributes: { unit_of_measurement: "Mbit/s", device_class: "data_rate" },
      },
      "sensor.snmp_download": {
        state: "42",
        attributes: {
          unit_of_measurement: "Mbit/s",
          device_class: "data_rate",
          friendly_name: "SNMP Download",
        },
      },
    },
    {
      "sensor.pc_download": { platform: "unifi", device_id: "dev_pc" },
      "sensor.pc_upload": { platform: "unifi", device_id: "dev_pc" },
      "sensor.nas_rx_bytes": { platform: "snmp", device_id: "dev_nas" },
      "sensor.disk_read": { platform: "systemmonitor", device_id: "dev_host" },
      "sensor.hidden_download": { platform: "unifi", hidden_by: "user" },
      "sensor.manual_rx": { platform: "template" },
      "sensor.snmp_download": { platform: "snmp" },
    }
  );

  it("discovers rate sensors and skips unrelated throughput sensors", () => {
    const sources = buildSources(hass, baseConfig);
    const ids = sources.map((source) => source.entityId);
    expect(ids).toContain("sensor.pc_download");
    expect(ids).toContain("sensor.pc_upload");
    expect(ids).not.toContain("sensor.disk_read");
    expect(ids).not.toContain("sensor.hidden_download");
    // `rx` is enough to identify the direction even without a friendly name.
    expect(sources.find((source) => source.entityId === "sensor.manual_rx")?.direction).toBe(
      "download"
    );
  });

  it("classifies counters and keeps their names readable", () => {
    const sources = buildSources(hass, baseConfig);
    const nas = sources.find((source) => source.entityId === "sensor.nas_rx_bytes");
    expect(nas?.kind).toBe("counter");
    expect(nas?.direction).toBe("download");
    expect(nas?.name).toBe("NAS");
    expect(nas?.factor).toBe(1);
  });

  it("groups sensors by device and cleans names", () => {
    const sources = buildSources(hass, baseConfig);
    const pc = sources.find((source) => source.entityId === "sensor.pc_download");
    expect(pc?.deviceId).toBe("dev_pc");
    expect(pc?.name).toBe("Desktop-PC");
  });

  it("honours integration and entity filters", () => {
    const onlySnmp = buildSources(hass, { ...baseConfig, include_integrations: ["snmp"] });
    expect(onlySnmp.every((source) => source.platform === "snmp")).toBe(true);

    const excluded = buildSources(hass, { ...baseConfig, exclude_integrations: ["unifi"] });
    expect(excluded.some((source) => source.platform === "unifi")).toBe(false);

    const allowList = buildSources(hass, {
      ...baseConfig,
      include_entities: ["sensor.pc_download"],
    });
    expect(allowList.map((source) => source.entityId)).toEqual(["sensor.pc_download"]);

    const denyList = buildSources(hass, {
      ...baseConfig,
      exclude_entities: ["sensor.pc_download"],
    });
    expect(denyList.some((source) => source.entityId === "sensor.pc_download")).toBe(false);
  });

  it("supports manual pairs, name overrides and icons", () => {
    const sources = buildSources(hass, {
      ...baseConfig,
      include_entities: ["sensor.manual_rx"],
      pairs: [
        {
          name: "NAS Server",
          download: "sensor.manual_rx",
          icon: "mdi:server",
        },
      ],
    });
    const manual = sources.find((source) => source.entityId === "sensor.manual_rx");
    expect(manual?.direction).toBe("download");
    expect(manual?.name).toBe("NAS Server");
    expect(manual?.icon).toBe("mdi:server");
    expect(manual?.manual).toBe(true);

    const overridden = buildSources(hass, {
      ...baseConfig,
      name_overrides: { "sensor.pc_upload": "Gaming PC" },
    });
    expect(overridden.find((source) => source.entityId === "sensor.pc_upload")?.name).toBe("Gaming PC");
  });
});
