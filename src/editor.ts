import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { RANKING_SIZES, REFRESH_INTERVALS } from "./const";
import { availableIntegrations } from "./discovery";
import type {
  HomeAssistant,
  ManualPair,
  NetworkSpeedMonitorConfig,
} from "./types";

const LABELS: Record<string, string> = {
  title: "Card title",
  subtitle: "Card subtitle",
  show: "Rankings to show",
  layout: "Layout",
  ranking_size: "Ranking size",
  refresh_interval: "Refresh interval",
  unit: "Display unit",
  decimals: "Decimals",
  sort_direction: "Sort direction",
  scope: "Aggregation scope",
  aggregates: "WAN / VPN sensors",
  aggregates_max: "Max interfaces shown",
  show_bars: "Show speed bars",
  show_rank: "Show ranking numbers",
  show_timestamps: "Show reading age",
  show_icons: "Show device icons",
  show_totals: "Show Top totals",
  show_search: "Show device filter",
  show_status: "Show stale reading indicator",
  show_sparkline: "Show 1 h sparklines",
  compact: "Compact mode",
  max_speed: "Bar scale (max Mbps)",
  warn_threshold: "Warning threshold (%)",
  critical_threshold: "Critical threshold (%)",
  stale_after: "Reading considered stale after (s)",
  hold_seconds: "Keep last value when a sensor drops out (s)",
  download_color: "Download color",
  upload_color: "Upload color",
  include_integrations: "Only use these integrations",
  exclude_integrations: "Ignore these integrations",
  include_entities: "Only use these sensors",
  exclude_entities: "Exclude these sensors",
};

const HELPERS: Record<string, string> = {
  ranking_size: "How many rows each ranking shows.",
  refresh_interval:
    "How often the card re-renders. Sensors update on their own schedule; this only affects the display.",
  scope:
    "Per device keeps one row per device (highest sensor wins) to avoid counting an interface and a device sensor twice.",
  aggregates:
    "Interface sensors (WAN, LAN, NordVPN, WireGuard, …) belong to the whole network. Show them in their own strip, rank them with the devices, or ignore them.",
  aggregates_max: "How many interface cards to show, highest traffic first.",
  max_speed:
    "Bars are scaled to this value. Leave at 0 to scale bars relative to the fastest device.",
  warn_threshold: "Percentage of the bar scale where a bar turns orange (needs a bar scale).",
  critical_threshold: "Percentage of the bar scale where a bar turns red (needs a bar scale).",
  stale_after: "Sensors that have not reported for this long are dimmed.",
  hold_seconds:
    "When a sensor turns unavailable (device off, Wi-Fi drop, integration reload) its last speed is kept, dimmed, for this long so the ranking does not jump. Set to 0 to remove rows immediately.",
  include_integrations: "Empty means all integrations are considered.",
  include_entities: "Empty means sensors are discovered automatically.",
  show_sparkline: "Requires the Home Assistant recorder for the selected sensors.",
};

const COLOR_FIELDS = ["download_color", "upload_color"] as const;

function toHex(value: unknown): string | undefined {
  if (Array.isArray(value) && value.length === 3) {
    const [r, g, b] = value.map((part) => Number(part) || 0);
    return `#${[r, g, b].map((part) => part.toString(16).padStart(2, "0")).join("")}`;
  }
  if (typeof value === "string") return value;
  return undefined;
}

