export type Direction = "download" | "upload";

export type Scope = "device" | "entity";

export type DisplayUnit = "Mbps" | "MBps";

export type SortDirection = "desc" | "asc";

export type ShowMode = "both" | "download" | "upload";

export type LayoutMode = "auto" | "columns" | "stacked";

/**
 * How interface-level sensors (WAN, LAN, VPN tunnels, ...) are treated.
 *
 * `separate` keeps them out of the device ranking and shows them in their own
 * strip, `inline` ranks them together with the devices, `off` ignores them.
 */
export type AggregateMode = "separate" | "inline" | "off";

export interface ManualPair {
  /** Display name for the pair. Falls back to the sensor / device name. */
  name?: string;
  /** Sensor used for the download ranking. */
  download?: string;
  /** Sensor used for the upload ranking. */
  upload?: string;
  /** Optional mdi icon, e.g. `mdi:laptop`. */
  icon?: string;
}

export interface NetworkSpeedMonitorConfig {
  type: string;
  title?: string;
  subtitle?: string;
  show?: ShowMode;
  layout?: LayoutMode;
  ranking_size?: number;
  refresh_interval?: number;
  unit?: DisplayUnit;
  decimals?: number;
  show_bars?: boolean;
  show_rank?: boolean;
  show_timestamps?: boolean;
  show_icons?: boolean;
  show_totals?: boolean;
  show_search?: boolean;
  show_status?: boolean;
  show_sparkline?: boolean;
  compact?: boolean;
  sort_direction?: SortDirection;
  scope?: Scope;
  aggregates?: AggregateMode;
  aggregates_max?: number;
  aggregates_include?: string[];
  debug?: boolean;
  max_speed?: number;
  warn_threshold?: number;
  critical_threshold?: number;
  stale_after?: number;
  hold_seconds?: number;
  download_color?: string;
  upload_color?: string;
  include_integrations?: string[];
  exclude_integrations?: string[];
  include_entities?: string[];
  exclude_entities?: string[];
  pairs?: ManualPair[];
  name_overrides?: Record<string, string>;
}

export interface HassEntityAttributes {
  friendly_name?: string;
  unit_of_measurement?: string;
  device_class?: string;
  state_class?: string;
  icon?: string;
  [key: string]: unknown;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  name?: string | null;
  original_name?: string | null;
  platform?: string;
  translation_key?: string | null;
  device_class?: string | null;
  original_device_class?: string | null;
  unit_of_measurement?: string | null;
  original_icon?: string | null;
  icon?: string | null;
  entity_category?: string | null;
  hidden_by?: string | null;
  disabled_by?: string | null;
}

export interface HassDeviceRegistryEntry {
  id: string;
  name?: string | null;
  name_by_user?: string | null;
  manufacturer?: string | null;
  model?: string | null;
  area_id?: string | null;
  disabled_by?: string | null;
}

export interface HassArea {
  name: string;
  icon?: string | null;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryEntry>;
  devices?: Record<string, HassDeviceRegistryEntry>;
  areas?: Record<string, HassArea>;
  locale?: { language?: string };
  language?: string;
  themes?: { darkMode?: boolean };
  callWS<T>(message: Record<string, unknown>): Promise<T>;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: NetworkSpeedMonitorConfig): void;
  getCardSize?(): number | Promise<number>;
}

export interface LovelaceCardEditor extends LovelaceCard {
  hass?: HomeAssistant;
  setConfig(config: NetworkSpeedMonitorConfig): void;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}
