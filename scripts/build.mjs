import { build, context } from "esbuild";
import { readFile, mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const watch = process.argv.includes("--watch");

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
    __CARD_VERSION__: JSON.stringify(pkg.version),
  },
  banner: {
    js: `/*! ${pkg.name} v${pkg.version} | MIT License */`,
  },
  logLevel: "info",
};

await mkdir(join(root, "dist"), { recursive: true });

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
  // HACS installs the file from the repository root (`content_in_root: true`).
  await copyFile(
    join(root, "dist/network-speed-monitor.js"),
    join(root, "network-speed-monitor.js")
  );
}
