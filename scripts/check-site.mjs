import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relativePath) => fs.readFileSync(path.join(projectRoot, relativePath), 'utf8');
const fail = (message) => {
  throw new Error(message);
};
const assert = (condition, message) => {
  if (!condition) fail(message);
};
const count = (source, pattern) => (source.match(pattern) || []).length;

const html = read('index.html');
const analytics = read('analytics.js');
const script = read('script.js');
const vercel = JSON.parse(read('vercel.json'));

assert(count(html, /<main\b/gi) === 1, 'index.html must contain exactly one <main>.');
assert(count(html, /<h1\b/gi) === 1, 'index.html must contain exactly one <h1>.');
assert(count(html, /<details\b/gi) >= 1, 'FAQ must use native <details>.');
assert(!/<svg\b/i.test(html), 'Do not add inline SVG assets to index.html.');

const ids = Array.from(html.matchAll(/\bid=["']([^"']+)["']/gi), (match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert(duplicateIds.length === 0, `Duplicate HTML ids: ${[...new Set(duplicateIds)].join(', ')}`);

const trackedElements = html.match(/<a\b[\s\S]*?<\/a>/gi)?.filter((tag) => /\bdata-track=/.test(tag)) || [];
const allowedTrackTypes = new Set(['kakao', 'naver_blog', 'wordpress_blog', 'instagram', 'youtube', 'email']);

assert(trackedElements.length > 0, 'At least one tracked link is required.');
for (const tag of trackedElements) {
  const id = tag.match(/\bid=["']([^"']+)["']/i)?.[1];
  const trackType = tag.match(/\bdata-track=["']([^"']+)["']/i)?.[1];
  assert(Boolean(id), 'Every tracked link must have an id.');
  assert(allowedTrackTypes.has(trackType), `Unknown data-track value on ${id}: ${trackType}`);

  if (trackType === 'kakao') {
    assert(/\bdata-cta-location=["'][^"']+["']/i.test(tag), `Kakao link ${id} needs data-cta-location.`);
  }
  if (/\bdata-primary-cta=["']true["']/i.test(tag)) {
    assert(trackType === 'kakao', `Primary CTA ${id} must be a Kakao link.`);
  }
}

['nav-cta-btn', 'hero-cta-btn', 'interview-cta-btn', 'final-cta-btn', 'footer-kakao-link'].forEach((id) => {
  assert(ids.includes(id), `Required CTA id is missing: ${id}`);
});

assert(/href=["']\/terms\.html["']/.test(html), 'Terms link must be root-relative.');
assert(/href=["']\/privacy\.html["']/.test(html), 'Privacy link must be root-relative.');
assert(/src=["']\/script\.js\?v=6["']/.test(html), 'index.html must load script.js?v=6.');
assert(/src=["']\/analytics\.js\?v=7["']/.test(html), 'index.html must load analytics.js?v=7.');

assert(count(html, /fbq\(['"]track['"],\s*['"]PageView['"]\)/g) === 1, 'Meta PageView must be sent exactly once.');
assert(!/createElement\(['"]noscript['"]\)/.test(html), 'Do not create a dynamic Meta noscript fallback.');
assert(!/fbq\(['"]track['"],\s*['"]Lead['"]\)/.test(html + analytics), 'Client-side Lead events are not allowed.');
assert(/contact_stage:\s*['"]outbound_click['"]/.test(analytics), 'Meta Contact must declare outbound_click stage.');
assert(/closest\(['"]\[data-track\]['"]\)/.test(analytics), 'Analytics must use delegated data-track handling.');
assert(!/getElementById\(['"](?:nav-cta-btn|hero-cta-btn|interview-cta-btn|final-cta-btn)/.test(analytics), 'Do not combine delegated tracking with old id listeners.');
assert(!/aurora-canvas|fade-up|faq-item|kakao-float/.test(script), 'script.js still contains removed UI contracts.');

assert(vercel.trailingSlash === false, 'vercel.json must canonicalize trailing slashes.');
assert(vercel.rewrites?.some((rule) => rule.source === '/interview' && rule.destination === '/index.html'), 'Missing /interview rewrite.');

const heroAsset = path.join(projectRoot, 'assets/aurora-wave-bg.png');
const heroAvifAsset = path.join(projectRoot, 'assets/aurora-wave-bg.avif');
const ogAsset = path.join(projectRoot, 'assets/aurora-og.png');
assert(fs.existsSync(heroAsset), 'Missing hero image asset.');
assert(fs.existsSync(heroAvifAsset), 'Missing optimized AVIF hero image asset.');
assert(fs.statSync(heroAvifAsset).size < 200000, 'Optimized AVIF hero asset must stay below 200KB.');
assert(fs.existsSync(ogAsset), 'Missing Open Graph image asset.');

const ogBuffer = fs.readFileSync(ogAsset);
assert(ogBuffer.subarray(1, 4).toString() === 'PNG', 'Open Graph image must be a PNG.');
assert(ogBuffer.readUInt32BE(16) === 1200 && ogBuffer.readUInt32BE(20) === 630, 'Open Graph image must be 1200x630.');

console.log(`Site contract check passed (${trackedElements.length} tracked links, ${ids.length} unique ids).`);
