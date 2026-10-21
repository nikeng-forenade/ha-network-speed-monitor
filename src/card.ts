import { LitElement, html, nothing, type TemplateResult } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { CounterRateTracker } from "./counter";
import {
  CARD_TAG,
  CARD_VERSION,
  DEFAULT_CONFIG,
  DEFAULT_DOWNLOAD_COLOR,
  DEFAULT_UPLOAD_COLOR,
  REFRESH_INTERVALS,
  RANKING_SIZES,
} from "./const";
import { buildSources, type SourceConfig } from "./discovery";
import { fetchSparklines } from "./history";
import {
  applyHold,
  evaluateSources,
  groupAggregates,
  rankReadings,
  type AggregateGroup,
  type HeldSample,
  type RankedRow,
  type RankResult,
  type RankOptions,
  type Reading,
} from "./ranking";
import { cardStyles } from "./styles";
import type {
  Direction,
  DisplayUnit,
  HomeAssistant,
  NetworkSpeedMonitorConfig,
} from "./types";
import { formatAge, formatAgeLong, normalizeColor, toRgbTriplet } from "./utils";
import { formatRate } from "./units";

interface ViewState {
  download: RankResult;
  upload: RankResult;
  aggregates: AggregateGroup[];
  generatedAt: number;
  sourceCount: number;
  activeCount: number;
}

const ICON_RULES: Array<[RegExp, string]> = [
  [/(nordvpn|\bvpn\b|wireguard|openvpn|ipsec|tunnel|\btun\d*\b|\bwg\d*\b)/i, "mdi:vpn"],
  [/(\bwan\b|internet|uplink|broadband)/i, "mdi:earth"],
  [/(wlan|wi-?fi|guest)/i, "mdi:wifi"],
  [/(\blan\b|bridge)/i, "mdi:lan"],
  [/(iphone|phone|mobile|pixel|galaxy|android)/i, "mdi:cellphone"],
  [/(ipad|tablet)/i, "mdi:tablet"],
  [/(television|apple ?tv|chromecast|roku|\btv\b)/i, "mdi:television"],
  [/(laptop|macbook|notebook|thinkpad|chromebook)/i, "mdi:laptop"],
  [/(desktop|workstation|\bpc\b|imac|computer)/i, "mdi:monitor"],
  [/(synology|qnap|\bnas\b|server|proxmox|unraid)/i, "mdi:server"],
  [/(camera|\bnvr\b|reolink|hikvision|frigate)/i, "mdi:cctv"],
  [/(printer)/i, "mdi:printer"],
  [/(playstation|xbox|console|nintendo|\bswitch\b)/i, "mdi:gamepad-variant"],
  [/(router|gateway|access ?point|\bswitch\b|\bap\b|hub)/i, "mdi:router-network"],
  [/(cloud|backup)/i, "mdi:cloud-outline"],
  [/(speaker|sonos|alexa|echo)/i, "mdi:speaker"],
  [/(watch)/i, "mdi:watch"],
  [/(raspberry|\bpi\b)/i, "mdi:raspberry-pi"],
];

export function guessIcon(name: string): string {
  for (const [pattern, icon] of ICON_RULES) {
    if (pattern.test(name)) return icon;
  }
  return "mdi:devices";
}

function closest(value: unknown, allowed: readonly number[], fallback: number): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return allowed.reduce(
    (best, candidate) => (Math.abs(candidate - numeric) < Math.abs(best - numeric) ? candidate : best),
    fallback
  );
}

function currency(value: number | null | undefined): number {
  return Number.isFinite(value ?? NaN) ? (value as number) : 0;
}

export class NetworkSpeedMonitor extends LitElement {
  static override styles = cardStyles;

  static override properties = {
    _view: { state: true },
    _paused: { state: true },
    _menu: { state: true },
    _filter: { state: true },
    _spark: { state: true },
    _unitOverride: { state: true },
    _compactOverride: { state: true },
    _limitOverride: { state: true },
    _refreshOverride: { state: true },
  };

