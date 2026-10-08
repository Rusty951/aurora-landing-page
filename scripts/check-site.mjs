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
const styles = read('rebrand/style.css');
const analytics = read('analytics.js');
const ogCard = read('scripts/og-card.html');
const vercelIgnore = read('.vercelignore');
const vercel = JSON.parse(read('vercel.json'));

// Every shared-style consumer needs the font definitions, including nested details.
const typographyPages = ['index.html',
  ...fs.readdirSync(path.join(projectRoot, 'work'), { recursive: true })
    .filter(file => file.endsWith('.html') && !file.startsWith(`demos${path.sep}`))
    .map(file => path.join('work', file))];
for (const file of typographyPages) {
  assert(count(read(file), /href="\/rebrand\/fonts\.css\?v=1"/g) === 1,
    `${file} must load the shared font definitions exactly once.`);
}
for (const file of ['Arita-buri-SB.woff', 'Arita-dodeum-M.woff']) {
  const font = fs.readFileSync(path.join(projectRoot, 'rebrand/assets/fonts', file));
  assert(font.subarray(0, 4).toString() === 'wOFF', `${file} must be a complete WOFF asset.`);
}

assert(count(html, /<main\b/gi) === 1, 'index.html must contain exactly one <main>.');
assert(count(html, /<h1\b/gi) === 1, 'index.html must contain exactly one <h1>.');
assert(/<h1 class="hero-title">/.test(html) && html.includes('<span>Beyond</span><span>the <em>ordinary.</em></span>'), 'Restore the original English hero and its type structure');
assert(!html.includes('class="hero-message"'), 'Do not reintroduce the rejected Korean hero');
assert(html.includes('<span class="hero-role">리브랜딩 실행 파트너</span>') && html.includes('제품 이미지와 인스타 콘텐츠,<br />웹사이트를 만듭니다.'), 'Restore the original visible hero copy');
assert(html.includes('웹사이트, 콘텐츠, 사진 및 영상'), 'Keep the user-approved service order');
assert(/class="hero-discover magnetic"[\s\S]*?href="#approach"/.test(html), 'Original hero button leads to selected work');
assert(html.includes('첫 상담은 한 시간 이내로 진행합니다.'), 'Keep the improved lower consultation guidance');
assert(!html.includes('무료 진단'), 'Do not invent an unconfirmed free diagnosis offer');
assert(html.includes('함께 일하는 방식') && html.includes('목표와 예산, 일정에 맞춰 작업 범위를 정하고'), 'Describe the collaboration process');
assert(!html.includes('대표가 직접') && !html.includes('대표는 초기 상담'), 'Do not reintroduce representative-led sales copy');
assert(count(html, /<details\b/gi) >= 1, 'FAQ must use native <details>.');
assert(html.includes('자체 시안') && html.includes('AI 이미지'), 'Generated studies must keep own-concept labels and the AI disclosure.');

