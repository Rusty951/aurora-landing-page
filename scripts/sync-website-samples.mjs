import {cpSync,existsSync,mkdirSync,readdirSync,readFileSync,writeFileSync,rmSync} from 'node:fs';
import {resolve,dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const source=resolve(process.argv[2]||join(root,'../aurora-website-portfolio'));
const routes=['15-nocte','16-seam-hotel','17-bananablack','02-bitgyeol-curtain','04-neurin-pajang','05-haebit-light','13-chaon-law'];
const dest=join(root,'work/demos');
for(const route of routes)if(!existsSync(join(source,route,'index.html')))throw new Error('Missing canonical sample: '+route);
const known=new Set([...routes,'01-jeongo-eye','12-moseori-studio','assets','medical','professional']);
if(existsSync(dest))for(const entry of readdirSync(dest,{withFileTypes:true}))if(entry.isDirectory()&&!known.has(entry.name))throw new Error('Unrecognized folder; refusing cleanup: '+entry.name);
rmSync(dest,{recursive:true});mkdirSync(dest,{recursive:true});
for(const entry of [...routes,'professional','assets','site.js','foundation.css','reading.css'])if(existsSync(join(source,entry)))cpSync(join(source,entry),join(dest,entry),{recursive:true});
// Archive export contains public pages and static assets only.
const archive=join(dest,'17-bananablack');
for(const entry of ['.claude','supabase','docs','tests','scripts','.github','.vercel','analytics.js','AGENTS.md','CLAUDE.md','PROJECT_GUIDE.md','vercel.json','package.json','package-lock.json','works/manage.html','works/manage.js','works/upload.html','works/upload.js','works/portrait-private.html'])rmSync(join(archive,entry),{recursive:true,force:true});
function archiveBases(folder){for(const entry of readdirSync(folder,{withFileTypes:true})){const file=join(folder,entry.name);if(entry.isDirectory())archiveBases(file);else if(entry.name.endsWith('.html')){const base='/'+file.slice(root.length+1).replace(/[^/]+$/,'').replaceAll('\\','/');writeFileSync(file,readFileSync(file,'utf8').replace(/<head>/,'<head><base href="'+base+'">'));}}}
archiveBases(archive);
for(const route of routes){
 if(route==='17-bananablack')continue;
 const file=join(dest,route,'index.html');let html=readFileSync(file,'utf8');
 html=html.replace(/<head>/,'<head><base href="/work/demos/'+route+'/">');
 html=html.replace(/<a\b[^>]*href=["'][^"']*(?:SOURCES|README)\.md[^"']*["'][^>]*>[\s\S]*?<\/a>/g,'');
 writeFileSync(file,html);
}
writeFileSync(join(dest,'index.html'),'<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=/work?category=website-essential"><title>홈페이지 샘플</title></head><body><a href="/work?category=website-essential">홈페이지 포트폴리오로 이동</a></body></html>');
console.log('Synced canonical samples:',routes.join(', '));