  static getStubConfig(): NetworkSpeedMonitorConfig {
    return {
      type: `custom:${CARD_TAG}`,
      title: "Network Speed Monitor",
      subtitle: "Top 10 devices by download and upload speed",
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("network-speed-monitor-editor");
  }

  private _config?: NetworkSpeedMonitorConfig;
  private _hass?: HomeAssistant;
  private _sources?: SourceConfig[];
  private _registryRef?: unknown;
  private _tracker = new CounterRateTracker({ maxMbps: 1_000_000 });
  private _hold = new Map<string, HeldSample>();
  private _timer?: number;
  private _sparkTimer?: number;
  private _sparkToken = 0;
  private _lastEval = 0;
  private _rowPositions?: Map<string, number>;
  private _docListener?: (event: Event) => void;

  private _view?: ViewState;
  private _paused = false;
  private _menu = false;
  private _filter = "";
  private _spark?: Record<string, string>;
  private _unitOverride?: DisplayUnit;
  private _compactOverride?: boolean;
  private _limitOverride?: number;
  private _refreshOverride?: number;

  public setConfig(config: NetworkSpeedMonitorConfig): void {
    if (!config || typeof config !== "object") {
      throw new Error("Invalid configuration for network-speed-monitor");
    }
    const previous = this._config;
    this._config = { ...DEFAULT_CONFIG, ...config };
    this._sources = undefined;
    this._hold.clear();
    this._tracker = new CounterRateTracker({
      staleMs: Math.max(this._staleAfterMs, 60_000),
      maxMbps: 1_000_000,
    });

    // Home Assistant calls setConfig again whenever the card is re-created.
    // Keep the display choices the user made unless the config really changed.
    if (previous?.unit !== this._config.unit) this._unitOverride = undefined;
    if (previous?.compact !== this._config.compact) this._compactOverride = undefined;
    if (previous?.ranking_size !== this._config.ranking_size) this._limitOverride = undefined;
    if (previous?.refresh_interval !== this._config.refresh_interval) {
      this._refreshOverride = undefined;
    }

    this._filter = "";
    this._clearTimer();
    if (this.isConnected) {
      this._evaluate();
      this._schedule();
    }
  }

  public get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  public set hass(value: HomeAssistant | undefined) {
    const previous = this._hass;
    this._hass = value;
    if (!value || !this._config) return;
    if (!previous || !this._view) {
      this._evaluate();
      this._schedule();
    } else {
      this._schedule();
    }
  }

  public getCardSize(): number {
    const rows = this._view
      ? Math.max(this._view.download.rows.length, this._view.upload.rows.length)
      : this._limit;
    return 2 + Math.ceil(rows * 0.55);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("visibilitychange", this._onVisibilityChange);
    if (this._hass && this._config) {
      this._evaluate();
      this._schedule();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("visibilitychange", this._onVisibilityChange);
    this._clearTimer();
    if (this._sparkTimer !== undefined) {
      window.clearTimeout(this._sparkTimer);
      this._sparkTimer = undefined;
    }
    this._sparkToken += 1;
    this._removeDocListener();
  }

  // ---------------------------------------------------------------------
  // Configuration helpers
  // ---------------------------------------------------------------------

  private get _limit(): number {
    return closest(
      this._limitOverride ?? this._config?.ranking_size,
      RANKING_SIZES,
      DEFAULT_CONFIG.ranking_size
    );
  }

  private get _refreshSeconds(): number {
    return closest(
      this._refreshOverride ?? this._config?.refresh_interval,
      REFRESH_INTERVALS,
      DEFAULT_CONFIG.refresh_interval
    );
  }

  private get _unit(): DisplayUnit {
    return this._unitOverride ?? this._config?.unit ?? DEFAULT_CONFIG.unit;
  }

  private get _compact(): boolean {
    return this._compactOverride ?? this._config?.compact ?? DEFAULT_CONFIG.compact;
  }

  private get _staleAfterMs(): number {
    const seconds = Number(this._config?.stale_after ?? DEFAULT_CONFIG.stale_after);
    return (Number.isFinite(seconds) && seconds > 0 ? seconds : DEFAULT_CONFIG.stale_after) * 1000;
  }

  private get _holdSeconds(): number {
    const value = Number(this._config?.hold_seconds ?? DEFAULT_CONFIG.hold_seconds);
    return Number.isFinite(value) && value >= 0 ? value : DEFAULT_CONFIG.hold_seconds;
  }

  private get _isDark(): boolean {
    if (typeof this._hass?.themes?.darkMode === "boolean") return this._hass.themes.darkMode;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  }

  private get _configOrDefault(): NetworkSpeedMonitorConfig {
    return (this._config ?? DEFAULT_CONFIG) as NetworkSpeedMonitorConfig;
  }

  private get _downloadColor(): string {
    return normalizeColor(this._config?.download_color, DEFAULT_DOWNLOAD_COLOR);
  }

  private get _uploadColor(): string {
    return normalizeColor(this._config?.upload_color, DEFAULT_UPLOAD_COLOR);
  }

  // ---------------------------------------------------------------------
  // Data pipeline
  // ---------------------------------------------------------------------

  private _evaluate(): void {
    const hass = this._hass;
    const config = this._config;
    if (!hass || !config) return;

    if (hass.entities !== this._registryRef || !this._sources) {
      this._registryRef = hass.entities;
      this._sources = buildSources(hass, config);
    }

    const now = Date.now();
    const evaluated = evaluateSources(hass, this._sources, {
      now,
      staleAfterMs: this._staleAfterMs,
      tracker: this._tracker,
    });
    const readings = applyHold(evaluated, this._hold, {
      now,
      holdMs: this._holdSeconds * 1000,
    });

    const options: RankOptions = {
      limit: this._limit,
      sort: config.sort_direction ?? DEFAULT_CONFIG.sort_direction,
      maxSpeed: Number(config.max_speed) > 0 ? Number(config.max_speed) : undefined,
      warnThreshold: config.warn_threshold ?? DEFAULT_CONFIG.warn_threshold,
      criticalThreshold: config.critical_threshold ?? DEFAULT_CONFIG.critical_threshold,
    };

    const scope = config.scope ?? DEFAULT_CONFIG.scope;
    const aggregateMode = config.aggregates ?? DEFAULT_CONFIG.aggregates;
    const ranked =
      aggregateMode === "inline" ? readings : readings.filter((reading) => !reading.aggregate);

    this._view = {
      download: rankReadings(
        ranked.filter((reading) => reading.direction === "download"),
        scope,
        options
      ),
      upload: rankReadings(
        ranked.filter((reading) => reading.direction === "upload"),
        scope,
        options
      ),
      aggregates: aggregateMode === "off" ? [] : groupAggregates(readings),
      generatedAt: now,
      sourceCount: readings.length,
      activeCount: readings.filter((reading) => reading.mbps !== null).length,
    };

    this._lastEval = now;
    this._tracker.prune(Math.max(this._staleAfterMs * 4, 600_000), now);
    this._maybeLoadSparklines();
  }

  private _clearTimer(): void {
    if (this._timer !== undefined) {
      window.clearTimeout(this._timer);
      this._timer = undefined;
    }
  }

  private _schedule(delay?: number): void {
    if (this._paused || !this.isConnected) return;
    if (this._timer !== undefined) return;
    const interval = this._refreshSeconds * 1000;
    const elapsed = Date.now() - this._lastEval;
    const wait = delay ?? (elapsed >= interval ? 0 : interval - elapsed);
    this._timer = window.setTimeout(() => {
      this._timer = undefined;
      if (!this.isConnected || this._paused) return;
      this._evaluate();
      // Reschedule from now so a slow render cannot shrink the next interval.
      this._schedule(interval);
    }, wait);
  }

  private _onVisibilityChange = (): void => {
    if (document.visibilityState !== "visible" || this._paused) return;
    this._clearTimer();
    this._evaluate();
    this._schedule();
  };

  private _maybeLoadSparklines(force = false): void {
    const config = this._config;
    const hass = this._hass;
    const view = this._view;
    if (!config?.show_sparkline || !hass?.callWS || !view) return;
    if (!force && this._sparkTimer !== undefined) return;
    if (this._sparkTimer !== undefined) window.clearTimeout(this._sparkTimer);

    this._sparkTimer = window.setTimeout(async () => {
      this._sparkTimer = undefined;
      const current = this._view;
      if (!current || !this._hass) return;
      const ids = [...current.download.rows, ...current.upload.rows]
        .filter((row) => !row.reading.isCounter)
        .slice(0, 12)
        .map((row) => row.reading.entityId);
      if (ids.length === 0) return;
      const token = ++this._sparkToken;
      const result = await fetchSparklines(this._hass, ids, { minutes: 60, ttl: 60_000 });
      if (token !== this._sparkToken || !this.isConnected) return;
      this._spark = result;
    }, force ? 0 : 60_000);
  }

  // ---------------------------------------------------------------------
  // Interactions
  // ---------------------------------------------------------------------

  private _togglePause(): void {
    this._paused = !this._paused;
    if (this._paused) {
      this._clearTimer();
    } else {
      this._evaluate();
      this._schedule();
    }
  }

  private _toggleMenu(): void {
    this._menu = !this._menu;
    if (this._menu) {
      this._docListener = (event: Event) => {
        if (!event.composedPath().includes(this)) {
          this._menu = false;
          this._removeDocListener();
        }
      };
      document.addEventListener("pointerdown", this._docListener);
    } else {
      this._removeDocListener();
    }
  }

  private _removeDocListener(): void {
    if (this._docListener) {
      document.removeEventListener("pointerdown", this._docListener);
      this._docListener = undefined;
    }
  }

  private _onRefreshChanged(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    if (!Number.isFinite(value)) return;
    this._refreshOverride = value;
    this._clearTimer();
    this._schedule();
  }

  private _setLimit(limit: number): void {
    this._limitOverride = limit;
    this._menu = false;
    this._removeDocListener();
    this._evaluate();
  }

  private _toggleUnit(): void {
    this._unitOverride = this._unit === "Mbps" ? "MBps" : "Mbps";
  }

  private _toggleCompact(): void {
    this._compactOverride = !this._compact;
  }

  private _openEditor(): void {
    this._menu = false;
    this._removeDocListener();
    if (!customElements.get("hui-dialog-edit-card")) return;
    this.dispatchEvent(
      new CustomEvent("show-dialog", {
        bubbles: true,
        composed: true,
        detail: {
          dialogTag: "hui-dialog-edit-card",
          dialogImport: () => Promise.resolve(),
          dialogParams: { card: this, cardConfig: this._config },
        },
      })
    );
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  private _defaultSubtitle(): string {
    const show = this._configOrDefault.show ?? "both";
    if (show === "download") return `Top ${this._limit} devices by download speed`;
    if (show === "upload") return `Top ${this._limit} devices by upload speed`;
    return `Top ${this._limit} devices by download and upload speed`;
  }

  private _wrapClass(): string {
    return `wrap ${this._compact ? "compact" : ""} ${this._isDark ? "dark" : "light"}`;
  }

  private _wrapStyle(): string {
    const dl = toRgbTriplet(this._downloadColor, DEFAULT_DOWNLOAD_COLOR);
    const ul = toRgbTriplet(this._uploadColor, DEFAULT_UPLOAD_COLOR);
    return `--nsm-dl:${dl};--nsm-ul:${ul};`;
  }

  private _iconFor(reading: Reading): string {
    return reading.icon ?? guessIcon(reading.name);
  }

  private _columns(): string {
    const config = this._configOrDefault;
    const parts: string[] = [];
    if (config.show_rank !== false) parts.push("1.5rem");
    if (config.show_icons !== false) parts.push("1.5rem");
    parts.push("minmax(4.5rem, 1.25fr)");
    if (config.show_bars !== false) parts.push("minmax(2rem, 1.15fr)");
    parts.push("auto");
    if (config.show_timestamps !== false) parts.push("3.4rem");
    return parts.join(" ");
  }

  private _filtered(rows: RankedRow[]): RankedRow[] {
    const needle = this._filter.trim().toLowerCase();
    const filtered = needle
      ? rows.filter((row) => row.reading.name.toLowerCase().includes(needle))
      : rows;
    return filtered.map((row, index) => ({ ...row, rank: index + 1 }));
  }

  private _renderRow(row: RankedRow, direction: Direction, color: string): TemplateResult {
    const config = this._configOrDefault;
    const reading = row.reading;
    const unit = this._unit;
    const value = formatRate(reading.mbps ?? 0, unit, config.decimals ?? 0);
    const spark = config.show_sparkline ? this._spark?.[reading.entityId] : undefined;
    const levelColor =
      row.level === "critical" ? "#ef4444" : row.level === "warn" ? "#f59e0b" : undefined;
    const tooltip = `${reading.name} · ${value} ${unit} · ${reading.entityId} · sensor updated ${formatAgeLong(reading.ageMs)}`;

    return html`
      <li
        class="row ${reading.status === "stale" ? "stale" : ""}"
        data-key=${`${direction}:${reading.entityId}`}
        title=${tooltip}
      >
        ${config.show_rank !== false ? html`<span class="rank">${row.rank}</span>` : nothing}
        ${config.show_icons !== false
          ? html`<ha-icon class="icon" .icon=${this._iconFor(reading)}></ha-icon>`
          : nothing}
        <span class="name">
          ${config.show_status && reading.status !== "ok"
            ? html`<span
                class="dot"
                style=${`color:${reading.status === "stale" ? "#f59e0b" : "#94a3b8"}`}
              ></span>`
            : nothing}
          <span class="text">${reading.name}</span>
        </span>
        ${config.show_bars !== false
          ? spark
            ? html`<span class="track history">
                <svg class="spark" viewBox="0 0 100 24" preserveAspectRatio="none">
                  <polyline points=${spark} stroke=${color}></polyline>
                </svg>
              </span>`
            : html`<span class="track">
                <span
                  class="fill"
                  style=${`width:${(row.ratio * 100).toFixed(1)}%;${levelColor ? `background:${levelColor};` : ""}`}
                ></span>
              </span>`
          : nothing}
        <span class="value">${value}<span class="u">${unit}</span></span>
        ${config.show_timestamps !== false
          ? html`<span class="age">${formatAge(reading.ageMs)}</span>`
          : nothing}
      </li>
    `;
  }

  private _renderAggregate(group: AggregateGroup): TemplateResult {
    const config = this._configOrDefault;
    const unit = this._unit;
    const decimals = config.decimals ?? 0;
    const ages = [group.download?.ageMs, group.upload?.ageMs].filter(
      (age): age is number => age !== null && age !== undefined
    );
    const age = ages.length ? Math.min(...ages) : null;

    return html`
      <div class="iface">
        <div class="iface-head">
          <ha-icon .icon=${group.icon ?? guessIcon(group.label)}></ha-icon>
          <span class="iface-name">${group.label}</span>
          ${config.show_timestamps !== false
            ? html`<span class="iface-age">${formatAge(age)}</span>`
            : nothing}
        </div>
        <div class="iface-values">
          ${group.download?.mbps !== null && group.download?.mbps !== undefined
            ? html`<span class="iface-value download">
                <ha-icon icon="mdi:arrow-down-bold"></ha-icon>
                ${formatRate(group.download.mbps, unit, decimals)}<span class="u">${unit}</span>
              </span>`
            : nothing}
          ${group.upload?.mbps !== null && group.upload?.mbps !== undefined
            ? html`<span class="iface-value upload">
                <ha-icon icon="mdi:arrow-up-bold"></ha-icon>
                ${formatRate(group.upload.mbps, unit, decimals)}<span class="u">${unit}</span>
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderAggregates(): TemplateResult | typeof nothing {
    const config = this._configOrDefault;
    if (config.aggregates === "off" || config.aggregates === "inline") return nothing;
    const limit = Math.max(0, Number(config.aggregates_max ?? DEFAULT_CONFIG.aggregates_max));
    const include = (config.aggregates_include ?? []).map((label) => label.toLowerCase());
    const groups = (this._view?.aggregates ?? [])
      .filter((group) => include.length === 0 || include.includes(group.label.toLowerCase()))
      .slice(0, limit);
    if (groups.length === 0) return nothing;
    return html`<div class="interfaces">${groups.map((group) => this._renderAggregate(group))}</div>`;
  }

  private _renderDebug(): TemplateResult {
    const sources = this._sources ?? [];
    const ranked = sources.filter((source) => !source.aggregate);
    return html`
      <details class="debug">
        <summary>${sources.length} sensors discovered · ${ranked.length} ranked</summary>
        <ul>
          ${sources.map(
            (source) => html`<li>
              <strong>${source.entityId}</strong> · ${source.direction} · ${source.kind} ·
              ${source.aggregate ? `interface "${source.label}"` : "device"}${source.manual
                ? " · manual"
                : ""}
            </li>`
          )}
        </ul>
      </details>
    `;
  }

  private _renderPanel(direction: Direction, result: RankResult): TemplateResult {
    const rows = this._filtered(result.rows);
    const color = direction === "download" ? this._downloadColor : this._uploadColor;
    const title = direction === "download" ? `Top ${this._limit} Download` : `Top ${this._limit} Upload`;
    const icon = direction === "download" ? "mdi:arrow-down-bold" : "mdi:arrow-up-bold";
    const unit = this._unit;

    return html`
      <section class="panel ${direction}">
        <header class="panel-head">
          <div class="panel-title">
            <div class="badge"><ha-icon .icon=${icon}></ha-icon></div>
            <h2 title="Per-device speed as reported by each device's own sensor. WAN and VPN totals are shown in the interface row.">
              ${title}
            </h2>
          </div>
          <span class="unit">${unit}</span>
        </header>
        ${rows.length > 0
          ? html`<ol class="rows" style=${`--nsm-cols:${this._columns()}`}>
              ${repeat(
                rows,
                (row) => `${direction}:${row.reading.entityId}`,
                (row) => this._renderRow(row, direction, color)
              )}
            </ol>`
          : this._renderEmpty(direction)}
      </section>
    `;
  }

  private _renderEmpty(direction: Direction): TemplateResult {
    const view = this._view;
    const config = this._configOrDefault;
    const filtersActive = Boolean(
      (config.include_entities && config.include_entities.length) ||
        (config.include_integrations && config.include_integrations.length) ||
        (config.pairs && config.pairs.length)
    );
    let message = "No compatible bandwidth sensors discovered yet.";
    if (view && view.sourceCount > 0) {
      message =
        this._filter.trim().length > 0
          ? "No devices match your search."
          : "Waiting for the first reading of the selected sensors.";
    } else if (filtersActive) {
      message = `No ${direction} sensors match the current filters. Open the card editor to adjust the selection.`;
    } else {
      message =
        "No compatible bandwidth sensors found. Open the card editor to select sensors manually or to restrict the integrations.";
    }
    return html`<p class="empty">${message}</p>`;
  }

  private _renderTotals(download: number, upload: number, downloadCount: number, uploadCount: number): TemplateResult {
    const config = this._configOrDefault;
    const unit = this._unit;
    const showDownload = config.show !== "upload";
    const showUpload = config.show !== "download";
    const single = !(showDownload && showUpload);

    return html`
      <footer class="totals ${single ? "single" : ""}">
          ${showDownload
          ? html`<div class="total download" title="Sum of the download values of the devices shown above. This is not the WAN total - the WAN and VPN interfaces are listed separately.">
              <ha-icon class="glyph" icon="mdi:download"></ha-icon>
              <div>
                <div class="label">Total Download (Top ${downloadCount})</div>
                <div class="amount">${formatRate(download, unit, 0)}<span class="u">${unit}</span></div>
              </div>
            </div>`
          : nothing}
        ${showUpload
          ? html`<div class="total upload" title="Sum of the upload values of the devices shown above. This is not the WAN total - the WAN and VPN interfaces are listed separately.">
              <ha-icon class="glyph" icon="mdi:upload"></ha-icon>
              <div>
                <div class="label">Total Upload (Top ${uploadCount})</div>
                <div class="amount">${formatRate(upload, unit, 0)}<span class="u">${unit}</span></div>
              </div>
            </div>`
          : nothing}
      </footer>
    `;
  }

  private _renderHeader(): TemplateResult {
    const config = this._configOrDefault;
    const title = config.title ?? "Network Speed Monitor";
    const subtitle = config.subtitle ?? this._defaultSubtitle();

    return html`
      <div class="head">
        <div class="brand">
          <div class="logo"><ha-icon icon="mdi:lan-connect"></ha-icon></div>
          <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
          </div>
        </div>
        <div class="tools">
          <button
            class="chip live ${this._paused ? "paused" : ""}"
            @click=${this._togglePause}
            title=${this._paused ? "Resume display updates" : "Pause display updates"}
          >
            <span class="dot"></span>${this._paused ? "Paused" : "Live"}
          </button>
          <label class="chip refresh" title="Display refresh interval">
            <ha-icon icon="mdi:refresh"></ha-icon>
            <span>Refresh:</span>
            <select @change=${this._onRefreshChanged}>
              ${REFRESH_INTERVALS.map(
                (seconds) => html`<option value=${String(seconds)} ?selected=${seconds === this._refreshSeconds}>
                  ${seconds}s
                </option>`
              )}
            </select>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </label>
          <div class="menu-wrap">
            <button
              class="chip"
              @click=${this._toggleMenu}
              aria-label="Display settings"
              aria-expanded=${this._menu ? "true" : "false"}
            >
              <ha-icon icon="mdi:cog"></ha-icon>
            </button>
            ${this._menu ? this._renderMenu() : nothing}
          </div>
        </div>
      </div>
    `;
  }

  private _renderMenu(): TemplateResult {
    return html`
      <div class="menu" role="menu">
        <button role="menuitem" @click=${this._togglePause}>
          <span>${this._paused ? "Resume updates" : "Pause updates"}</span>
          <span class="value">${this._paused ? "Paused" : "Live"}</span>
        </button>
        <button role="menuitem" @click=${this._toggleUnit}>
          <span>Display unit</span>
          <span class="value">${this._unit}</span>
        </button>
        <button role="menuitem" @click=${this._toggleCompact}>
          <span>Compact mode</span>
          <span class="value">${this._compact ? "On" : "Off"}</span>
        </button>
        ${RANKING_SIZES.map(
          (size) => html`<button role="menuitem" @click=${() => this._setLimit(size)}>
            <span>Top ${size}</span>
            <span class="value">${this._limit === size ? "✓" : ""}</span>
          </button>`
        )}
        <button role="menuitem" @click=${this._openEditor}><span>Edit card…</span></button>
        <div class="hint">
          Display settings apply to this view. Ranking size, sensors and defaults live in the card
          editor.
        </div>
      </div>
    `;
  }

  private _renderSearch(): TemplateResult {
    return html`
      <div class="search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input
          type="search"
          placeholder="Filter devices"
          .value=${this._filter}
          @input=${(event: Event) => {
            this._filter = (event.target as HTMLInputElement).value;
          }}
        />
      </div>
    `;
  }

  protected override render(): TemplateResult | typeof nothing {
    const config = this._config;
    if (!config) {
      return html`
        <ha-card>
          <div class="wrap">
            <p class="empty">
              Network Speed Monitor ${CARD_VERSION}: waiting for card configuration…
            </p>
          </div>
        </ha-card>
      `;
    }

    const view = this._view;
    const showDownload = config.show !== "upload";
    const showUpload = config.show !== "download";
    const both = showDownload && showUpload;
    const columns = both && (config.layout ?? "auto") !== "stacked";

    const downloadRows = view ? this._filtered(view.download.rows) : [];
    const uploadRows = view ? this._filtered(view.upload.rows) : [];
    const downloadTotal = downloadRows.reduce((sum, row) => sum + currency(row.reading.mbps), 0);
    const uploadTotal = uploadRows.reduce((sum, row) => sum + currency(row.reading.mbps), 0);

    return html`
      <ha-card>
        <div class=${this._wrapClass()} style=${this._wrapStyle()}>
          ${this._renderHeader()} ${config.show_search ? this._renderSearch() : nothing}
          <div class="panels ${columns ? "columns" : ""}">
            ${showDownload ? this._renderPanel("download", view?.download ?? emptyResult()) : nothing}
            ${showUpload ? this._renderPanel("upload", view?.upload ?? emptyResult()) : nothing}
          </div>
          ${this._renderAggregates()}
          ${config.debug ? this._renderDebug() : nothing}
          ${config.show_totals !== false
            ? this._renderTotals(downloadTotal, uploadTotal, downloadRows.length, uploadRows.length)
            : nothing}
        </div>
      </ha-card>
    `;
  }

  protected override updated(): void {
    const nodes = this.renderRoot.querySelectorAll<HTMLElement>(".row");
    const next = new Map<string, number>();
    nodes.forEach((node) => {
      const key = node.dataset.key;
      if (key) next.set(key, node.getBoundingClientRect().top);
    });
    const previous = this._rowPositions;
    this._rowPositions = next;
    if (!previous) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    nodes.forEach((node) => {
      const key = node.dataset.key;
      if (!key) return;
      const before = previous.get(key);
      const after = next.get(key);
      if (before === undefined || after === undefined || before === after) return;
      if (typeof node.animate !== "function") return;
      node.animate(
        [{ transform: `translateY(${before - after}px)` }, { transform: "translateY(0)" }],
        { duration: 320, easing: "cubic-bezier(0.22, 0.61, 0.36, 1)" }
      );
    });
  }
}

function emptyResult(): RankResult {
  return { rows: [], total: 0, scale: 1, candidates: 0 };
}
export const CARD_INFO = {
  type: `custom:${CARD_TAG}`,
  name: "Network Speed Monitor",
  description: "Top 10 live download and upload rankings for your network devices.",
  // No live preview: Home Assistant renders it inside a scaled container where
  // the element can stay in its loading state. The card itself is unaffected.
  preview: false,
  documentationURL: "https://github.com/nikeng-forenade/ha-network-speed-monitor",
  version: CARD_VERSION,
};
