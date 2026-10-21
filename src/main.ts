import { CARD_TAG, CARD_VERSION, EDITOR_TAG } from "./const";
import { CARD_INFO, NetworkSpeedMonitor } from "./card";
import { NetworkSpeedMonitorEditor } from "./editor";
import type { CustomCardEntry } from "./types";

if (!customElements.get(CARD_TAG)) {
  customElements.define(CARD_TAG, NetworkSpeedMonitor);
}

if (!customElements.get(EDITOR_TAG)) {
  customElements.define(EDITOR_TAG, NetworkSpeedMonitorEditor);
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === CARD_TAG)) {
  window.customCards.push(CARD_INFO);
}

console.info(
  `%c NETWORK SPEED MONITOR %c ${CARD_VERSION} `,
  "color:#fff;background:#1a73e8;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px;",
  "color:#1a73e8;background:#e8f0fe;font-weight:700;border-radius:0 4px 4px 0;padding:2px 6px;"
);
