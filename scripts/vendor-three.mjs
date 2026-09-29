import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
mkdirSync(path.join(root, "rebrand/vendor"), { recursive: true });
execFileSync(
  "npx",
  [
    "--yes",
    "esbuild@0.25.10",
    "node_modules/three/build/three.module.js",
    "--bundle",
    "--minify",
    "--format=esm",
    "--outfile=rebrand/vendor/three.js",
  ],
  { cwd: root, stdio: "inherit" },
);
copyFileSync(
  path.join(root, "node_modules/three/LICENSE"),
  path.join(root, "rebrand/vendor/THREE-LICENSE.txt"),
);

// Normalize whitespace in the bundled GLSL template strings without changing tokens.
const bundlePath = path.join(root, "rebrand/vendor/three.js");
const bundle = readFileSync(bundlePath, "utf8")
  .replace(/^[ \t]+/gm, (indent) => indent.replace(/\t/g, "  "))
  .replace(/[ \t]+$/gm, "");
writeFileSync(bundlePath, bundle);