function toRgbArray(value: string | undefined): number[] | undefined {
  if (!value) return undefined;
  const match = /^#?([0-9a-f]{6})$/i.exec(value.trim());
  if (!match) return undefined;
  const int = parseInt(match[1], 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

export class NetworkSpeedMonitorEditor extends LitElement {
  static override styles = css`
    .editor {
      display: block;
    }

    .section {
      margin-top: 1rem;
      padding-top: 0.8rem;
      border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }

    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      margin-bottom: 0.35rem;
    }

    .section h3 {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .hint {
      margin: 0 0 0.6rem;
      font-size: 0.78rem;
      color: var(--secondary-text-color);
      line-height: 1.4;
    }

    button {
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.16));
      background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      color: var(--primary-text-color);
      border-radius: 0.5rem;
      padding: 0.3rem 0.65rem;
      font: inherit;
      font-size: 0.8rem;
      cursor: pointer;
    }

    button:hover {
      background: var(--divider-color, rgba(0, 0, 0, 0.08));
    }

    button.remove {
      align-self: end;
      color: var(--error-color, #c62828);
    }

    .pair,
    .override {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr auto;
      gap: 0.5rem;
      align-items: end;
      margin-bottom: 0.6rem;
    }

    .override {
      grid-template-columns: 1fr 1fr auto;
    }

    @media (max-width: 700px) {
      .pair,
      .override {
        grid-template-columns: 1fr;
      }
    }
  `;

  static override properties = {
    _configState: { state: true },
  };

  private _hass?: HomeAssistant;
  private _configState?: NetworkSpeedMonitorConfig;

  public setConfig(config: NetworkSpeedMonitorConfig): void {
    this._configState = { ...config };
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public set hass(value: HomeAssistant | undefined) {
    this._hass = value;
    this.requestUpdate();
  }

  public get config(): NetworkSpeedMonitorConfig | undefined {
    return this._configState;
  }

  private _data(): Record<string, unknown> {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    const data: Record<string, unknown> = { ...config };
    for (const field of COLOR_FIELDS) {
      data[field] = toRgbArray(config[field]);
    }
    data.include_entities = config.include_entities ?? [];
    data.exclude_entities = config.exclude_entities ?? [];
    data.include_integrations = config.include_integrations ?? [];
    data.exclude_integrations = config.exclude_integrations ?? [];
    return data;
  }

  private _schema(): unknown[] {
    const integrations = this._hass
      ? availableIntegrations(this._hass).map((name) => ({ value: name, label: name }))
      : [];

    return [
      { name: "title", selector: { text: {} } },
      { name: "subtitle", selector: { text: {} } },
      {
        name: "show",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "both", label: "Download and upload" },
              { value: "download", label: "Download only" },
              { value: "upload", label: "Upload only" },
            ],
          },
        },
      },
      {
        name: "layout",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "auto", label: "Automatic (stack on mobile)" },
              { value: "columns", label: "Two columns" },
              { value: "stacked", label: "Stacked" },
            ],
          },
        },
      },
      {
        name: "ranking_size",
        selector: {
          select: {
            mode: "dropdown",
            options: RANKING_SIZES.map((size) => ({ value: size, label: `Top ${size}` })),
          },
        },
      },
      {
        name: "refresh_interval",
        selector: {
          select: {
            mode: "dropdown",
            options: REFRESH_INTERVALS.map((seconds) => ({
              value: seconds,
              label: `${seconds} second${seconds === 1 ? "" : "s"}`,
            })),
          },
        },
      },
      {
        name: "unit",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "Mbps", label: "Mbps (megabits per second)" },
              { value: "MBps", label: "MB/s (megabytes per second)" },
            ],
          },
        },
      },
      {
        name: "decimals",
        selector: { number: { min: 0, max: 3, mode: "box", step: 1 } },
      },
      {
        name: "sort_direction",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "desc", label: "Highest speed first" },
              { value: "asc", label: "Lowest speed first" },
            ],
          },
        },
      },
      {
        name: "scope",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "entity", label: "Per sensor" },
              { value: "device", label: "Per device (highest sensor)" },
            ],
          },
        },
      },
      {
        name: "aggregates",
        selector: {
          select: {
            mode: "dropdown",
            options: [
              { value: "separate", label: "Separate WAN / VPN strip" },
              { value: "inline", label: "Rank with the devices" },
              { value: "off", label: "Ignore interface sensors" },
            ],
          },
        },
      },
      { name: "show_bars", selector: { boolean: {} } },
      {
        name: "aggregates_max",
        selector: { number: { min: 1, max: 20, mode: "box", step: 1 } },
      },      { name: "show_rank", selector: { boolean: {} } },      { name: "show_timestamps", selector: { boolean: {} } },
      { name: "show_icons", selector: { boolean: {} } },
      { name: "show_totals", selector: { boolean: {} } },
      { name: "show_search", selector: { boolean: {} } },
      { name: "show_status", selector: { boolean: {} } },
      { name: "show_sparkline", selector: { boolean: {} } },
      { name: "compact", selector: { boolean: {} } },
      {
        name: "max_speed",
        selector: {
          number: { min: 0, max: 100000, mode: "box", unit_of_measurement: "Mbps" },
        },
      },
      {
        name: "warn_threshold",
        selector: { number: { min: 0, max: 100, mode: "box", unit_of_measurement: "%" } },
      },
      {
        name: "critical_threshold",
        selector: { number: { min: 0, max: 100, mode: "box", unit_of_measurement: "%" } },
      },
      {
        name: "stale_after",
        selector: { number: { min: 10, max: 86400, mode: "box", unit_of_measurement: "s" } },
      },
      {
        name: "hold_seconds",
        selector: { number: { min: 0, max: 3600, mode: "box", unit_of_measurement: "s" } },
      },
      { name: "download_color", selector: { color_rgb: {} } },
      { name: "upload_color", selector: { color_rgb: {} } },
      {
        name: "include_integrations",
        selector: { select: { multiple: true, mode: "dropdown", options: integrations } },
      },
      {
        name: "exclude_integrations",
        selector: { select: { multiple: true, mode: "dropdown", options: integrations } },
      },
      { name: "include_entities", selector: { entity: { multiple: true } } },
      { name: "exclude_entities", selector: { entity: { multiple: true } } },
    ];
  }

  private _computeLabel = (schema: { name: string }): string =>
    LABELS[schema.name] ?? schema.name;

  private _computeHelper = (schema: { name: string }): string | undefined =>
    HELPERS[schema.name];

  private _commit(next: Partial<NetworkSpeedMonitorConfig>): void {
    this._configState = { ...next } as NetworkSpeedMonitorConfig;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._configState },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _valueChanged(event: CustomEvent<{ value: Record<string, unknown> }>): void {
    event.stopPropagation();
    const value = { ...event.detail.value };
    for (const field of COLOR_FIELDS) {
      if (field in value) value[field] = toHex(value[field]);
    }
    for (const key of ["include_entities", "exclude_entities", "include_integrations", "exclude_integrations"]) {
      const list = value[key];
      if (Array.isArray(list) && list.length === 0) delete value[key];
    }
    if (value.max_speed === "" || value.max_speed === undefined) delete value.max_speed;
    this._commit({ ...(this._configState ?? {}), ...value } as NetworkSpeedMonitorConfig);
  }

  private _patchPair(index: number, patch: Partial<ManualPair>): void {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    const pairs = [...(config.pairs ?? [])];
    const current = pairs[index] ?? {};
    const next: ManualPair = { ...current, ...patch };
    for (const key of Object.keys(next) as Array<keyof ManualPair>) {
      if (!next[key]) delete next[key];
    }
    if (Object.keys(next).length === 0) {
      pairs.splice(index, 1);
    } else {
      pairs[index] = next;
    }
    this._commit({ ...config, pairs });
  }

  private _addPair(): void {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    this._commit({ ...config, pairs: [...(config.pairs ?? []), {}] });
  }

  private _removePair(index: number): void {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    const pairs = [...(config.pairs ?? [])];
    pairs.splice(index, 1);
    this._commit({ ...config, pairs: pairs.length ? pairs : undefined });
  }

  private _patchOverride(entityId: string, name: string, previousId: string): void {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    const overrides = { ...(config.name_overrides ?? {}) };
    if (previousId && previousId !== entityId) delete overrides[previousId];
    if (entityId && name) overrides[entityId] = name;
    else if (entityId && !name) delete overrides[entityId];
    this._commit({
      ...config,
      name_overrides: Object.keys(overrides).length ? overrides : undefined,
    });
  }

  private _removeOverride(entityId: string): void {
    const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
    const overrides = { ...(config.name_overrides ?? {}) };
    delete overrides[entityId];
    this._commit({
      ...config,
      name_overrides: Object.keys(overrides).length ? overrides : undefined,
    });
  }

  private _renderPairs(): TemplateResult {
    const pairs = this._configState?.pairs ?? [];
    return html`
      <div class="section">
        <div class="section-head">
          <h3>Manual download / upload pairing</h3>
          <button @click=${this._addPair}>Add pair</button>
        </div>
        <p class="hint">
          Optional. Use this for devices where the download and upload sensors cannot be matched
          automatically, or to force a friendly name and icon.
        </p>
        ${pairs.map(
          (pair, index) => html`
            <div class="pair">
              <ha-selector
                .hass=${this._hass}
                .selector=${{ text: {} }}
                .value=${pair.name ?? ""}
                .label=${"Name"}
                @value-changed=${(event: CustomEvent<{ value: string }>) => {
                  event.stopPropagation();
                  this._patchPair(index, { name: event.detail.value });
                }}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{ entity: {} }}
                .value=${pair.download ?? ""}
                .label=${"Download sensor"}
                @value-changed=${(event: CustomEvent<{ value: string }>) => {
                  event.stopPropagation();
                  this._patchPair(index, { download: event.detail.value });
                }}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{ entity: {} }}
                .value=${pair.upload ?? ""}
                .label=${"Upload sensor"}
                @value-changed=${(event: CustomEvent<{ value: string }>) => {
                  event.stopPropagation();
                  this._patchPair(index, { upload: event.detail.value });
                }}
              ></ha-selector>
              <button class="remove" @click=${() => this._removePair(index)}>Remove</button>
            </div>
          `
        )}
      </div>
    `;
  }

  private _renderOverrides(): TemplateResult {
    const overrides = this._configState?.name_overrides ?? {};
    const entries = Object.entries(overrides);
    return html`
      <div class="section">
        <div class="section-head">
          <h3>Device name overrides</h3>
          <button
            @click=${() => {
              const config: Partial<NetworkSpeedMonitorConfig> = this._configState ?? {};
              const target = (config.include_entities ?? [])[0] ?? "";
              this._commit({
                ...config,
                name_overrides: { ...overrides, [target || "sensor.example"]: "" },
              });
            }}
          >
            Add override
          </button>
        </div>
        <p class="hint">Rename a sensor in the rankings without renaming the entity itself.</p>
        ${entries.map(
          ([entityId, name]) => html`
            <div class="override">
              <ha-selector
                .hass=${this._hass}
                .selector=${{ entity: {} }}
                .value=${entityId}
                .label=${"Sensor"}
                @value-changed=${(event: CustomEvent<{ value: string }>) => {
                  event.stopPropagation();
                  this._patchOverride(event.detail.value, name, entityId);
                }}
              ></ha-selector>
              <ha-selector
                .hass=${this._hass}
                .selector=${{ text: {} }}
                .value=${name}
                .label=${"Display name"}
                @value-changed=${(event: CustomEvent<{ value: string }>) => {
                  event.stopPropagation();
                  this._patchOverride(entityId, event.detail.value, entityId);
                }}
              ></ha-selector>
              <button class="remove" @click=${() => this._removeOverride(entityId)}>Remove</button>
            </div>
          `
        )}
      </div>
    `;
  }

  protected override render(): TemplateResult | typeof nothing {
    if (!this._hass) return nothing;
    return html`
      <div class="editor">
        <ha-form
          .hass=${this._hass}
          .data=${this._data()}
          .schema=${this._schema()}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
        ${this._renderPairs()} ${this._renderOverrides()}
      </div>
    `;
  }
}
