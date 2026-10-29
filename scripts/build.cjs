const fs = require("node:fs");
const path = require("node:path");
const { isBuiltin } = require("node:module");
const esbuild = require("esbuild");
const vue = require("@vitejs/plugin-vue");

const root = path.resolve(__dirname, "..");
const metadata = require("../package.json");
const shared = [
  "vue", "vue-router", "pinia", "vue-i18n", "cordis", "cosmokit",
  "@vueuse/core", "@vueuse/shared", "@elements-panel/sdk"
];

async function build() {
  const { build: frontendBuild } = await import("vite");
  for (const side of ["panel", "daemon"]) {
    if (!metadata.elementspanel[side]) continue;
    const directory = path.join(root, metadata.elementspanel[side].directory);
    const filename = path.join(directory, "plugin.json");
    const manifest = JSON.parse(fs.readFileSync(filename, "utf8"));
    fs.rmSync(path.join(directory, "backend"), { recursive: true, force: true });
    const backend = await esbuild.build({
      entryPoints: [path.join(directory, "src/backend/index.ts")],
      outfile: path.join(directory, "backend/index.cjs"),
      bundle: true,
      platform: "node",
      format: "cjs",
      target: "node22",
      tsconfig: path.join(root, "tsconfig.json"),
      metafile: true,
      packages: "external"
    });
    for (const output of Object.values(backend.metafile.outputs)) {
      for (const dependency of output.imports.filter((item) => item.external)) {
        const id = dependency.path;
        if (isBuiltin(id)) continue;
        const name = id.startsWith("@") ? id.split("/").slice(0, 2).join("/") : id.split("/")[0];
        if (!metadata.dependencies?.[name]) throw new Error(`Undeclared runtime dependency: ${name}`);
      }
    }
    manifest.id = metadata.elementspanel.id;
    manifest.version = metadata.version;
    manifest.backend = "backend/index.cjs";
    if (side === "panel") {
      const result = await frontendBuild({
        configFile: false,
        root: directory,
        plugins: [vue()],
        build: {
          outDir: path.join(directory, "frontend"),
          emptyOutDir: true,
          sourcemap: false,
          rollupOptions: {
            input: path.join(directory, "src/frontend.ts"),
            // Independently loaded plugins must retain apply/inject exports.
            preserveEntrySignatures: "strict",
            external: (id) => shared.some((name) => id === name || id.startsWith(`${name}/`)),
            output: {
              format: "es",
              entryFileNames: "index.js",
              chunkFileNames: "[name]-[hash].js",
              assetFileNames: (asset) => asset.name?.endsWith(".css")
                ? "assets/style.css"
                : "assets/[name]-[hash][extname]"
            }
          }
        }
      });
      manifest.frontend = "frontend/index.js";
      const styles = result.output
        .filter((item) => item.type === "asset" && item.fileName.endsWith(".css"))
        .map((item) => `frontend/${item.fileName}`)
        .sort();
      if (styles.length) manifest.styles = styles;
      else delete manifest.styles;
      const entry = result.output.find((item) => item.type === "chunk" && item.isEntry);
      if (!entry?.exports.includes("apply")) throw new Error("Frontend plugin must export apply.");
    }
    fs.writeFileSync(filename, `${JSON.stringify(manifest, null, 2)}\n`);
  }
  console.log(`Built ${metadata.name}@${metadata.version}`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
