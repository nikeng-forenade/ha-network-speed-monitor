import { build, context } from "esbuild";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const version = pkg.version;
const watch = process.argv.includes("--watch");

const integrationDir = join(root, "custom_components/network_speed_monitor");

/** @type {import("esbuild").BuildOptions} */
const options = {
  entryPoints: [join(root, "src/main.ts")],
  outfile: join(root, "dist/network-speed-monitor.js"),
  bundle: true,
  format: "esm",
  target: ["es2021"],
  platform: "browser",
  minify: !watch,
  sourcemap: !watch,
  legalComments: "none",
  define: {
    __CARD_VERSION__: JSON.stringify(version),
  },
  banner: {
    js: `/*! ${pkg.name} v${version} | MIT License */`,
  },
  logLevel: "info",
};

await mkdir(join(root, "dist"), { recursive: true });
await mkdir(integrationDir, { recursive: true });

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}

// Keep versions in sync: package.json -> manifest.json / const.py
const manifestPath = join(integrationDir, "manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
if (manifest.version !== version) {
  manifest.version = version;
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

const constPath = join(integrationDir, "const.py");
const constSource = await readFile(constPath, "utf8");
const nextConst = constSource.replace(/VERSION = "[^"]*"/, `VERSION = "${version}"`);
if (nextConst !== constSource) {
  await writeFile(constPath, nextConst, "utf8");
}

if (!watch) {
  // HACS installs the integration folder, so the bundle ships inside it.
  await copyFile(
    join(root, "dist/network-speed-monitor.js"),
    join(integrationDir, "network-speed-monitor.js")
  );
}
