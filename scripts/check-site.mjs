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
const styles = read('style.css');
const analytics = read('analytics.js');
const script = read('script.js');
const ogCard = read('scripts/og-card.html');
const vercelIgnore = read('.vercelignore');
const vercel = JSON.parse(read('vercel.json'));

assert(count(html, /<main\b/gi) === 1, 'index.html must contain exactly one <main>.');
assert(count(html, /<h1\b/gi) === 1, 'index.html must contain exactly one <h1>.');
assert(count(html, /<details\b/gi) >= 1, 'FAQ must use native <details>.');
assert(!/<svg\b/i.test(html), 'Do not add inline SVG assets to index.html.');

[
  '리브랜딩 실행 파트너',
  '리브랜딩 실행 프로젝트',
  '월간 브랜드 마케팅',
  '적합성 대화',
  '리브랜딩 / 월간 / 기타'
].forEach((requiredCopy) => {
  assert(html.includes(requiredCopy), `Missing approved r2 copy: ${requiredCopy}`);
});

[
  '국내 포털 콘텐츠 매니저 출신',
  '인테리어 업체',
  '치킨 프랜차이즈 가맹 모집',
  '병원 블로그',
  '마케팅 상담하기',
  '어디부터 볼지 정리하겠습니다',
  '상담에서 정한 내용을 직접 실행',
  '고객명과 성과 수치 대신 공개 가능한 작업 범위만 적었습니다'
].forEach((forbiddenCopy) => {
  assert(!html.includes(forbiddenCopy), `Removed or held V2 copy returned: ${forbiddenCopy}`);
});

assert(html.includes('<title>오로라의소리 | 리브랜딩 실행 파트너</title>'), 'SEO title must match the approved r2 position.');
assert(/<meta name="description" content="새 매장·서비스, 리뉴얼, 이전·확장처럼 사업이 바뀌는 순간/.test(html), 'SEO description must begin with the approved change moment.');
assert(!html.includes('필요한 콘텐츠를 정하고 제작까지 맡습니다'), 'Old V2 positioning remains in metadata or body.');
assert(!html.includes('콘텐츠 마케팅"'), 'Old V2 Open Graph alt or metadata remains.');
assert(/href=["']\/style\.css\?v=19["']/.test(html), 'index.html must load style.css?v=19.');
assert(/prefers-reduced-motion/.test(styles), 'Reduced-motion handling is required.');
assert(/aurora-wave-bg\.avif/.test(styles) && /image-set\(/.test(styles), 'Hero wave must keep its AVIF-first image-set.');
assert(ogCard.includes('리브랜딩 실행 파트너') && ogCard.includes('고객에게 보이는 것'), 'OG render source must match the approved r2 position.');

['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/', 'prd.md', 'dev-server.mjs', 'scripts/', 'design-qa.md'].forEach((privatePath) => {
  assert(vercelIgnore.split(/\r?\n/).includes(privatePath), `Internal path must be excluded from Vercel: ${privatePath}`);
});

const ids = Array.from(html.matchAll(/\bid=["']([^"']+)["']/gi), (match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert(duplicateIds.length === 0, `Duplicate HTML ids: ${[...new Set(duplicateIds)].join(', ')}`);

const allAnchors = html.match(/<a\b[\s\S]*?<\/a>/gi) || [];
const trackedElements = allAnchors.filter((tag) => /\bdata-track=/.test(tag));
const allowedTrackTypes = new Set(['kakao', 'naver_blog', 'wordpress_blog', 'instagram', 'youtube', 'email']);
const approvedKakaoUrl = 'https://open.kakao.com/o/sMBNyzpi';

assert(trackedElements.length > 0, 'At least one tracked link is required.');
for (const tag of trackedElements) {
  const id = tag.match(/\bid=["']([^"']+)["']/i)?.[1];
  const trackType = tag.match(/\bdata-track=["']([^"']+)["']/i)?.[1];
  assert(Boolean(id), 'Every tracked link must have an id.');
  assert(allowedTrackTypes.has(trackType), `Unknown data-track value on ${id}: ${trackType}`);

  if (trackType === 'kakao') {
    assert(/\bdata-cta-location=["'][^"']+["']/i.test(tag), `Kakao link ${id} needs data-cta-location.`);
    assert(tag.includes(`href="${approvedKakaoUrl}"`), `Kakao link ${id} must use the approved Open Chat URL.`);
  }
  if (/\bdata-primary-cta=["']true["']/i.test(tag)) {
    assert(trackType === 'kakao', `Primary CTA ${id} must be a Kakao link.`);
  }
}

['nav-cta-btn', 'hero-cta-btn', 'interview-cta-btn', 'final-cta-btn', 'footer-kakao-link'].forEach((id) => {
  assert(ids.includes(id), `Required CTA id is missing: ${id}`);
});

const allKakaoLinks = allAnchors.filter((tag) => /href=["']https:\/\/open\.kakao\.com\//i.test(tag));
assert(allKakaoLinks.length === 5, `Expected five Kakao entry points, found ${allKakaoLinks.length}.`);
assert(allKakaoLinks.every((tag) => tag.includes(approvedKakaoUrl)), 'All Kakao entry points must use the same approved URL.');

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
