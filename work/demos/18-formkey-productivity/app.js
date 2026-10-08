(()=>{
 'use strict';
 const $=(s,root=document)=>root.querySelector(s);
 const all=(s,root=document)=>[...root.querySelectorAll(s)];
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const icon=(name,alt='')=>`<img src="assets/icons/${name}.svg" alt="${escape(alt)}">`;
 const commands=[
  {id:'search',title:'Quick Search',subtitle:'Files, notes & everyday commands',ko:'검색 파일 찾기 문서',icon:'magnifying-glass',description:'필요한 작업을 찾아 목록에서 선택해 보세요.',meta:'Apps / Files / Commands'},
  {id:'notes',title:'Quick Notes',subtitle:'Capture a thought',ko:'메모 노트 작성 생각',icon:'note-pencil',description:'떠오른 생각을 짧게 남겨보세요.',meta:'Personal workspace'},
  {id:'focus',title:'Focus Session',subtitle:'A little room for deep work',ko:'집중 타이머 시간',icon:'timer',description:'하나의 작업에 머무르는 시간을 만들어보세요.',meta:'25 minute session'},
  {id:'clipboard',title:'Clipboard Preview',subtitle:'Your everyday words',ko:'복사 클립보드 텍스트',icon:'clipboard-text',description:'자주 쓰는 문장을 가까이 두고 꺼내 쓰세요.',meta:'Sample text / local preview'},
  {id:'brief',title:'Project Brief',subtitle:'Studio / Spring workspace',ko:'프로젝트 기획 문서',icon:'file-text',description:'작업의 목적과 다음 할 일을 한곳에 정리합니다.',meta:'Demo document / Updated today'},
  {id:'calendar',title:'Weekly Planning',subtitle:'Make space for the week',ko:'일정 달력 주간 계획',icon:'calendar-blank',description:'이번 주에 집중할 일을 작게 나눠봅니다.',meta:'Demo schedule / Personal'},
  {id:'files',title:'Recent Files',subtitle:'Keep it within reach',ko:'최근 파일 자료 찾기',icon:'folder-open',description:'자주 찾는 작업 자료를 한곳에서 살펴보세요.',meta:'3 example files'}
 ];
 const state={note:'오늘 가장 먼저 할 일은 무엇인가요?\n\n- 한 가지 우선순위 정하기\n- 다음 작은 작업 시작하기',focusSeconds:1500,focusEnds:0,focusRunning:false};
 const contexts=[{name:'inline',input:$('#inline-search'),results:$('#inline-results'),preview:$('#inline-preview'),selected:'search',filtered:commands},{name:'dialog',input:$('#dialog-search'),results:$('#dialog-results'),preview:$('#dialog-preview'),selected:'search',filtered:commands}];
 const dialog=$('#command-dialog'),teamDialog=$('#team-dialog');let commandOpener=null,teamOpener=null,toastTimer=0;
 function restoreFocus(opener){if(opener?.isConnected&&opener.getClientRects().length)opener.focus({preventScroll:true});else if(menuToggle.getClientRects().length)menuToggle.focus({preventScroll:true});else $('.hero-button').focus({preventScroll:true})}
 function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),2300)}
 const time=seconds=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`;
 function focusRemaining(){return state.focusRunning?Math.max(0,Math.ceil((state.focusEnds-Date.now())/1000)):state.focusSeconds}
 function renderPreview(context){
  const command=commands.find(c=>c.id===context.selected);
  if(!command){context.preview.innerHTML='<p>검색어를 바꾸거나 목록에서 작업을 선택해 보세요.</p>';return}
  const base=`<span class="preview-icon">${icon(command.icon)}</span><h3>${command.title}</h3>`;
  let body=`<p>${command.description}</p><div class="preview-meta">${command.meta}</div>`;
  if(command.id==='notes')body=`<label class="sr-only" for="${context.name}-note">메모 작성</label><textarea class="note-editor" id="${context.name}-note" spellcheck="false">${escape(state.note)}</textarea><button class="preview-action preview-save-note" data-note-save="${context.name}">${icon('check')}Save note</button><div class="preview-meta">새로고침 전까지 이 시연 안에서 유지됩니다.</div>`;
  else if(command.id==='focus')body=`<p>${command.description}</p><div class="focus-preview-clock" data-focus-clock>${time(focusRemaining())}</div><div class="focus-preview-actions"><button class="preview-action" data-focus-toggle>${icon(state.focusRunning?'pause':'play')}<span>${state.focusRunning?'Pause':'Start session'}</span></button><button class="preview-action" data-focus-reset>${icon('arrows-clockwise')}Reset</button></div>`;
  else if(command.id==='clipboard')body=`<p>${command.description}</p><div class="preview-copy">안녕하세요. 준비된 자료와 현재 상황을 함께 살펴보고, 다음 작업을 정리해보겠습니다.</div><button class="preview-action" data-copy-text>${icon('clipboard-text')}Copy text</button><div class="preview-meta">예시 문장만 복사합니다.</div>`;
  else if(command.id==='brief')body='<p>Studio / Spring workspace</p><div class="preview-copy">목표\n작업의 방향을 간단한 문장으로 정리하기.\n\n다음 할 일\n1. 자료 살펴보기\n2. 첫 화면 구성하기\n3. 작은 화면에서 확인하기</div>';
  else if(command.id==='calendar')body='<p>이번 주의 작은 계획</p><div class="preview-copy">MON　Gather the ideas\nTUE　Shape the first draft\nWED　Make a little progress\nTHU　Review what matters\nFRI　Leave room for next week</div>';
  else if(command.id==='files')body='<p>최근에 살펴본 예시 자료</p><div class="preview-copy">Project brief.md\nWorkspace ideas.txt\nWeekly notes.md</div><button class="preview-action" data-open-notes>'+icon('note-pencil')+'Open notes</button>';
  else body+=`<button class="preview-action" data-open-notes>${icon('note-pencil')}Start with a note</button>`;
  context.preview.innerHTML=base+body;
 }
 function revealSelection(context){const row=all('.command-item',context.results).find(b=>b.dataset.id===context.selected);if(!row)return;const r=row.getBoundingClientRect(),box=context.results.getBoundingClientRect();if(r.top<box.top+5)context.results.scrollTop-=box.top-r.top+5;else if(r.bottom>box.bottom-5)context.results.scrollTop+=r.bottom-box.bottom+5}
 function select(context,id){context.selected=id;all('.command-item',context.results).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));renderPreview(context);revealSelection(context)}
 function renderResults(context){
  const q=context.input.value.trim().toLowerCase();context.filtered=commands.filter(c=>`${c.title} ${c.subtitle} ${c.ko}`.toLowerCase().includes(q));if(q)context.filtered.sort((a,b)=>{const rank=c=>c.title.toLowerCase().includes(q)?0:c.ko.includes(q)?1:2;return rank(a)-rank(b)});
  if(q||!context.filtered.some(c=>c.id===context.selected))context.selected=context.filtered[0]?.id||null;
  context.results.innerHTML=context.filtered.length?'<p class="command-group">'+(q?'Search results':'Suggested commands')+'</p>'+context.filtered.map(c=>`<button class="command-item" data-id="${c.id}" aria-pressed="${c.id===context.selected}"><span class="command-icon">${icon(c.icon)}</span><span>${c.title}<small>${c.subtitle}</small></span>${icon('caret-right')}</button>`).join(''):'<p class="empty-result">일치하는 작업이 없습니다.<br>검색어나 검색할 분야를 바꿔보세요.</p>';
  renderPreview(context);revealSelection(context);
 }
 contexts.forEach(context=>{
  renderResults(context);context.input.addEventListener('input',()=>renderResults(context));
  context.input.addEventListener('keydown',event=>{if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const index=context.filtered.findIndex(c=>c.id===context.selected);const next=context.filtered[(index+(event.key==='ArrowDown'?1:-1)+context.filtered.length)%context.filtered.length];if(next)select(context,next.id)}else if(event.key==='Enter'){event.preventDefault();if(context.selected==='notes')$('.note-editor',context.preview)?.focus();else if(context.selected==='search'){select(context,'notes');toast('Quick Notes를 열었습니다.')}else{const action=$('.preview-action',context.preview);if(action)action.click();else toast('선택한 예시 작업을 살펴보세요.')}}});
  context.results.addEventListener('click',event=>{const button=event.target.closest('.command-item');if(button)select(context,button.dataset.id)});
  context.preview.addEventListener('input',event=>{if(event.target.matches('.note-editor'))state.note=event.target.value});
  context.preview.addEventListener('click',event=>{
   const button=event.target.closest('button');if(!button)return;
   if(button.hasAttribute('data-note-save')){state.note=$('.note-editor',context.preview).value;toast('메모를 시연 공간에 남겼습니다.');return}
   if(button.hasAttribute('data-open-notes')){select(context,'notes');return}
   if(button.hasAttribute('data-focus-toggle')){if(state.focusRunning){state.focusSeconds=focusRemaining();state.focusRunning=false}else{if(state.focusSeconds===0)state.focusSeconds=1500;state.focusEnds=Date.now()+state.focusSeconds*1000;state.focusRunning=true}contexts.filter(c=>c.selected==='focus').forEach(renderPreview);$('[data-focus-toggle]',context.preview)?.focus({preventScroll:true});return}
   if(button.hasAttribute('data-focus-reset')){state.focusRunning=false;state.focusSeconds=1500;contexts.filter(c=>c.selected==='focus').forEach(renderPreview);$('[data-focus-reset]',context.preview)?.focus({preventScroll:true});return}
   if(button.hasAttribute('data-copy-text'))copyText('안녕하세요. 준비된 자료와 현재 상황을 함께 살펴보고, 다음 작업을 정리해보겠습니다.');
  });
 });
 setInterval(()=>{if(!state.focusRunning)return;const remaining=focusRemaining();all('[data-focus-clock]').forEach(e=>e.textContent=time(remaining));if(remaining===0){state.focusRunning=false;state.focusSeconds=0;contexts.filter(c=>c.selected==='focus').forEach(renderPreview);toast('집중 시간을 마쳤습니다.')}},1000);
 const menuToggle=$('.menu-toggle'),mobileMenu=$('#mobile-menu');
 function setMenu(open){menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');$('img',menuToggle).src=`assets/icons/${open?'x':'list'}.svg`;mobileMenu.hidden=!open;document.body.classList.toggle('modal-open',open)}
 menuToggle.addEventListener('click',()=>setMenu(menuToggle.getAttribute('aria-expanded')!=='true'));
 all('a',mobileMenu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));
 function openCommand(id='search',opener=document.activeElement){setMenu(false);commandOpener=opener;const context=contexts[1];context.input.value='';context.selected=id;renderResults(context);if(!dialog.open)dialog.showModal();document.body.classList.add('modal-open');if(id==='notes')setTimeout(()=>$('.note-editor',context.preview)?.focus(),20);else context.input.focus()}
 all('[data-launch]').forEach(b=>b.addEventListener('click',()=>openCommand('search',b)));
 all('[data-command]').forEach(b=>b.addEventListener('click',()=>openCommand(b.dataset.command,b)));
 $('[data-close-command]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');restoreFocus(commandOpener)});
 [dialog,teamDialog].forEach(d=>{let down=false;d.addEventListener('pointerdown',e=>{down=e.target===d});d.addEventListener('click',e=>{if(down&&e.target===d)d.close();down=false})});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){setMenu(false);menuToggle.focus()}if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'&&!teamDialog.open){event.preventDefault();if(dialog.open)dialog.close();else openCommand()}});
 const snippets={greeting:'안녕하세요. 준비된 자료와 현재 상황을 함께 살펴보고, 다음 작업을 정리해보겠습니다.',meeting:'다음 회의에서 작업의 방향과 우선순위를 함께 살펴보면 좋겠습니다. 가능한 시간을 알려주세요.',thanks:'자료를 공유해주셔서 감사합니다. 필요한 내용을 살펴보고 다음 작업을 정리하겠습니다.'};
 const snippetSelect=$('#snippet-select');function updateSnippet(){$('#snippet-text').textContent=snippets[snippetSelect.value];$('#snippet-status').textContent=''}snippetSelect.addEventListener('change',updateSnippet);updateSnippet();
 async function copyText(text){try{if(!navigator.clipboard?.writeText)throw new Error('unavailable');await navigator.clipboard.writeText(text);toast('예시 문장을 복사했습니다.');return true}catch{toast('이 브라우저에서는 문장을 직접 선택해 복사해 주세요.');return false}}
 $('#snippet-copy').addEventListener('click',async()=>{$('#snippet-status').textContent=await copyText(snippets[snippetSelect.value])?'예시 문장을 복사했습니다.':'문장을 직접 선택해 복사해 주세요.'});
 const categories={
  work:[{id:'search',title:'Quick Search',icon:'magnifying-glass',text:'파일과 작업을 빠르게 찾는, 하루의 시작점.',color:'#191c39',lines:['Project brief.md','Weekly planning','Recent workspace']},{id:'notes',title:'Quick Notes',icon:'note-pencil',text:'잠깐 떠오른 생각을 다음 작업의 단서로 남깁니다.',color:'#18313b',lines:['Keep one clear priority.','Leave room for ideas.','Take the next small step.']},{id:'focus',title:'Focus',icon:'timer',text:'화면의 여러 일을 잠시 내려놓고, 하나에 집중합니다.',color:'#153326',timer:true}],
  create:[{id:'brief',title:'Project Brief',icon:'file-text',text:'새 작업을 시작하기 전에, 전할 내용을 정리합니다.',color:'#34203b',lines:['Purpose','Direction','The first small step']},{id:'clipboard',title:'Everyday Words',icon:'clipboard-text',text:'자주 쓰는 문장과 표현을 가까이 두고 꺼내 씁니다.',color:'#203136',lines:['Project introduction','Meeting invitation','A little thank-you']},{id:'notes',title:'Idea Notes',icon:'sparkle',text:'다듬기 전의 아이디어도 가볍게 남길 수 있도록.',color:'#322719',lines:['A new point of view','Something to explore','One idea for tomorrow']}],
  develop:[{id:'files',title:'Recent Files',icon:'folder-open',text:'지금 필요한 자료를, 한 화면에서 다시 찾아봅니다.',color:'#172a37',lines:['README.md','Workspace ideas.txt','Project brief.md']},{id:'clipboard',title:'Snippets',icon:'code',text:'반복하는 문장은 짧게, 새로 생각하는 시간은 길게.',color:'#292038',lines:['greeting / intro','meeting / schedule','thanks / follow-up']},{id:'calendar',title:'Weekly Plan',icon:'calendar-blank',text:'큰 작업을 작은 순서로 나누고, 한 주를 정리합니다.',color:'#1c302a',lines:['Monday / Gather','Wednesday / Make','Friday / Review']}]
 };
 function renderCategory(name){$('#extension-grid').innerHTML=categories[name].map(c=>`<button class="extension-card" data-id="${c.id}" style="--card-color:${c.color}" aria-label="${c.title} 시연 열기"><span class="extension-card-header"><span class="command-icon">${icon(c.icon)}</span><h3>${c.title}</h3>${icon('caret-right')}</span><p>${c.text}</p><div class="card-preview"><div class="card-preview-title">FORMKEY / ${c.title.toUpperCase()}</div>${c.timer?'<div class="card-preview-timer">25:00</div><div style="text-align:center;margin-top:12px"><small>ONE TASK AT A TIME</small></div>':c.lines.map((line,i)=>`<div class="card-preview-line">${icon(i?'caret-right':'command')}<span>${line}</span></div>`).join('')}</div></button>`).join('')}
 renderCategory('work');all('[data-category]').forEach(b=>b.addEventListener('click',()=>{all('[data-category]').forEach(a=>a.setAttribute('aria-selected',String(a===b)));renderCategory(b.dataset.category);$('#extension-grid').setAttribute('aria-labelledby',b.id)}));
 $('#extension-grid').addEventListener('click',e=>{const b=e.target.closest('.extension-card');if(b)openCommand(b.dataset.id,b)});
 all('[data-demo]').forEach(b=>b.addEventListener('click',()=>{all('[data-demo]').forEach(a=>a.setAttribute('aria-selected',String(a===b)));$('#feature-preview').setAttribute('aria-labelledby',b.id);const c=contexts[0];c.input.value='';renderResults(c);select(c,b.dataset.demo);$('#demo-description').textContent={search:'파일과 작업을 검색하고, 목록에서 하나를 선택해 보세요.',notes:'짧은 메모를 작성하고 시연 공간에 남겨보세요.',focus:'타이머를 시작하거나 잠시 멈춰보세요.'}[b.dataset.demo]}));
 function openTeam(opener){setMenu(false);teamOpener=opener;$('#team-form').hidden=false;$('#team-complete').hidden=true;$('#team-form').reset();teamDialog.showModal();document.body.classList.add('modal-open')}
 all('[data-team]').forEach(b=>b.addEventListener('click',()=>openTeam(b)));all('[data-close-team]').forEach(b=>b.addEventListener('click',()=>teamDialog.close()));
 teamDialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');restoreFocus(teamOpener);$('#team-form').reset()});
 $('#team-form').addEventListener('submit',event=>{event.preventDefault();$('#team-form').hidden=true;$('#team-complete').hidden=false;$('#team-complete button').focus()});
 all('[role=tablist]').forEach(group=>{const tabs=all('[role=tab]',group);const sync=()=>tabs.forEach(t=>t.tabIndex=t.getAttribute('aria-selected')==='true'?0:-1);sync();group.addEventListener('click',sync);group.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const i=tabs.indexOf(document.activeElement);if(i<0)return;event.preventDefault();const n=event.key==='Home'?0:event.key==='End'?tabs.length-1:(i+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[n].click();tabs[n].focus()})});
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');let manualMotionOff=false;
 function updateMotion(){const off=manualMotionOff||reduce.matches;if(off)$('.hero').classList.add('entry-complete');document.body.classList.toggle('motion-off',off);document.documentElement.classList.toggle('motion-off',off);$('#motion-toggle').setAttribute('aria-pressed',String(off));$('#motion-toggle').innerHTML=icon(off?'play':'pause')+(off?'Motion paused':'Motion on');const heroToggle=$('[data-motion-toggle]');heroToggle.setAttribute('aria-pressed',String(off));heroToggle.setAttribute('aria-label',reduce.matches?'기기의 움직임 줄이기 설정 적용 중':off?'배경 모션 재생':'배경 모션 일시 정지');heroToggle.title=heroToggle.getAttribute('aria-label');heroToggle.innerHTML=icon(off?'play':'pause');heroToggle.disabled=reduce.matches}
 all('#motion-toggle,[data-motion-toggle]').forEach(button=>button.addEventListener('click',()=>{manualMotionOff=!manualMotionOff;updateMotion()}));reduce.addEventListener('change',updateMotion);updateMotion();
 const hero=$('.hero');$('.hero-button').addEventListener('animationend',()=>hero.classList.add('entry-complete'),{once:true});let heroVisible=true;const syncAmbient=()=>hero.classList.toggle('ambient-paused',!heroVisible||document.hidden);document.addEventListener('visibilitychange',syncAmbient);if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;syncAmbient()},{threshold:0}).observe(hero);syncAmbient();
 if('IntersectionObserver' in window){document.body.classList.add('enhanced');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});all('.reveal').forEach(el=>observer.observe(el))}
 let frame=0,px=0,py=0;$('.hero').addEventListener('pointermove',event=>{if(document.body.classList.contains('motion-off')||event.pointerType==='touch')return;const r=$('.hero').getBoundingClientRect();px=((event.clientX-r.left)/r.width-.5)*22;py=((event.clientY-r.top)/r.height-.5)*15;if(!frame)frame=requestAnimationFrame(()=>{$('.hero-visual').style.setProperty('--hero-x',px+'px');$('.hero-visual').style.setProperty('--hero-y',py+'px');frame=0})});$('.hero').addEventListener('pointerleave',()=>{$('.hero-visual').style.setProperty('--hero-x','0px');$('.hero-visual').style.setProperty('--hero-y','0px')});
 window.addEventListener('resize',()=>{if(innerWidth>900&&menuToggle.getAttribute('aria-expanded')==='true')setMenu(false)});
})();
