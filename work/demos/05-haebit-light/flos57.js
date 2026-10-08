(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const categories = {
    table: {title:'테이블 조명',label:'테이블',image:'table-v57.webp',description:'책상이나 작은 테이블 위에 놓는 빛. 앉은 자리에서 광원이 어떻게 보이는지, 손이 닿는 곳에 스위치가 있는지 살펴보세요.',items:['읽거나 작업하는 자리와 빛의 방향','테이블의 크기와 기구의 높이','콘센트와 스위치까지의 거리'],keywords:'테이블 책상 탁상 table desk'},
    pendant: {title:'펜던트 조명',label:'펜던트',image:'pendant-v57.webp',description:'식탁과 그 위의 조명을 함께 생각합니다. 테이블의 형태, 천장 높이와 기구가 내려오는 위치가 선택의 단서가 됩니다.',items:['식탁의 크기와 중심 위치','앉았을 때 보이는 광원','천장 구조와 배선 조건'],keywords:'펜던트 식탁 식당 dining pendant'},
    wall: {title:'벽 조명',label:'벽',image:'window-sconce.jpg',description:'벽에 닿는 빛은 표면과 주변의 분위기를 드러냅니다. 벽의 재료와 광원이 향하는 방향을 함께 확인해 보세요.',items:['벽의 재질과 조명의 위치','배선과 설치 방식','통로에서 기구가 돌출되는 정도'],keywords:'벽 벽등 wall sconce'},
    floor: {title:'플로어 조명',label:'플로어',image:'floor-lamp.jpg',description:'의자와 소파 옆에 놓는 조명. 읽는 자리로 빛을 가져오고, 저녁의 거실에 조금 낮은 빛을 더하는 방법을 살펴봅니다.',items:['의자와 조명 사이의 거리','선이 지나가는 자리와 통로','앉았을 때의 눈부심'],keywords:'플로어 플로워 거실 바닥 스탠드 floor living'},
    small: {title:'작은 조명',label:'소형',image:'bedside-lamp.jpg',description:'협탁과 선반 위에서 가까운 자리를 밝히는 빛. 공간을 채우는 큰 조명과 함께 쓰는 모습을 생각해 보세요.',items:['조명을 올려놓을 면적','주로 사용하는 시간','전원 방식과 조작 위치'],keywords:'소형 작은 이동 침실 협탁 portable small bedroom'},
    ceiling: {title:'천장에서 내려오는 빛',label:'천장',image:'quiet-pendant.jpg',description:'공간의 위쪽에서 내려오는 빛을 살펴봅니다. 기존 천장과 배선, 필요한 빛의 범위를 먼저 확인해 주세요.',items:['기존 천장과 배선 상태','기구의 높이와 주변 가구','제품의 설치 조건'],keywords:'천장 ceiling overhead'}
  };
  const photos = {
    wall:{title:'벽에 번지는 빛',image:'wall-v57-2.webp',description:'넓은 발광면과 어두운 벽의 대비를 보여주는 공간 연출입니다. 켜진 빛뿐 아니라 낮에 보이는 기구의 형태도 함께 살펴보세요.',items:['벽의 질감과 빛이 퍼지는 방향','기구가 차지하는 면적','벽 안의 배선과 설치 조건']},
    portable:{title:'가까이 놓는 작은 빛',image:'portable-v57.webp',description:'소파 옆의 작은 테이블을 중심으로 빛을 가까이 두는 장면입니다. 실제 실외 사용 가능 여부와 전원 방식은 각 제품의 사양으로 확인해야 합니다.',items:['조명을 두는 자리와 손이 닿는 위치','사용 시간과 전원 방식','실내외 사용 조건']},
    night:{title:'저녁의 읽는 자리',image:'night-v57.webp',description:'의자 옆의 낮은 빛으로 책을 읽고 쉬는 시간을 생각합니다. 광원을 직접 보는 위치와 책 위로 빛이 닿는 방향을 확인해 보세요.',items:['앉은 위치의 눈부심','책과 손에 드리우는 그림자','통로와 전원선의 위치']},
    making:{title:'빛을 담는 형태',image:'making-v57.webp',description:'유리의 질감과 기구의 형태를 살펴보는 연출 장면입니다. 재료의 표면, 빛이 통과하는 방식과 관리 방법이 조명을 고르는 단서가 됩니다.',items:['켜지기 전 기구의 모습','유리와 금속의 표면','교체와 관리 방법']},
    dining:{title:'식탁의 빛',image:'dining-light-v20.webp',description:'테이블 위로 내려오는 빛과 식사하는 자리를 함께 살펴봅니다. 사진은 배치 예시이며 실제 밝기나 설치 결과를 보증하지 않습니다.',items:['식탁과 기구의 크기','천장 높이와 배선','앉은 위치에서의 눈부심']},
    bedroom:{title:'침실의 빛',image:'bedroom-light-v20.webp',description:'잠들기 전 책을 읽거나 쉬는 자리. 손이 닿는 스위치와 눈에 직접 들어오지 않는 빛을 생각해 보세요.',items:['침대와 협탁의 위치','손이 닿는 스위치','전원과 조명의 높이']},
    living:{title:'거실의 빛',image:'living-light-v20.webp',description:'의자 옆에 놓인 조명으로 읽는 자리를 정하는 예시입니다. 창으로 들어오는 낮의 빛과 저녁의 빛을 비교해 보세요.',items:['주로 앉는 자리','낮과 저녁의 자연광','조명과 콘센트 사이의 거리']}
  };
  const guides = {
    consult:{title:'상담 전에 준비해 주세요.',description:'조명을 놓을 공간의 사진과 주로 사용하는 시간을 정리하면, 필요한 빛과 설치 조건을 이야기하기 쉬워집니다.',items:['낮과 저녁의 공간 사진','주로 하는 활동과 사용하는 시간','어두움이나 눈부심 등 현재의 불편','천장, 벽과 콘센트의 위치']},
    visit:{title:'어떤 공간의 빛인가요?',description:'식탁, 침실과 거실에서 조명을 두는 자리를 먼저 생각해 보세요. 실제 매장의 위치나 방문 예약을 안내하는 페이지는 아닙니다.',items:['공간의 크기와 가구 배치','조명을 놓을 자리','낮과 저녁에 달라지는 빛']},
    saved:{title:'형태 다음에 확인할 것.',description:'기구가 마음에 들었다면 실제로 사용할 자리를 생각합니다. 밝기와 배광, 설치 조건은 사진만으로 판단하기 어렵습니다.',items:['제품 사양과 빛의 방향','눈부심과 그림자','전원과 조작 방식','설치와 관리 조건']}
  };
  let opener = null;
  let active = null;
  function closeDialog() { if(active) active.close(); }
  function showDialog(dialog,trigger) {
    if(active && active.open) active.close();
    opener=trigger || document.activeElement; active=dialog;
    document.body.classList.add('modal-open'); dialog.showModal();
    dialog.scrollTop=0;
  }
  $$('dialog').forEach(dialog=>{
    dialog.addEventListener('close',()=>{
      if(dialog.open || active!==dialog) return;
      document.body.classList.remove('modal-open');
      $$('[data-nav]').forEach(button=>button.setAttribute('aria-expanded','false'));
      if(opener && document.contains(opener)) opener.focus({preventScroll:true});
      if(active===dialog) active=null;
    });
    dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  });
  function openDetail(data,trigger,isGuide=false) {
    $('#detail-title').textContent=data.title;
    $('#detail-description').textContent=data.description;
    $('#detail-list').replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    $('#detail-dialog').classList.toggle('no-image',!data.image);
    if(data.image){$('#detail-image').src='assets/'+data.image;$('#detail-image').alt=data.title+' 연출 및 참고 예시';}
    $('#detail-consult').hidden=isGuide;
    showDialog($('#detail-dialog'),trigger);
  }
  $('#detail-consult').addEventListener('click',()=>{
    const originalOpener=opener;
    openDetail(guides.consult,originalOpener,true);
  });
  function typeNavButton(key){const b=document.createElement('button');b.dataset.category=key;b.textContent=categories[key].label;const img=document.createElement('img');img.src='assets/'+categories[key].image;img.alt='';img.width=64;img.height=64;b.append(img);return b;}
  function navLink(text,target){const a=document.createElement('a');a.textContent=text;a.href=target;return a;}
  function renderNav(kind){
    const container=$('.nav-content');container.replaceChildren();
    $('.nav-back').hidden=kind==='main';
    $('#nav-title').textContent=kind==='types'?'조명 종류':kind==='rooms'?'공간별 조명':'메뉴';
    if(kind==='types'){container.append(...Object.keys(categories).map(typeNavButton));}
    else if(kind==='rooms'){for(const key of ['dining','bedroom','living']){const b=document.createElement('button');b.dataset.photo=key;b.textContent=photos[key].title;const img=document.createElement('img');img.src='assets/'+photos[key].image;img.alt='';b.append(img);container.append(b);}}
    else {for(const [text,kind2] of [['조명 종류','types'],['공간별 조명','rooms']]){const b=document.createElement('button');b.dataset.subnav=kind2;b.textContent=text;const img=document.createElement('img');img.src='assets/ui57/chevron-right.svg';img.alt='';img.style.width='22px';img.style.height='22px';b.append(img);container.append(b);}container.append(navLink('벽의 빛','#wall'),navLink('작은 빛','#portable'),navLink('저녁의 빛','#night'),navLink('빛의 형태','#making'),navLink('상담 안내','#consult'));}
  }
  $$('[data-nav]').forEach(button=>button.addEventListener('click',()=>{renderNav(button.dataset.nav);showDialog($('#nav-dialog'),button);button.setAttribute('aria-expanded','true');}));
  $('.nav-back').addEventListener('click',()=>renderNav('main'));
  $('.nav-content').addEventListener('click',event=>{
    const sub=event.target.closest('[data-subnav]');if(sub){renderNav(sub.dataset.subnav);return;}
    const link=event.target.closest('a');if(link)closeDialog();
  });
  document.addEventListener('click',event=>{
    const button=event.target.closest('[data-category],[data-photo],[data-guide]');if(!button)return;
    const trigger=active=== $('#nav-dialog') || active=== $('#search-dialog') ? opener : button;
    if(button.dataset.category)openDetail(categories[button.dataset.category],trigger);
    else if(button.dataset.photo)openDetail(photos[button.dataset.photo],trigger);
    else openDetail(guides[button.dataset.guide],trigger,true);
  });
  function search(){
    const query=$('#search-input').value.trim().toLowerCase();
    const results=$('#search-results');results.replaceChildren();
    const keys=Object.keys(categories).filter(key=>!query||(categories[key].keywords+' '+categories[key].title).includes(query));
    if(!keys.length){const p=document.createElement('p');p.textContent='찾는 조명이 없어요. 테이블, 펜던트, 벽, 거실이나 침실로 검색해 보세요.';results.append(p);return;}
    results.append(...keys.map(key=>{const b=document.createElement('button');b.dataset.category=key;b.textContent=categories[key].title;return b;}));
  }
  $('[data-search]').addEventListener('click',event=>{showDialog($('#search-dialog'),event.currentTarget);$('#search-input').value='';search();$('#search-input').focus();});
  $('#search-input').addEventListener('input',search);
  $('#search-form').addEventListener('submit',event=>{event.preventDefault();search();});
  const track=$('.category-track');const cards=$$('.category-card');const carousel=$('.carousel');let position=0;
  const narrow=matchMedia('(max-width:700px)');
  function updateCarousel(){const visible=narrow.matches?1:3;position=Math.max(0,Math.min(position,cards.length-visible));track.style.transform=`translateX(-${position*(cards[0].getBoundingClientRect().width+16)}px)`;cards.forEach((card,index)=>{const hidden=index<position||index>=position+visible;card.inert=hidden;card.setAttribute('aria-hidden',String(hidden));});$('#category-prev').disabled=position===0;$('#category-next').disabled=position===cards.length-visible;$('#category-count').textContent=visible===1?`${position+1} / ${cards.length}`:`${position+1} – ${position+visible} / ${cards.length}`;}
  function move(amount){position+=amount;updateCarousel();}
  $('#category-prev').addEventListener('click',()=>move(narrow.matches?-1:-3));$('#category-next').addEventListener('click',()=>move(narrow.matches?1:3));
  carousel.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
  let touchStart=null;
  carousel.addEventListener('touchstart',event=>{touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
  carousel.addEventListener('touchend',event=>{if(!touchStart)return;const dx=event.changedTouches[0].clientX-touchStart.x;const dy=event.changedTouches[0].clientY-touchStart.y;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touchStart=null;},{passive:true});
  new ResizeObserver(updateCarousel).observe(carousel);narrow.addEventListener('change',updateCarousel);updateCarousel();
  function updateFooter(){
    $$('.footer-column').forEach(column=>{
      if((column.tagName==='DETAILS')===narrow.matches) return;
      const focused=document.activeElement;
      const keepFocus=column.contains(focused) && focused!==column.firstElementChild;
      const next=document.createElement(narrow.matches?'details':'section');
      next.className='footer-column';
      const title=document.createElement(narrow.matches?'summary':'h2');
      title.className='footer-title';
      title.textContent=column.firstElementChild.textContent;
      if(narrow.matches && keepFocus) next.open=true;
      next.append(title,column.querySelector('.footer-links'));
      column.replaceWith(next);
      if(keepFocus) focused.focus({preventScroll:true});
    });
  }
  narrow.addEventListener('change',updateFooter);updateFooter();
})();
