import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

// Local review fixtures, not the publishing registry. See docs/JOURNAL.md.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf8');
const write = (path, value) => writeFileSync(resolve(root, path), value);
const articles = JSON.parse(read('journal/articles.json'));
const catalog = JSON.parse(read('work/catalog.json'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const title = article => article.title.replace(/\n/g, ' ');
const listTitle = article => article.listTitle || title(article);
const arrow = '<span aria-hidden="true">↗</span>';
const link = (url, label) => `<a class="journal-link${label==='글 읽기'?' journal-read-link':''}" href="${escape(url)}">${escape(label)}${label==='글 읽기'?'':' '+arrow}</a>`;
const meta = article => `<div class="journal-meta"><span>${escape(article.kind)}</span><span>${escape(article.topic)}</span></div>`;
const mobileNav = current => `<nav class="journal-mobile-nav" aria-label="모바일 주요 메뉴"><a href="/"${current==='home'?' aria-current="page"':''}>홈</a><a href="/work"${current==='work'?' aria-current="page"':''}>포트폴리오</a><a href="/journal"${current==='journal'?' aria-current="page"':''}>저널</a></nav>`;
function connectPage(html, current) {
  html = html.replace('/rebrand/contact.js?v=5', '/rebrand/contact.js?v=6');
  html = html.replace(/href="\/?#atelier">작업과 선택<\/a>/g, 'href="/journal">저널</a>');
  html = html.replace(/<body class="([^"]+)"/, (_, classes) => `<body class="${classes.replace(/\s*journal-connected/g, '')} journal-connected"`);
  if (!html.includes('href="/journal/journal.css')) html = html.replace('</head>', '<link rel="stylesheet" href="/journal/journal.css?v=1">\n</head>');
  html = html.replace(/<nav class="journal-mobile-nav".*?<\/nav>/gs, '');
  return html.replace('</header>', mobileNav(current)+'</header>');
}
// Existing shell stays owned by the homepage and portfolio.
const shell = read('work/website-chaon/index.html');
const header = connectPage(shell.match(/<header\b.*?<\/header>/s)[0].replace('href="/work" aria-current="page"','href="/work"'), 'journal')
  .replace('href="/journal">저널', 'href="/journal" aria-current="page">저널');
const footer = shell.match(/<footer\b.*?<\/footer>/s)[0].replace(/<aside class="site-notice"[\s\S]*?<\/aside>/, '');
const sharedHead = shell.match(/<link rel="icon"[\s\S]*?<meta property="og:type"/)[0].replace(/<meta property="og:type"$/, '')
  + shell.match(/<link rel="preconnect"[\s\S]*?<script src="\/work\/work\.js/)[0].replace(/<script src="\/work\/work\.js$/, '')
  + '<link rel="stylesheet" href="/journal/journal.css?v=1">';
function page(pageTitle, description, main, after='', editorialNote='') {
  const pageFooter = editorialNote ? footer.replace('<div class="work-footer-meta">', `<aside class="journal-editorial-note" aria-label="편집 안내"><p>${escape(editorialNote)}</p></aside><div class="work-footer-meta">`) : footer;
  return `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${escape(pageTitle)} | 오로라의소리</title><meta name="description" content="${escape(description)}"><meta name="robots" content="noindex, follow">\n${sharedHead}</head>\n<body class="journal-page journal-connected"><a class="skip" href="#main">본문으로 바로가기</a>${header}<main id="main">${main}</main>${after}${pageFooter}</body></html>\n`;
}
function card(article, heading='h2') {
  return `<article class="journal-card"><a class="journal-card-image" href="/journal/${escape(article.slug)}" aria-label="${escape(listTitle(article))}"><img src="${escape(article.hero)}" alt="${escape(article.heroAlt)}" width="1440" height="810" loading="lazy" decoding="async"></a>${meta(article)}<${heading}><a href="/journal/${escape(article.slug)}">${escape(listTitle(article))}</a></${heading}><p>${escape(article.summary)}</p>${link('/journal/'+article.slug,'글 읽기')}</article>`;
}
function consult(article) {
  return `<section class="journal-consult" aria-labelledby="journal-consult-title"><div class="journal-consult-inner"><div><span class="journal-kicker">WITH AURORA</span><h2 id="journal-consult-title">${escape(article.service)}</h2></div><div><p>${escape(article.serviceBody)}</p><a class="journal-consult-link" href="/#contact">프로젝트 상담 안내 ${arrow}</a></div></div></section>`;
}
const first = articles[0];
mkdirSync(resolve(root,'journal'),{recursive:true});
write('journal/index.html',page('Journal / 브랜드를 읽고, 다음을 생각합니다', '사업자가 브랜드를 만들고 운영하는 데 필요한 판단과 오로라의 작업을 살펴보는 저널입니다.',
  `<div class="journal-shell"><p class="journal-kicker">AURORA SOUND / JOURNAL</p><div class="journal-masthead"><h1>Our <em>journal.</em></h1><p>브랜드를 읽고,<br>우리 사업의 다음을 생각합니다.<span class="journal-review-note">화면 검토용 초안 3편</span></p></div><article class="journal-feature"><a class="journal-feature-image" href="/journal/${first.slug}" aria-label="${escape(listTitle(first))}"><img src="${escape(first.hero)}" alt="${escape(first.heroAlt)}" width="1440" height="810" fetchpriority="high" decoding="async"></a><div><p class="journal-kicker">EDITOR'S PICK</p>${meta(first)}<h2><a href="/journal/${first.slug}">${escape(listTitle(first))}</a></h2><p class="journal-feature-summary">${escape(first.summary)}</p>${link('/journal/'+first.slug,'글 읽기')}</div></article><div class="journal-grid-heading"><h2>이어서 읽기</h2><span>판단, 작업, 운영</span></div><div class="journal-grid">${articles.slice(1).map(a=>card(a)).join('')}</div></div>`,
  consult({service:'우리 사업에 필요한 일부터 이야기합니다.',serviceBody:'홈페이지부터 콘텐츠와 채널 운영까지, 현재 상황을 살펴보고 맡길 범위와 우선순위를 정리합니다. 지금 막히는 지점이 있다면 상담에서 이야기해 주세요.'})));
for (const article of articles) {
  const project = catalog.find(p=>p.slug===article.project);
  if (!project) throw new Error('Unknown portfolio project: '+article.project);
  const body = article.sections.map((section,i)=>`<section id="section-${i+1}"><h2>${escape(section.title)}</h2>${section.paragraphs.map(p=>`<p>${escape(p)}</p>`).join('')}</section>${i===0?`<figure><img src="${escape(project.image)}" alt="${escape(project.title)} 홈페이지 디자인 화면" width="${project.width}" height="${project.height}" loading="lazy" decoding="async"><figcaption>${escape(project.title)} / 홈페이지 디자인</figcaption></figure>`:''}`).join('');
  const related = article.related.map(slug=>articles.find(a=>a.slug===slug));
  if (related.some(a=>!a)) throw new Error('Unknown related article');
  const main = `<article class="journal-shell"><header class="journal-article-heading"><a class="journal-back" href="/journal">← 저널 목록</a>${meta(article)}<h1>${escape(article.title)}</h1><p class="journal-deck">${escape(article.summary)}</p><span class="journal-review-note">화면 검토용 초안</span></header><figure class="journal-hero"><img src="${escape(article.hero)}" alt="${escape(article.heroAlt)}" width="1440" height="810" fetchpriority="high" decoding="async"><figcaption>${escape(article.heroCaption)}</figcaption></figure><div class="journal-reading"><aside class="journal-aside" aria-label="글 목차"><p>IN THIS ARTICLE</p><nav aria-label="글 안에서 이동">${article.sections.map((s,i)=>`<a href="#section-${i+1}">${escape(s.title)}</a>`).join('')}<a href="#related-work">관련 작업 보기</a></nav></aside><div class="journal-body"><p class="journal-lead">${escape(article.lead)}</p>${body}<div class="journal-takeaway"><span>우리 사업에 던질 질문</span><p>${escape(article.takeaway)}</p></div></div></div><section id="related-work" class="journal-project" aria-labelledby="journal-project-title"><div class="journal-project-heading"><h2 id="journal-project-title">판단을 화면에서 확인해보세요.</h2><span class="journal-label">RELATED WORK</span></div><div class="journal-project-card"><a href="/work/${escape(project.slug)}" aria-label="${escape(project.title)} 포트폴리오 보기"><img src="${escape(project.image)}" alt="${escape(project.title)} 홈페이지 디자인 화면" width="${project.width}" height="${project.height}" loading="lazy" decoding="async"></a><div><p class="journal-label">WEBSITE DESIGN</p><h3>${escape(project.title)}</h3><p>${escape(article.projectReason)}</p>${link('/work/'+project.slug,'포트폴리오 보기')}</div></div></section></article>`;
  mkdirSync(resolve(root,'journal',article.slug),{recursive:true});
  write(`journal/${article.slug}/index.html`,page(title(article),article.summary,main,consult(article)+`<section class="journal-related" aria-labelledby="journal-related-title"><h2 id="journal-related-title">함께 읽으면 좋은 글</h2><div class="journal-grid">${related.map(a=>card(a,'h3')).join('')}</div></section>`, '편집 안내: 이 글에 등장하는 업체는 설명을 위한 가상 사례입니다. 오로라의 자체 제작 디자인을 참고했으며 실제 고객의 성과 사례를 뜻하지 않습니다.'));
}
const homeBlock = `<section class="journal-home" id="journal" aria-labelledby="journal-home-title"><p class="journal-kicker">AURORA SOUND / JOURNAL</p><div class="journal-masthead"><h2 id="journal-home-title">Our <em>journal.</em></h2><div><p>브랜드를 읽고, 우리 사업의 다음을 생각합니다.</p>${link('/journal','저널 전체 보기')}</div></div><div class="journal-grid">${articles.map(a=>card(a,'h3')).join('')}</div></section>`;
const homeStart = '<!-- JOURNAL HOME START -->';
const homeEnd = '<!-- JOURNAL HOME END -->';
let home = connectPage(read('index.html'),'home');
const homeRegion = homeStart+'\n'+homeBlock+'\n'+homeEnd+'\n';
if (home.includes(homeStart)) home = home.replace(/<!-- JOURNAL HOME START -->[\s\S]*?<!-- JOURNAL HOME END -->\n?/,homeRegion);
else home = home.replace(/(?=\s*<section class="studio")/, '\n'+homeRegion);
if (!home.includes(homeStart)) throw new Error('Missing homepage journal insertion');
write('index.html',home);
for (const path of ['work/index.html',...catalog.map(p=>`work/${p.slug}/index.html`)]) {
  let html = connectPage(read(path),'work');
  html = html.replace(/<!-- JOURNAL WORK START -->[\s\S]*?<!-- JOURNAL WORK END -->/g,'');
  const article = articles.find(a=>path===`work/${a.project}/index.html`);
  if (article) {
    const region = `<!-- JOURNAL WORK START --><section class="journal-work-reading" aria-labelledby="work-reading-title"><div><h2 id="work-reading-title">이 작업의 판단 읽기</h2><div><h3>${escape(title(article))}</h3><p>${escape(article.summary)}</p>${link('/journal/'+article.slug,'저널에서 읽기')}</div></div></section><!-- JOURNAL WORK END -->`;
    if (!html.includes('<nav class="work-project-nav"')) throw new Error('Missing project navigation: '+path);
    html = html.replace('<nav class="work-project-nav"',region+'<nav class="work-project-nav"');
  }
  write(path,html);
}
console.log(`Journal: ${articles.length} local-review articles, homepage preview and related portfolio links generated.`);
