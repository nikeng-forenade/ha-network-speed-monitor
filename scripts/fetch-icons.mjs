import { writeFile } from "node:fs/promises";

const ICONS = [
  "lan-connect",
  "arrow-down-bold",
  "arrow-up-bold",
  "arrow-down",
  "arrow-up",
  "download",
  "upload",
  "refresh",
  "chevron-down",
  "cog",
  "magnify",
  "devices",
  "monitor",
  "server",
  "laptop",
  "cellphone",
  "tablet",
  "television",
  "cctv",
  "printer",
  "gamepad-variant",
  "router-network",
  "cloud-outline",
  "earth",
  "vpn",
  "lan",
  "wifi",
];

const VERSION = "7.4.47";
const map = {};

for (const name of ICONS) {
  const response = await fetch(`https://cdn.jsdelivr.net/npm/@mdi/svg@${VERSION}/svg/${name}.svg`);
  if (!response.ok) {
    console.warn(`skipping ${name}: ${response.status}`);
    continue;
  }
  map[name] = await response.text();
}

const header =
  "// Material Design Icons (https://pictogrammers.com/library/mdi/), Apache-2.0.\n" +
  "// Inlined only for the standalone preview harness; Home Assistant provides ha-icon at runtime.\n";

await writeFile("preview/icons.js", `${header}window.MDI_ICONS = ${JSON.stringify(map)};\n`, "utf8");
console.log(`wrote ${Object.keys(map).length} icons`);
