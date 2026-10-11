import assert from 'node:assert/strict';
import {existsSync, readFileSync, statSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root,path),'utf8');
const articles = JSON.parse(read('journal/articles.json'));
const catalog = JSON.parse(read('work/catalog.json'));
assert.equal(new Set(articles.map(a=>a.slug)).size, articles.length, 'Unique article routes');
const routes = ['journal/index.html',...articles.map(a=>`journal/${a.slug}/index.html`)];
for (const path of routes) {
  const html = read(path);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,path+' one heading');
  assert(html.includes('content="noindex, follow"'),'Review fixtures are not indexed');
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
  assert(!read('sitemap.xml').includes(`/journal/${article.slug}`),'Drafts absent from public sitemap');
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
