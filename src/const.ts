declare const __CARD_VERSION__: string;

export const CARD_VERSION: string =
  typeof __CARD_VERSION__ === "string" ? __CARD_VERSION__ : "1.0.0";

export const CARD_TAG = "network-speed-monitor";
export const EDITOR_TAG = "network-speed-monitor-editor";

export const RANKING_SIZES = [5, 10, 15, 20] as const;
export const REFRESH_INTERVALS = [1, 2, 5, 10, 15, 30, 60] as const;

export const DEFAULT_DOWNLOAD_COLOR = "#3b9dff";
export const DEFAULT_UPLOAD_COLOR = "#22c55e";

export const DEFAULT_CONFIG = {
  show: "both" as const,
  layout: "auto" as const,
  ranking_size: 10,
  refresh_interval: 5,
  unit: "Mbps" as const,
  decimals: 0,
  show_bars: true,
  show_rank: true,
  show_timestamps: true,
  show_icons: true,
  show_totals: true,
  show_search: false,
  show_status: true,
  show_sparkline: false,
  compact: false,
  sort_direction: "desc" as const,
  scope: "entity" as const,
  aggregates: "separate" as const,
  aggregates_max: 6,
  stale_after: 300,
  hold_seconds: 60,
  hide_rx_tx: true,
  warn_threshold: 75,
  critical_threshold: 90,
};

/** Maximum plausible rate (1 Tbps) used to discard bogus counter deltas. */
export const MAX_PLAUSIBLE_MBPS = 1_000_000;

/** Source integrations that are known to expose per device bandwidth sensors. */
export const KNOWN_INTEGRATIONS = [
  "unifi",
  "unifi_bandwidth",
  "fritz",
  "fritzbox",
  "fritzbox_callmonitor",
  "snmp",
  "openwrt",
  "asuswrt",
  "ubus",
  "netgear",
  "pfsense",
  "glances",
  "speedtestdotnet",
  "speedtest",
  "nettools",
  "network",
  "systemmonitor",
  "template",
  "utility_meter",
];
