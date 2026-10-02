import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import vm from 'node:vm';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=p=>readFileSync(resolve(root,p),'utf8');
const catalog=JSON.parse(read('work/catalog.json'));
assert.equal(catalog.length,40);
assert.equal(new Set(catalog.map(p=>p.slug)).size,40);
for(const [category,n] of Object.entries({website:6,food:12,product:15,brand:3,carousel:1,character:3})) assert.equal(catalog.filter(p=>p.category===category).length,n,category+' agreed count');
const config=JSON.parse(read('vercel.json'));
const pages=['work/index.html',...catalog.map(p=>`work/${p.slug}/index.html`)];
for(const p of pages) {
 const html=read(p);assert.equal((html.match(/<h1\b/g)||[]).length,1,p+' one h1');
 assert(!/rebrand\/app\.js|fbq\(|gtag\(/.test(html),'No conversion or hero runtime in gallery');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Unique IDs');
 for(const m of html.matchAll(/(?:src|href)="(\/[^"?#]+)(?:[^"<>]*)"/g)) {
  const target=resolve(root,'.'+m[1]);assert(existsSync(target),'Local target: '+m[1]);
  if(statSync(target).isDirectory())assert(existsSync(resolve(target,'index.html')),'Directory index exists');
 }
 const route=p==='work/index.html'?'/work':'/work/'+p.split('/')[1];
 assert(config.rewrites.some(r=>r.source===route&&r.destination==='/'+p),'Production route: '+route);
}
assert.equal((read('work/index.html').match(/class="work-card"/g)||[]).length,40);
assert(!existsSync(resolve(root,'work/demos/client-previews')),'Private client files never copied');
for(const p of catalog) {
 assert(p.width>0&&p.width<20000&&p.height>0&&p.height<30000,'Valid image dimensions');
 assert(existsSync(resolve(root,'.'+p.image)));assert(existsSync(resolve(root,'.'+p.thumb)));
 assert(statSync(resolve(root,'.'+p.thumb)).size<250000,'Gallery thumbnail budget');
 const html=read(`work/${p.slug}/index.html`);
 if(p.category==='website')assert.match(html,/가상 사업체/);
 else if(p.slides) assert.match(html,/오로라 자체/);
 else assert.match(html,/AI/);
 if(p.slug.startsWith('bb-'))assert.match(html,/콘셉트 스케치/);
}
const sourceFiles=JSON.parse(read('docs/PORTFOLIO-SOURCES.json'));
assert.equal(sourceFiles.length,40);
assert(!sourceFiles.some(p=>/01_original|client-previews/.test(p.source||p.source_directory||'')));
assert(config.headers.some(r=>r.source==='/work/demos/:path*'&&r.headers.some(h=>h.value==='noindex, nofollow')));
// Verify the real catalog through both browsing modes and enlargement interactions.
const gallery = read('work/index.html');
assert.equal((gallery.match(/data-full-image=/g)||[]).length,34);
assert.equal((gallery.match(/target="_blank" rel="noopener"/g)||[]).length,7,'Six website links plus original image');
assert.match(gallery,/<dialog class="work-lightbox" aria-labelledby="work-lightbox-title">/);
for (const p of catalog.filter(p=>p.category==='website')) {
 const card=gallery.match(new RegExp('<article class="work-card"[^>]*data-category="website"[^>]*>.*?href="/work/'+p.slug+'".*?</article>'))?.[0];
 assert(card && /href="\/work\/demos\//.test(card),'Website opens live demo and offers description');
}
function browser(start='http://localhost/work',nativeDialog=true,withObserver=false) {
 const subButtons=['images','product','food','brand','carousel','character'].map(filter=>({dataset:{filter},attrs:{},setAttribute(k,v){this.attrs[k]=v;}}));
 const kinds=['images','website'].map(filter=>({dataset:{filter},attrs:{},setAttribute(k,v){this.attrs[k]=v;}}));
 const links=catalog.map(p=>p.category==='website'?null:{
  dataset:{fullImage:p.image,imageTitle:p.subtitle,imageBadge:p.badge,slides:p.slides?JSON.stringify(p.slides):undefined}, href:'http://localhost/work/'+p.slug, isConnected:true, focused:false,
  querySelector:()=>({alt:p.subtitle+' 자체 AI 이미지'}), focus(){this.focused=true;}
 });
 const cards=catalog.map((p,i)=>({dataset:{category:p.category,collection:p.slug.startsWith('bb-')?'sketch':'curated'},hidden:false,querySelector:()=>links[i]}));
 const callbacks={};const filters={hidden:false,querySelectorAll:()=>subButtons};
 const controls={hidden:true,querySelector:()=>filters,querySelectorAll:s=>s.includes('work-kinds')?kinds:[...kinds,...subButtons],contains:b=>[...kinds,...subButtons].includes(b),addEventListener:(e,fn)=>{callbacks[e]=fn;},getBoundingClientRect:()=>({height:104})};
 const ids=['work-count','work-section-title','work-hint','work-sketches','work-curated','work-websites','work-curated-count','work-sketch-count','gallery','work-lightbox-image','work-lightbox-title','work-lightbox-badge','work-lightbox-detail','work-lightbox-original','work-lightbox-transcript','work-lightbox-text','work-lightbox-prev','work-lightbox-next','work-lightbox-position'];
 const nodes=Object.fromEntries(ids.map(id=>[id,{textContent:'',open:false,hidden:false,events:{},addEventListener(e,fn){this.events[e]=fn;},removeAttribute(k){delete this[k];},getBoundingClientRect:()=>({top:240})}]));
 const grid={addEventListener:(e,fn)=>{callbacks.gridClick=fn;}};nodes['work-grid']=grid;
 const dialogEvents={};const dialog={open:false,isConnected:true,showModal:nativeDialog?function(){this.open=true;}:undefined,close(){this.open=false;dialogEvents.close();},addEventListener:(e,fn)=>{dialogEvents[e]=fn;},getBoundingClientRect:()=>({left:10,top:10,right:100,bottom:100})};
 const classNames=new Set();const pop={};const styles={};const header={height:88,getBoundingClientRect(){return{height:this.height};}};const observed=[];let observerCallback;
 const context={document:{querySelector:s=>s==='.work-controls'?controls:s==='.header'?header:dialog,querySelectorAll:()=>cards,getElementById:id=>nodes[id],body:{style:{setProperty:(k,v)=>{styles[k]=v;}},classList:{add:v=>classNames.add(v),remove:v=>classNames.delete(v)}}},window:{scrollY:0,scrollTo:v=>{callbacks.scroll=v;},addEventListener:(e,fn)=>{pop[e]=fn;}},location:{href:start},URL,history:{replaceState:(s,t,u)=>{context.location.href=u.href;}}};
 if(withObserver)context.ResizeObserver=class {constructor(cb){observerCallback=cb;}observe(node){observed.push(node);}};
 vm.runInNewContext(read('work/work.js'),context);
 const visible=()=>cards.filter(c=>!c.hidden&&(c.dataset.collection!=='sketch'||nodes['work-sketches'].open));
 const expand=()=>{nodes['work-sketches'].open=true;nodes['work-sketches'].events.toggle();};
 return {links,cards,filters,kinds,subButtons,nodes,dialog,dialogEvents,classNames,callbacks,context,pop,controls,visible,expand,styles,header,observed,observerCallback};
}
const b=browser();assert.equal(b.controls.hidden,false);assert.equal(b.visible().length,16);assert.equal(b.nodes['work-count'].textContent,'이미지 34개 · 16개 표시, 스케치 18개 접힘');
assert.equal(b.styles['--work-header-height'],'88px');assert.equal(b.styles['--work-controls-height'],'104px');
b.header.height=96;b.pop.resize();assert.equal(b.styles['--work-header-height'],'96px','Resize fallback updates sticky offset');
const observed=browser(undefined,true,true);assert.equal(observed.observed.length,2);observed.header.height=102;observed.observerCallback();assert.equal(observed.styles['--work-header-height'],'102px','Header resizing updates sticky offset');
for(const [category,total,initial,sketches] of [['website',6,6,0],['food',12,6,6],['product',15,3,12],['brand',3,3,0],['carousel',1,1,0],['character',3,3,0],['images',34,16,18]]) {
 const button=[...b.kinds,...b.subButtons].find(x=>x.dataset.filter===category);b.callbacks.click({target:{closest:()=>button}});
 assert.equal(b.cards.filter(c=>!c.hidden).length,total);assert.equal(b.visible().length,initial);assert.equal(button.attrs['aria-pressed'],'true');
 assert.equal(b.filters.hidden,category==='website');assert.equal(b.nodes['work-sketches'].hidden,sketches===0);
 assert.equal(b.nodes['work-curated'].hidden,category==='website');assert.equal(b.nodes['work-websites'].hidden,category!=='website');
 assert.equal(b.nodes['work-sketch-count'].textContent,sketches);assert.equal(b.nodes['work-curated-count'].textContent,initial);
 assert.equal(b.nodes['work-hint'].textContent.includes('콘셉트 스케치'),sketches>0,'Sketch guidance only accompanies an available sketch group');
 assert.equal(b.nodes['work-hint'].textContent.includes('새 탭'),category==='website','Website guidance follows the selected browsing mode');
 const base=`${category==='website'?'웹사이트':'이미지'} ${total}개`;
 assert.equal(b.nodes['work-count'].textContent,base+(sketches?` · ${initial}개 표시, 스케치 ${sketches}개 접힘`:''));
 assert.equal(b.kinds[0].attrs['aria-pressed'],String(category!=='website'));
 if(sketches){b.expand();assert.equal(b.visible().length,total);assert.equal(b.nodes['work-count'].textContent,base);}
 assert.equal(b.callbacks.scroll.top,144,'New filter returns to gallery below measured header');
}
assert(!b.context.location.href.includes('category='));
for(const [category,n] of Object.entries({website:6,food:6,carousel:1,character:3,unknown:16,all:16})) {
 const state=browser('http://localhost/work?category='+category);assert.equal(state.visible().length,n,'URL state '+category);
}
b.context.location.href='http://localhost/work?category=website';b.pop.popstate();assert.equal(b.visible().length,6);
b.context.location.href='http://localhost/work';b.pop.popstate();assert.equal(b.visible().length,16,'History restores collapsed selection');
const link=b.links.find(Boolean);
function imageClick(link,extra={}) {let prevented=false;const event={target:{closest:()=>link},button:0,preventDefault(){prevented=true;},...extra};b.callbacks.gridClick(event);return prevented;}
assert.equal(imageClick(link,{metaKey:true}),false);assert.equal(b.dialog.open,false,'Modified click retains native link');
const hiddenSketch=b.links[catalog.findIndex(p=>p.slug.startsWith('bb-'))];assert.equal(imageClick(hiddenSketch),false,'Closed sketches cannot open or leak into viewer');
assert.equal(imageClick(link),true);assert.equal(b.dialog.open,true);assert.equal(b.nodes['work-lightbox-image'].src,link.dataset.fullImage);assert.equal(b.nodes['work-lightbox-image'].alt,link.querySelector('img').alt);assert.equal(b.nodes['work-lightbox-detail'].href,link.href);assert(b.classNames.has('work-image-open'));
assert.equal(b.nodes['work-lightbox-original'].href,link.dataset.fullImage);assert.equal(b.nodes['work-lightbox-transcript'].hidden,true);
assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 16');
b.nodes['work-lightbox-next'].events.click();
assert.equal(b.nodes['work-lightbox-position'].textContent,'2 / 16');assert.equal(b.nodes['work-lightbox-title'].textContent,catalog[1].subtitle);
assert.equal(b.nodes['work-lightbox-original'].href,catalog[1].image);assert.equal(b.nodes['work-lightbox-detail'].href,b.links[1].href);
b.nodes['work-lightbox-prev'].events.click();assert.equal(b.nodes['work-lightbox-image'].src,link.dataset.fullImage);
b.dialogEvents.click({target:b.dialog,clientX:50,clientY:50});assert.equal(b.dialog.open,true,'Interior does not close image');
b.dialogEvents.click({target:b.dialog,clientX:150,clientY:150});assert.equal(b.dialog.open,false);assert(link.focused);assert(!b.classNames.has('work-image-open'));assert.equal(b.nodes['work-lightbox-image'].src,undefined);assert.equal(b.nodes['work-lightbox-original'].href,undefined);
// Expanded sketches become navigable; closing them removes them from the next session.
b.expand();assert(imageClick(hiddenSketch));assert.equal(b.nodes['work-lightbox-position'].textContent,'17 / 34');b.dialog.close();
b.nodes['work-sketches'].open=false;b.nodes['work-sketches'].events.toggle();assert(imageClick(link));assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 16');b.dialog.close();
// The viewer must stay within the selected category and its expanded sections.
b.context.location.href='http://localhost/work?category=food';b.pop.popstate();
const food=catalog.map((p,i)=>p.category==='food'&&!p.slug.startsWith('bb-')?b.links[i]:null).filter(Boolean);
assert(imageClick(food[0]));assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 6');
b.nodes['work-lightbox-prev'].events.click();assert.equal(b.nodes['work-lightbox-detail'].href,food.at(-1).href);assert.equal(b.nodes['work-lightbox-position'].textContent,'6 / 6');
let prevented=false;b.dialogEvents.keydown({key:'ArrowRight',preventDefault(){prevented=true;}});assert(prevented);assert.equal(b.nodes['work-lightbox-detail'].href,food[0].href);
b.dialogEvents.keydown({key:'ArrowLeft',metaKey:true,preventDefault(){assert.fail('Modified shortcut intercepted');}});assert.equal(b.nodes['work-lightbox-detail'].href,food[0].href);
b.dialogEvents.keydown({key:'ArrowLeft',preventDefault(){}});assert.equal(b.nodes['work-lightbox-detail'].href,food.at(-1).href);
b.nodes['work-lightbox-next'].events.click();assert.equal(b.nodes['work-lightbox-detail'].href,food[0].href);
b.dialog.close();assert(food[0].focused,'Focus returns to opening card after navigation');
b.expand();assert(imageClick(food[0]));assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 12');b.dialog.close();
const fallback=browser('http://localhost/work',false);assert.equal(fallback.callbacks.gridClick,undefined,'Unsupported dialog keeps existing detail links');
assert.match(gallery,/<details class="work-sketches" id="work-sketches"><summary>/,'Native disclosure works without JavaScript');
assert.match(gallery,/<a id="work-lightbox-original"[^>]*target="_blank"[^>]*rel="noopener"/);
const cardMarkup=[...gallery.matchAll(/<article class="work-card".*?<\/article>/gs)].map(m=>m[0]);
const markupOrder=cardMarkup.map(c=>c.match(/href="\/work\/(?!demos\/)([^"/]+)"/)[1]);
assert.deepEqual(markupOrder,catalog.map(p=>p.slug),'Catalog and visible order match');
assert(catalog.slice(0,12).every(p=>p.category!=='website'&&!p.slug.startsWith('bb-')),'12 finished images first');
assert(catalog.slice(16,34).every(p=>p.slug.startsWith('bb-')),'18 sketches follow');
assert(catalog.slice(34).every(p=>p.category==='website'),'6 website samples preserved');
console.log('Portfolio passed: 40 works, filters, 6 direct demos, 8-slide carousel, 3 character series, previous/next, keyboard, touch gestures, focus and fallback.');

// Real series metadata must match the clickable HTML and static fallback pages.
const decodeAttr=s=>s.replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
assert(!JSON.stringify(catalog).includes('/Users/'),'No private source paths in public catalog');
assert(catalog.slice(12,16).every(p=>['carousel','character'].includes(p.category)),'Own series follow the 12 finished images');
for (const p of catalog.filter(p=>p.slides)) {
 assert.equal(p.slides.length,p.category==='carousel'?8:3);
 const card=cardMarkup.find(c=>c.includes('href="/work/'+p.slug+'"'));
 const slides=JSON.parse(decodeAttr(card.match(/data-slides="([^"]+)"/)[1]));
 assert.deepEqual(slides,p.slides.map(({image,alt,caption,text})=>({image,alt,caption,...(text?{text}:{})})));
 const html=read(`work/${p.slug}/index.html`);
 for(const slide of p.slides) {
  assert(slide.width>0&&slide.height>0);
  assert(existsSync(resolve(root,'.'+slide.image)));
  assert(existsSync(resolve(root,'.'+slide.thumb)));
  assert(statSync(resolve(root,'.'+slide.thumb)).size<250000);
  assert(html.includes(`src="${slide.image}"`),'Series fallback includes every image');
 }
}
function select(category) {b.context.location.href='http://localhost/work?category='+category;b.pop.popstate();}
select('carousel');
const carouselIndex=catalog.findIndex(p=>p.category==='carousel');
const carousel=catalog[carouselIndex], carouselLink=b.links[carouselIndex];
assert(imageClick(carouselLink));assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 8');
assert.equal(b.nodes['work-lightbox-text'].textContent,carousel.slides[0].text);assert.equal(b.nodes['work-lightbox-transcript'].hidden,false);b.nodes['work-lightbox-transcript'].open=true;
b.nodes['work-lightbox-prev'].events.click();assert.equal(b.nodes['work-lightbox-position'].textContent,'8 / 8');
assert.equal(b.nodes['work-lightbox-image'].src,carousel.slides[7].image);assert.equal(b.nodes['work-lightbox-original'].href,carousel.slides[7].image);assert.equal(b.nodes['work-lightbox-text'].textContent,carousel.slides[7].text);assert.equal(b.nodes['work-lightbox-transcript'].open,true,'Transcript stays open while reading slides');
assert.equal(b.nodes['work-lightbox-detail'].href,carouselLink.href);
b.nodes['work-lightbox-next'].events.click();assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 8');
b.dialogEvents.keydown({key:'ArrowRight',preventDefault(){}});assert.equal(b.nodes['work-lightbox-position'].textContent,'2 / 8');
const imageNode=b.nodes['work-lightbox-image'];
function swipe(from,to) {imageNode.events.touchstart({touches:[{clientX:from[0],clientY:from[1]}]});imageNode.events.touchend({changedTouches:[{clientX:to[0],clientY:to[1]}]});}
swipe([160,100],[40,105]);assert.equal(b.nodes['work-lightbox-position'].textContent,'3 / 8');
swipe([40,100],[160,105]);assert.equal(b.nodes['work-lightbox-position'].textContent,'2 / 8');
swipe([100,100],[110,220]);assert.equal(b.nodes['work-lightbox-position'].textContent,'2 / 8','Vertical scroll does not advance');
imageNode.events.touchstart({touches:[{clientX:160,clientY:100},{clientX:180,clientY:100}]});
imageNode.events.touchend({changedTouches:[{clientX:40,clientY:100}]});assert.equal(b.nodes['work-lightbox-position'].textContent,'2 / 8','Pinch does not advance');
b.dialog.close();assert(carouselLink.focused);assert(!b.classNames.has('work-image-open'));assert.equal(b.nodes['work-lightbox-text'].textContent,'');assert.equal(b.nodes['work-lightbox-transcript'].hidden,true);assert.equal(b.nodes['work-lightbox-transcript'].open,false);
select('character');
for(const [i,p] of catalog.entries()) if(p.category==='character') {
 const link=b.links[i];assert(imageClick(link));
 assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 3');assert.equal(b.nodes['work-lightbox-transcript'].hidden,true,'Character series has no stale editorial text');
 for(let j=0;j<3;j++) {
  assert.equal(b.nodes['work-lightbox-image'].src,p.slides[j].image);
  assert.equal(b.nodes['work-lightbox-image'].alt,p.slides[j].alt);
  assert.equal(b.nodes['work-lightbox-detail'].href,link.href);
  assert.equal(b.nodes['work-lightbox-title'].textContent,p.subtitle+' / '+p.slides[j].caption);
  b.nodes['work-lightbox-next'].events.click();
 }
 assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 3');assert.equal(b.nodes['work-lightbox-transcript'].hidden,true,'Character series has no stale editorial text');b.dialog.close();assert(link.focused);
}
select('carousel');carouselLink.dataset.slides='malformed';assert(imageClick(carouselLink));
assert.equal(b.nodes['work-lightbox-position'].textContent,'1 / 1');assert(b.nodes['work-lightbox-next'].disabled);assert.equal(b.nodes['work-lightbox-transcript'].hidden,true,'Invalid metadata retains safe image fallback');
b.dialog.close();
console.log('Series passed: all 17 source images connected, no private paths, static fallback and malformed metadata fallback.');


// Demo documents must resolve assets at Vercel's canonical URL without a slash.
let demoDocuments = 0;
for (const rule of config.rewrites.filter(r => r.source.startsWith('/work/demos/'))) {
 const folder = dirname(resolve(root, '.' + rule.destination));
 for (const file of readdirSync(folder).filter(file => file.endsWith('.html'))) {
  const documentPath = file === 'index.html' ? rule.source : rule.source + '/' + file;
  const html = readFileSync(resolve(folder, file), 'utf8');
  const refs = [...html.matchAll(/(?:src|href|poster)=["']([^"']+)["']/g)].map(m => m[1]);
  refs.push(...[...html.matchAll(/url\(&quot;([^&]+)&quot;\)/g)].map(m => m[1]));
  for (const ref of refs) {
   if (ref.startsWith('#')) continue;
   const url = new URL(ref.replace(/&amp;/g, '&'), 'https://www.aurorasound.kr' + documentPath);
   if (url.origin !== 'https://www.aurorasound.kr') continue;
   const target = resolve(root, '.' + decodeURIComponent(url.pathname));
   assert(existsSync(target), 'Demo URL after canonical redirect: ' + documentPath + ' -> ' + url.pathname);
   assert(!/\/(?:SOURCES|README)\.md$/.test(url.pathname), 'Demo must not link to deployment-excluded notes: ' + documentPath);
   if (statSync(target).isDirectory()) assert(existsSync(resolve(target, 'index.html')), 'Demo directory link needs an index: ' + url.pathname);
  }
  demoDocuments++;
 }
}
console.log('Demo canonical routes passed: ' + demoDocuments + ' HTML documents.');
