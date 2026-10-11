import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root,path),'utf8');
const articles = JSON.parse(read('journal/articles.json'));
const catalog = JSON.parse(read('work/catalog.json'));
const sitemap = read('sitemap.xml');
const rewrites = JSON.parse(read('vercel.json')).rewrites;
assert.equal(new Set(articles.map(a=>a.slug)).size, articles.length, 'Unique article routes');
const routes = ['journal/index.html',...articles.map(a=>`journal/${a.slug}/index.html`)];
for (const path of routes) {
  const html = read(path);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' one heading');
  const route = '/'+path.replace(/\/index\.html$/,'');
  const canonical = 'https://www.aurorasound.kr'+route;
  assert(html.includes('content="index, follow"'),'Approved journal pages allow indexing');
  assert(!/noindex|화면 검토용 초안|journal-review-note/.test(html),'No review-only labels on published journal');
  assert(html.includes(`rel="canonical" href="${canonical}"`),'Page-specific canonical');
  assert(html.includes(`property="og:url" content="${canonical}"`),'Page-specific share URL');
  assert.equal((sitemap.match(new RegExp(`<loc>${canonical}</loc>`,'g'))||[]).length,1,'One public sitemap entry');
  assert(rewrites.some(r=>r.source===route&&r.destination==='/'+path),'Explicit public journal route');
  assert(!html.includes('datePublished'),'Created dates must not become published dates');
  assert(!html.includes('·'),'No middle dots in new copy');
  assert(!/fbq\(|gtag\(|rebrand\/app\.js|work\/work\.js/.test(html),'No conversion or hero runtime on journal');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,path+' unique IDs');
  for (const m of html.matchAll(/(?:href|src)="([/#][^"]*)"/g)) {
    const url = new URL(m[1],'http://local/'+path.replace(/index\.html$/,''));
    let target = resolve(root,'.'+url.pathname);
    assert(existsSync(target),path+' target exists: '+m[1]);
    if (statSync(target).isDirectory()) target=resolve(target,'index.html');
    assert(existsSync(target),path+' directory index exists');
    if (url.hash) assert(readFileSync(target,'utf8').includes(`id="${url.hash.slice(1)}"`),path+' anchor exists: '+m[1]);
  }
  assert(html.includes('class="journal-mobile-nav"'),'Mobile journal navigation');
  assert(html.includes('href="/#contact"'),'Existing consultation destination');
}
for (const article of articles) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug),'Safe static route');
  assert(catalog.some(p=>p.slug===article.project),'Real portfolio entry');
  const detail = read(`journal/${article.slug}/index.html`);
  const articleBody = detail.match(/<div class="journal-body">[\s\S]*?(?=<section id="related-work")/)?.[0];
  assert(articleBody&&!/가상|샘플|실제 고객|시연 기능/.test(articleBody),'No fictional-business disclosure or production notes in article body');
  const editorialFooter = detail.match(/<footer[\s\S]*?<\/footer>/)?.[0];
  assert(editorialFooter?.includes('설명을 위한 가상 사례입니다.'),'Separate editorial notice in footer');
  const project = read(`work/${article.project}/index.html`);
  assert(detail.includes(`href="/work/${article.project}"`),'Article links to portfolio');
  assert(project.includes(`href="/journal/${article.slug}"`),'Portfolio links back to article');
  assert(detail.includes('실제 고객의 성과 사례를 뜻하지 않습니다.'),'Sample evidence boundary');
  assert(detail.includes('property="og:type" content="article"'),'Article share metadata');
  assert(detail.includes(`property="og:image" content="https://www.aurorasound.kr${article.hero}"`),'Article-specific share image');
  for (const slug of article.related) {
    assert(slug!==article.slug&&articles.some(a=>a.slug===slug),'Valid related article');
    assert(detail.includes(`href="/journal/${slug}"`),'Related article rendered');
  }
  assert(read('index.html').includes(`href="/journal/${article.slug}"`),'Home preview includes article');
}
for (const path of ['index.html','work/index.html',...catalog.map(p=>`work/${p.slug}/index.html`)]) {
  const html=read(path);
  assert(html.includes('href="/journal"'),'Public shell links to journal: '+path);
  assert.equal((html.match(/class="journal-mobile-nav"/g)||[]).length,1,'One mobile nav per shell');
}
console.log(`Journal checks passed: ${articles.length} articles and bidirectional portfolio links.`);

const homeProjects = [...read('index.html').matchAll(/<article class="project[^\"]*">([\s\S]*?)<\/article>/g)];
assert.equal(homeProjects.length,3,'Three selected works');
for (const [index,slug] of ['website-haebit','veil','aurora-in-print'].entries()) {
  assert(homeProjects[index][1].includes(`href="/work/${slug}"`),'Selected work order and destination');
}
assert(!homeProjects[0][1].includes('aria-haspopup'),'Website sample opens its portfolio page directly');
assert(homeProjects[0][1].includes('web-haebit.webp?v=57.2'),'Existing website screenshot is reused');