[
  '외부 마케팅팀',
  '리브랜딩 실행 프로젝트',
  '월간 브랜드 마케팅',
  '첫 상담 문의',
  '업종과 현재 상황'
].forEach((requiredCopy) => {
  assert(html.includes(requiredCopy), `Missing approved site copy: ${requiredCopy}`);
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

assert(html.includes('<title>오로라의소리 | 웹사이트, 콘텐츠, 사진 및 영상과 마케팅 운영</title>'), 'SEO title must match the approved external marketing team position.');
assert(/<meta name="description" content="무엇부터 바꿀지 정하고 필요한 마케팅을 실행합니다\./.test(html), 'Metadata and first-screen role must align.');
assert(!html.includes('필요한 콘텐츠를 정하고 제작까지 맡습니다'), 'Old V2 positioning remains in metadata or body.');
assert(!html.includes('콘텐츠 마케팅"'), 'Old V2 Open Graph alt or metadata remains.');
assert(/href=["']\/rebrand\/style\.css\?v=45["']/.test(html), 'Production must load the released stylesheet.');
assert(/prefers-reduced-motion/.test(styles), 'Reduced-motion handling is required.');
assert(/resonance\.webp/.test(html) && /resonance\.webp/.test(styles), 'Hero must keep a static silk fallback.');
assert(ogCard.includes('외부 마케팅팀') && ogCard.includes('필요한 마케팅을'), 'OG render source must match the approved external marketing team position.');

['README.md', 'AGENTS.md', 'CLAUDE.md', 'docs/', 'prd.md', 'dev-server.mjs', 'scripts/', 'design-qa.md'].forEach((privatePath) => {
  assert(vercelIgnore.split(/\r?\n/).includes(privatePath), `Internal path must be excluded from Vercel: ${privatePath}`);
});

const ids = Array.from(html.matchAll(/\bid=["']([^"']+)["']/gi), (match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
assert(duplicateIds.length === 0, `Duplicate HTML ids: ${[...new Set(duplicateIds)].join(', ')}`);

const allAnchors = html.match(/<a\b[\s\S]*?<\/a\s*>/gi) || [];
const trackedElements = allAnchors.filter((tag) => /\bdata-track=/.test(tag));
const allowedTrackTypes = new Set(['kakao', 'naver_blog', 'instagram', 'youtube', 'email']);
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

['final-cta-btn', 'footer-email-link', 'footer-insta-link'].forEach((id) => {
  assert(ids.includes(id), `Required CTA id is missing: ${id}`);
});

const allKakaoLinks = allAnchors.filter((tag) => /href=["']https:\/\/open\.kakao\.com\//i.test(tag));
assert(allKakaoLinks.length === 2, 'Final and floating Kakao links must both be present.');
assert(allKakaoLinks.filter(tag => /data-primary-cta="true"/.test(tag)).length === 1, 'Final CTA remains the single primary analytics placement.');
assert(allKakaoLinks.every((tag) => tag.includes(approvedKakaoUrl)), 'All Kakao entry points must use the same approved URL.');

assert(/href=["']\/terms\.html["']/.test(html), 'Terms link must be root-relative.');
assert(/href=["']\/privacy\.html["']/.test(html), 'Privacy link must be root-relative.');
assert(/type="module" src="\/rebrand\/app\.js\?v=10"/.test(html), 'Production must load the quiet default-music controller.');
assert(/src=["']\/analytics\.js\?v=8["']/.test(html), 'index.html must load analytics.js?v=8.');

assert(count(html, /fbq\(['"]track['"],\s*['"]PageView['"]\)/g) === 1, 'Meta PageView must be sent exactly once.');
assert(!/createElement\(['"]noscript['"]\)/.test(html), 'Do not create a dynamic Meta noscript fallback.');
assert(!/fbq\(['"]track['"],\s*['"]Lead['"]\)/.test(html + analytics), 'Client-side Lead events are not allowed.');
assert(/contact_stage:\s*['"]outbound_click['"]/.test(analytics), 'Meta Contact must declare outbound_click stage.');
assert(/closest\(['"]\[data-track\]['"]\)/.test(analytics), 'Analytics must use delegated data-track handling.');
assert(!/getElementById\(['"](?:nav-cta-btn|hero-cta-btn|interview-cta-btn|final-cta-btn)/.test(analytics), 'Do not combine delegated tracking with old id listeners.');

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

assert(/name="robots" content="index, follow"/.test(html), 'Production must allow indexing.');
assert(/rel="canonical" href="https:\/\/www\.aurorasound\.kr\/"/.test(html), 'Production canonical must remain the root domain.');
for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
  assert(fs.existsSync(path.join(projectRoot, match[1].split('?')[0])), `Missing production asset: ${match[1]}`);
}
assert(!vercelIgnore.split(/\r?\n/).includes('rebrand/'), 'Production modules cannot be excluded.');
assert(styles.includes('.ad-mode footer [data-track="instagram"]'), 'Paid landing must hide secondary social links.');
console.log(`Site contract check passed (${trackedElements.length} tracked links, ${ids.length} unique ids).`);
