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

describe("OPNsense style interface sensors", () => {
  const hass = makeHass(
    {
      "sensor.opnsense_wan_in": {
        state: "31",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "WAN in" },
      },
      "sensor.opnsense_wan_out": {
        state: "19",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "WAN out" },
      },
      "sensor.opnsense_nordvpn_in": {
        state: "0",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "NordVPN in" },
      },
      "sensor.opnsense_nordvpn_out": {
        state: "4",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "NordVPN out" },
      },
      "sensor.opnsense_dhcp_leases": {
        state: "115",
        attributes: { unit_of_measurement: "leases", friendly_name: "DHCP leases" },
      },
      "sensor.opnsense_cpu": {
        state: "52",
        attributes: { unit_of_measurement: "%", friendly_name: "CPU usage" },
      },
      "sensor.firewall_wan_inbytes_kilobytes_per_second": {
        state: "31",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "Traffic In Rate" },
      },
      "sensor.firewall_nordvpn_outbytes_kilobytes_per_second": {
        state: "19",
        attributes: { unit_of_measurement: "kB/s", friendly_name: "Traffic Out Rate" },
      },
    },
    {
      "sensor.opnsense_wan_in": { platform: "opnsense", device_id: "fw" },
      "sensor.opnsense_wan_out": { platform: "opnsense", device_id: "fw" },
      "sensor.opnsense_nordvpn_in": { platform: "opnsense", device_id: "fw" },
      "sensor.opnsense_nordvpn_out": { platform: "opnsense", device_id: "fw" },
      "sensor.opnsense_dhcp_leases": { platform: "opnsense", device_id: "fw" },
      "sensor.opnsense_cpu": { platform: "opnsense", device_id: "fw" },
      "sensor.firewall_wan_inbytes_kilobytes_per_second": {
        platform: "opnsense",
        device_id: "fw",
      },
      "sensor.firewall_nordvpn_outbytes_kilobytes_per_second": {
        platform: "opnsense",
        device_id: "fw",
      },
    }
  );

  it("reads byte-rate interface sensors in both directions", () => {
    const sources = buildSources(hass, baseConfig);
    const wanIn = sources.find((source) => source.entityId === "sensor.opnsense_wan_in");
    const wanOut = sources.find((source) => source.entityId === "sensor.opnsense_wan_out");

    expect(wanIn?.direction).toBe("download");
    expect(wanOut?.direction).toBe("upload");
    expect(wanIn?.kind).toBe("rate");
    // kB/s -> 1000 bytes * 8 / 1e6
    expect(wanIn?.factor).toBeCloseTo(0.008);
  });

  it("marks interface sensors as aggregates and labels them", () => {
    const sources = buildSources(hass, baseConfig);
    const wanIn = sources.find((source) => source.entityId === "sensor.opnsense_wan_in");
    const vpnOut = sources.find((source) => source.entityId === "sensor.opnsense_nordvpn_out");

    expect(wanIn?.aggregate).toBe(true);
    expect(wanIn?.label).toBe("WAN");
    expect(vpnOut?.aggregate).toBe(true);
    expect(vpnOut?.label).toBe("NordVPN");
  });

  it("labels hass-opnsense rate sensors from the entity id", () => {
    const sources = buildSources(hass, baseConfig);
    const wan = sources.find(
      (source) => source.entityId === "sensor.firewall_wan_inbytes_kilobytes_per_second"
    );
    const vpn = sources.find(
      (source) => source.entityId === "sensor.firewall_nordvpn_outbytes_kilobytes_per_second"
    );

    expect(wan?.direction).toBe("download");
    expect(wan?.label).toBe("WAN");
    expect(wan?.aggregate).toBe(true);
    expect(vpn?.direction).toBe("upload");
    expect(vpn?.label).toBe("NordVPN");
  });

  it("ignores non bandwidth sensors from the same device", () => {
    const ids = buildSources(hass, baseConfig).map((source) => source.entityId);
    expect(ids).not.toContain("sensor.opnsense_dhcp_leases");
    expect(ids).not.toContain("sensor.opnsense_cpu");
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
