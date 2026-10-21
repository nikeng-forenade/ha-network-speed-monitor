import { css } from "lit";

export const cardStyles = css`
  :host {
    --nsm-dl: 59, 157, 255;
    --nsm-ul: 34, 197, 94;
    --nsm-fg: var(--primary-text-color, #e6eaf2);
    --nsm-muted: var(--secondary-text-color, #93a0b4);
    --nsm-border: color-mix(in srgb, var(--nsm-fg) 13%, transparent);
    --nsm-surface: color-mix(in srgb, var(--nsm-fg) 4%, transparent);
    --nsm-surface-2: color-mix(in srgb, var(--nsm-fg) 7%, transparent);
    --nsm-track: color-mix(in srgb, var(--nsm-fg) 11%, transparent);
    display: block;
    container-type: inline-size;
  }

  /* Light HA themes get slightly deeper accents so bars and text keep contrast. */
  .wrap.light {
    --nsm-dl: 26, 115, 232;
    --nsm-ul: 22, 163, 74;
    --nsm-surface: color-mix(in srgb, var(--nsm-fg) 3.5%, transparent);
    --nsm-surface-2: color-mix(in srgb, var(--nsm-fg) 6%, transparent);
    --nsm-track: color-mix(in srgb, var(--nsm-fg) 9%, transparent);
  }

  .wrap.light .chip.live {
    color: #15803d;
  }

  .wrap.light .logo {
    background: linear-gradient(135deg, rgba(var(--nsm-dl), 0.16), rgba(var(--nsm-ul), 0.14));
  }

  .wrap.light .menu {
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.18);
  }

  .wrap.light .panel.download {
    border-color: rgba(var(--nsm-dl), 0.25);
  }

  .wrap.light .panel.upload {
    border-color: rgba(var(--nsm-ul), 0.28);
  }

  ha-card {
    overflow: visible;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.2rem 1.3rem 1rem;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.85rem;
    flex-wrap: wrap;
    margin-bottom: 0.1rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    min-width: 0;
  }

  .logo {
    width: 2.95rem;
    height: 2.95rem;
    flex: 0 0 auto;
    border-radius: 0.85rem;
    display: grid;
    place-items: center;
    color: var(--nsm-fg);
    background: linear-gradient(
      135deg,
      rgba(var(--nsm-dl), 0.28),
      rgba(var(--nsm-ul), 0.2)
    );
    border: 1px solid var(--nsm-border);
  }

  .logo ha-icon {
    --mdc-icon-size: 1.85rem;
  }

  .brand h1 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--nsm-fg);
    line-height: 1.15;
  }

  .brand p {
    margin: 0.28rem 0 0;
    font-size: 0.86rem;
    color: var(--nsm-muted);
  }

  .tools {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
    flex-wrap: wrap;
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    height: 2.45rem;
    padding: 0 0.8rem;
    border-radius: 0.75rem;
    border: 1px solid var(--nsm-border);
    background: var(--nsm-surface-2);
    color: var(--nsm-fg);
    font-size: 0.86rem;
    font-family: inherit;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .chip:hover {
    background: color-mix(in srgb, var(--nsm-fg) 11%, transparent);
  }

  .chip ha-icon {
    --mdc-icon-size: 1.15rem;
    color: var(--nsm-muted);
  }

  .chip select {
    all: unset;
    cursor: pointer;
    font: inherit;
    color: var(--nsm-fg);
    padding-right: 0.1rem;
  }

  .chip.live {
    border-color: rgba(var(--nsm-ul), 0.45);
    background: rgba(var(--nsm-ul), 0.12);
    color: rgb(var(--nsm-ul));
    font-weight: 600;
  }

  .chip.paused {
    border-color: rgba(245, 158, 11, 0.5);
    background: rgba(245, 158, 11, 0.14);
    color: #f59e0b;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: currentColor;
    box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 25%, transparent);
    flex: 0 0 auto;
  }

  .menu-wrap {
    position: relative;
  }

  .menu {
    position: absolute;
    right: 0;
    top: 2.5rem;
    z-index: 6;
    min-width: 13.5rem;
    padding: 0.3rem;
    border-radius: 0.7rem;
    border: 1px solid var(--nsm-border);
    background: var(--ha-card-background, var(--card-background-color, #171c25));
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }

  .menu button {
    all: unset;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.5rem 0.6rem;
    border-radius: 0.45rem;
    font-size: 0.82rem;
    color: var(--nsm-fg);
    cursor: pointer;
  }

  .menu button:hover,
  .menu button:focus-visible {
    background: var(--nsm-surface-2);
  }

  .menu .value {
    color: var(--nsm-muted);
    font-size: 0.78rem;
  }

  .menu .hint {
    padding: 0.35rem 0.6rem 0.15rem;
    font-size: 0.7rem;
    color: var(--nsm-muted);
    line-height: 1.35;
  }

  .search {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.35rem 0.6rem;
    border-radius: 0.6rem;
    border: 1px solid var(--nsm-border);
    background: var(--nsm-surface-2);
  }

  .search ha-icon {
    --mdc-icon-size: 1rem;
    color: var(--nsm-muted);
  }

  .search input {
    all: unset;
    flex: 1 1 auto;
    min-width: 0;
    font-size: 0.85rem;
    font-family: inherit;
    color: var(--nsm-fg);
  }

  .panels {
    display: grid;
    gap: 1rem;
  }

  .panels.columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /* Stack the rankings based on the card width, not the window width, so a
     narrow dashboard column gets the same treatment as a phone. */
  @container (max-width: 720px) {
    .panels.columns {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @container (max-width: 560px) {
    .row {
      grid-template-columns: 1.4rem 1.3rem minmax(0, 1fr) minmax(1.5rem, 1.1fr) auto !important;
      gap: 0.45rem;
    }

    .age {
      display: none;
    }

    .wrap {
      padding: 0.9rem 0.8rem 0.75rem;
    }
  }

  .interfaces {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
    gap: 0.45rem;
  }

  .iface {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
    padding: 0.4rem 0.55rem;
    border: 1px solid var(--nsm-border);
    border-radius: 0.6rem;
    background: var(--nsm-surface);
  }

  .iface-head {
    display: flex;
    align-items: center;
    gap: 0.32rem;
    min-width: 0;
  }

  .iface-head ha-icon {
    --mdc-icon-size: 0.95rem;
    color: var(--nsm-muted);
  }

  .iface-name {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--nsm-fg);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .iface-age {
    margin-left: auto;
    font-size: 0.66rem;
    color: var(--nsm-muted);
    white-space: nowrap;
  }

  .iface-values {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .iface-value {
    display: inline-flex;
    align-items: center;
    gap: 0.18rem;
    font-size: 0.8rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .iface-value ha-icon {
    --mdc-icon-size: 0.8rem;
  }

  .iface-value.download {
    color: rgb(var(--nsm-dl));
  }

  .iface-value.upload {
    color: rgb(var(--nsm-ul));
  }

  .iface-value .u {
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--nsm-muted);
    margin-left: 0.2rem;
  }

  .panel {
    border: 1px solid var(--nsm-border);
    border-radius: 1rem;
    padding: 0.95rem 1.05rem 0.65rem;
    background: var(--nsm-surface);
  }

  .panel.download {
    background:
      radial-gradient(130% 120% at 0% 0%, rgba(var(--nsm-dl), 0.12), transparent 62%),
      var(--nsm-surface);
    border-color: rgba(var(--nsm-dl), 0.22);
  }

  .panel.upload {
    background:
      radial-gradient(130% 120% at 0% 0%, rgba(var(--nsm-ul), 0.12), transparent 62%),
      var(--nsm-surface);
    border-color: rgba(var(--nsm-ul), 0.22);
  }

  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.55rem;
  }

  .panel-title {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    min-width: 0;
  }

  .badge {
    width: 2.45rem;
    height: 2.45rem;
    flex: 0 0 auto;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
  }

  .download .badge {
    background: linear-gradient(140deg, rgba(var(--nsm-dl), 0.95), rgba(var(--nsm-dl), 0.55));
    box-shadow: 0 6px 16px rgba(var(--nsm-dl), 0.3);
  }

  .upload .badge {
    background: linear-gradient(140deg, rgba(var(--nsm-ul), 0.95), rgba(var(--nsm-ul), 0.5));
    box-shadow: 0 6px 16px rgba(var(--nsm-ul), 0.28);
  }

  .badge ha-icon {
    --mdc-icon-size: 1.6rem;
  }

  .panel h2 {
    margin: 0;
    font-size: 1.12rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--nsm-fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .panel .unit {
    font-size: 0.8rem;
    color: var(--nsm-muted);
    flex: 0 0 auto;
  }

  .rows {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .row {
    display: grid;
    grid-template-columns: var(--nsm-cols, 1.5rem 1.5rem minmax(0, 1.25fr) minmax(2.5rem, 1.15fr) auto 3.4rem);
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 0.2rem;
    border-radius: 0.5rem;
  }

  .rank {
    text-align: center;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--nsm-muted);
    font-variant-numeric: tabular-nums;
  }

  .icon {
    --mdc-icon-size: 1.25rem;
    color: var(--nsm-fg);
    opacity: 0.85;
    justify-self: center;
  }

  .name {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    min-width: 0;
    font-size: 0.98rem;
    color: var(--nsm-fg);
  }

  .name .text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .name .dot {
    width: 0.4rem;
    height: 0.4rem;
    box-shadow: none;
  }

  .track {
    height: 0.78rem;
    border-radius: 999px;
    background: var(--nsm-track);
    overflow: hidden;
    min-width: 2.5rem;
  }

  .track.history {
    background: transparent;
    height: 0.8rem;
    overflow: visible;
  }

  .track.history .spark {
    height: 100%;
  }

  .fill {
    display: block;
    height: 100%;
    min-width: 2px;
    border-radius: 999px;
    transition:
      width 0.55s cubic-bezier(0.22, 0.61, 0.36, 1),
      background 0.3s ease;
  }

  .download .fill {
    background: linear-gradient(90deg, rgba(var(--nsm-dl), 0.65), rgb(var(--nsm-dl)));
  }

  .upload .fill {
    background: linear-gradient(90deg, rgba(var(--nsm-ul), 0.6), rgb(var(--nsm-ul)));
  }

  .value {
    font-size: 0.98rem;
    font-weight: 700;
    color: var(--nsm-fg);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
    justify-self: end;
  }

  .value .u {
    margin-left: 0.2rem;
    font-size: 0.74rem;
    font-weight: 500;
    color: var(--nsm-muted);
  }

  .age {
    font-size: 0.74rem;
    color: var(--nsm-muted);
    white-space: nowrap;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }

  .row.stale .value,
  .row.stale .name {
    opacity: 0.62;
  }

  .spark {
    width: 100%;
    height: 0.75rem;
    display: block;
    overflow: visible;
  }

  .spark polyline {
    fill: none;
    stroke-width: 2;
    stroke-linejoin: round;
    stroke-linecap: round;
    vector-effect: non-scaling-stroke;
  }

  .empty {
    padding: 1.1rem 0.5rem 1rem;
    text-align: center;
    font-size: 0.82rem;
    color: var(--nsm-muted);
    line-height: 1.45;
  }

  .totals {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    align-items: center;
    border: 1px solid var(--nsm-border);
    border-radius: 1rem;
    background: var(--nsm-surface);
    padding: 0.85rem 0.75rem;
  }

  .totals.single {
    grid-template-columns: minmax(0, 1fr);
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-width: 0;
    padding: 0.1rem 0.5rem;
  }

  .total + .total {
    border-left: 1px solid var(--nsm-border);
  }

  .total .glyph {
    --mdc-icon-size: 1.65rem;
    flex: 0 0 auto;
  }

  .total.download .glyph {
    color: rgb(var(--nsm-dl));
  }

  .total.upload .glyph {
    color: rgb(var(--nsm-ul));
  }

  .total .label {
    font-size: 0.78rem;
    color: var(--nsm-muted);
    line-height: 1.3;
  }

  .total .amount {
    font-size: 1.45rem;
    font-weight: 700;
    color: var(--nsm-fg);
    line-height: 1.2;
    font-variant-numeric: tabular-nums;
  }

  .total .amount .u {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--nsm-muted);
    margin-left: 0.22rem;
  }

  @container (max-width: 460px) {
    .totals {
      grid-template-columns: minmax(0, 1fr);
    }

    .totals:not(.single) .total + .total {
      border-left: 0;
      border-top: 1px solid var(--nsm-border);
      padding-top: 0.55rem;
    }

    .brand h1 {
      font-size: 1.3rem;
    }
  }

  .wrap.compact {
    padding: 0.9rem 0.95rem 0.8rem;
    gap: 0.75rem;
  }

  .wrap.compact .brand h1 {
    font-size: 1.25rem;
  }

  .wrap.compact .brand p {
    display: none;
  }

  .wrap.compact .logo {
    width: 2.45rem;
    height: 2.45rem;
  }

  .wrap.compact .panel {
    padding: 0.7rem 0.8rem 0.45rem;
  }

  .wrap.compact .row {
    padding: 0.28rem 0.1rem;
  }

  .wrap.compact .badge {
    width: 2rem;
    height: 2rem;
  }

  .wrap.compact .badge ha-icon {
    --mdc-icon-size: 1.3rem;
  }

  .wrap.compact .panel h2 {
    font-size: 1rem;
  }

  .wrap.compact .name,
  .wrap.compact .value {
    font-size: 0.9rem;
  }

  .wrap.compact .track {
    height: 0.6rem;
  }

  .wrap.compact .totals {
    padding: 0.65rem 0.5rem;
  }

  .wrap.compact .total .amount {
    font-size: 1.25rem;
  }

  @media (prefers-reduced-motion: reduce) {
    .fill,
    .row {
      transition: none !important;
      animation: none !important;
    }
  }
`;
