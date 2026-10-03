import assert from 'node:assert/strict';
import {readFileSync, writeFileSync, existsSync, statSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#x27;'}[char]));

export function youtubeLink(value) {
  const url = new URL(value);
  assert(url.protocol === 'https:' && !url.username && !url.password && !url.port, 'Use an HTTPS YouTube link');
  let id;
  let shorts = false;
  if (url.hostname === 'youtu.be') id = url.pathname.slice(1);
  else if (['www.youtube.com', 'youtube.com', 'm.youtube.com'].includes(url.hostname)) {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else if (url.pathname.startsWith('/shorts/')) { id = url.pathname.slice(8); shorts = true; }
  }
  assert(typeof id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(id), 'Use a YouTube watch, Shorts or youtu.be video link');
  return `https://www.youtube.com/${shorts ? 'shorts/' + id : 'watch?v=' + id}`;
}

export function publishedVideos(catalog, checkAsset = () => {}) {
  assert(Array.isArray(catalog), 'Video catalog must be an array');
  const slugs = new Set();
  for (const item of catalog) {
    assert(item && typeof item.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug), 'Each video needs a unique slug');
    assert(!slugs.has(item.slug), 'Duplicate video slug: ' + item.slug);
    slugs.add(item.slug);
    assert(typeof item.published === 'boolean', 'Set published explicitly: ' + item.slug);
    if (!item.published) continue;
    assert(['long', 'short'].includes(item.format), 'Video format must be long or short: ' + item.slug);
    for (const key of ['title', 'alt', 'badge']) assert(typeof item[key] === 'string' && item[key].trim(), 'Missing ' + key + ': ' + item.slug);
    assert(typeof item.thumb === 'string' && /^\/work\/assets\/[a-zA-Z0-9_-]+\.(?:webp|png|jpg|jpeg)$/.test(item.thumb), 'Use a local thumbnail: ' + item.slug);
    assert(Number.isSafeInteger(item.durationSeconds) && item.durationSeconds > 0, 'Set the verified video duration: ' + item.slug);
    assert(Number.isSafeInteger(item.width) && Number.isSafeInteger(item.height) && item.width > 0 && item.height > 0 && item.width < 20000 && item.height < 20000, 'Set thumbnail dimensions: ' + item.slug);
    youtubeLink(item.youtubeUrl);
    checkAsset(item);
  }
  return catalog.filter(item => item.published);
}

export function durationLabel(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) % 60;
  const tail = String(seconds % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${tail}` : `${minutes}:${tail}`;
}

export function renderVideoSlots(catalog, checkAsset) {
  const videos = publishedVideos(catalog, checkAsset);
  if (!videos.length) return {kind:'', filters:'', gallery:''};
  const groups = [['long', '롱폼'], ['short', '숏폼']].filter(([format]) => videos.some(item => item.format === format));
  const kind = `<button type="button" data-filter="videos" aria-pressed="false" aria-controls="work-grid">영상 <span>${videos.length}</span></button>`;
  const filters = `<div class="work-filters work-video-filters" role="group" aria-label="영상 형식 선택" hidden><button type="button" data-filter="videos" aria-pressed="false" aria-controls="work-grid">전체</button>${groups.map(([format, label]) => `<button type="button" data-filter="video-${format}" aria-pressed="false" aria-controls="work-grid">${label}</button>`).join('')}</div>`;
  const gallery = `<section id="work-videos" aria-label="영상 작업">${groups.map(([format, label]) => {
    const items = videos.filter(item => item.format === format);
    return `<section class="work-video-group" data-video-format="${format}" aria-labelledby="work-video-${format}-title"><h2 class="work-group-title" id="work-video-${format}-title">${label} <span>${items.length}</span></h2><div class="work-grid work-video-grid">${items.map(item => `<article class="work-card work-video-card" data-category="video" data-format="${format}" data-video-slug="${item.slug}"><a href="${escape(youtubeLink(item.youtubeUrl))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(item.title)}, 유튜브에서 보기, 새 탭"><div class="work-image work-video-image" style="aspect-ratio:${item.width}/${item.height}"><img src="${escape(item.thumb)}" alt="${escape(item.alt)}" width="${item.width}" height="${item.height}" decoding="async" loading="lazy"><span class="work-video-play" aria-hidden="true"><svg viewBox="0 0 24 24" width="22" height="22" focusable="false"><path d="M8 5v14l11-7Z" fill="currentColor"/></svg></span><span class="work-video-duration" aria-label="영상 길이 ${durationLabel(item.durationSeconds)}">${durationLabel(item.durationSeconds)}</span><span class="work-view" aria-hidden="true">유튜브에서 보기 ↗</span></div><div class="work-card-title"><h3>${escape(item.title)}</h3><span aria-hidden="true">↗</span></div><span class="work-badge">${escape(item.badge)}</span></a></article>`).join('')}</div></section>`;
  }).join('')}</section>`;
  return {kind, filters, gallery};
}

export function updateVideoMarkup(html, catalog, checkAsset) {
  const slots = renderVideoSlots(catalog, checkAsset);
  for (const [name, content] of Object.entries(slots)) {
    const start = `<!-- work-video-${name}:start -->`;
    const end = `<!-- work-video-${name}:end -->`;
    assert(html.split(start).length === 2 && html.split(end).length === 2, 'Exactly one video slot: ' + name);
    const from = html.indexOf(start) + start.length;
    const to = html.indexOf(end);
    assert(to >= from, 'Video slot marker order: ' + name);
    html = html.slice(0, from) + '\n' + content + '\n' + html.slice(to);
  }
  const total = (html.match(/<article class="work-card(?:\s[^"]+)?"/g) || []).length;
  html = html.replace(/(<p id="work-count"[^>]*>)\d+개의 작업(<\/p>)/, `$1${total}개의 작업$2`);
  return html;
}

export function checkThumbnail(item) {
  const path = resolve(root, '.' + item.thumb);
  assert(existsSync(path) && statSync(path).isFile(), 'Thumbnail missing: ' + item.thumb);
  assert(statSync(path).size < 250000, 'Keep each thumbnail under 250 kB: ' + item.thumb);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const path = resolve(root, 'work/index.html');
  const original = readFileSync(path, 'utf8');
  const catalog = JSON.parse(readFileSync(resolve(root, 'work/videos.json'), 'utf8'));
  const updated = updateVideoMarkup(original, catalog, checkThumbnail);
  if (process.argv.includes('--check')) assert.equal(updated, original, 'Run npm run build:videos to refresh video markup');
  else if (updated !== original) writeFileSync(path, updated);
  console.log(`Video portfolio ${process.argv.includes('--check') ? 'checked' : 'built'}: ${publishedVideos(catalog).length} published videos.`);
}
