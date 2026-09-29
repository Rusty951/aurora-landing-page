import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const html = read("rebrand/index.html");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]);
assert.equal(new Set(ids).size, ids.length, "Unique element IDs");
assert.equal((html.match(/<h1\b/g) || []).length, 1, "One h1");
assert.equal((html.match(/<main\b/g) || []).length, 1, "One main");
assert.match(html, /name="robots" content="noindex, nofollow"/);
assert(
  read(".vercelignore").split(/\r?\n/).includes("rebrand/index.html"),
  "Candidate HTML excluded from production",
);
assert(
  !/analytics\.js|fbq\(|gtag\(/.test(html),
  "Candidate sends no conversion events",
);
for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
  const url = match[1].split("?")[0];
  assert(existsSync(resolve(root, "." + url)), `Local target exists: ${url}`);
}
for (const match of html.matchAll(/href="#([^"]+)"/g))
  assert(ids.includes(match[1]), `Anchor ${match[1]} resolves`);
assert.match(html, /href="https:\/\/open\.kakao\.com\/o\/sMBNyzpi"/);
assert.match(read("rebrand/style.css"), /prefers-reduced-motion/);
assert.match(read("rebrand/app.js"), /visibilitychange/);
assert.match(read("rebrand/field.js"), /webglcontextlost/);
assert(
  statSync(resolve(root, "rebrand/assets/resonance.webp")).size < 300000,
  "Hero compressed under 300 KB",
);
assert.match(
  html,
  /aria-pressed="false"\s+aria-label="배경 음악 켜기"/,
  "Sound opt-in",
);
assert(!/<audio[^>]*autoplay/.test(html));
for (const term of [
  "리브랜딩 실행 파트너",
  "리브랜딩 실행 프로젝트",
  "월간 브랜드 마케팅",
  "적합성 대화",
  "리브랜딩 / 월간 / 기타",
])
  assert(
    html.replace(/\s+/g, " ").includes(term),
    `Product scope retained: ${term}`,
  );
console.log(
  `Rebrand checks passed: ${ids.length} IDs, local assets and anchors, opt-in audio and private comparison HTML.`,
);

assert(
  existsSync(resolve(root, "rebrand/vendor/three.js")),
  "Self-hosted renderer present",
);
assert(
  existsSync(resolve(root, "rebrand/vendor/THREE-LICENSE.txt")),
  "Vendor license retained",
);
assert.equal(
  JSON.parse(read("package.json")).dependencies.three,
  "0.186.1",
  "Pinned renderer version",
);
const chapterTags = [...html.matchAll(/data-chapter="(\d)"/g)].map(
  (match) => match[1],
);
assert.deepEqual(
  chapterTags,
  ["0", "1", "2"],
  "Three accessible story chapters",
);
assert.equal(
  (html.match(/data-jump="/g) || []).length,
  3,
  "Direct chapter navigation",
);
assert(
  html.includes("자체 시안"),
  "Concept applications must be clearly labeled",
);
console.log(
  "Candidate delivery contracts passed: local renderers, preserved mesh study, labeled own-brand concepts.",
);
