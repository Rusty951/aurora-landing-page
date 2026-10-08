(() => {
  'use strict';
  const $ = (s, scope = document) => scope.querySelector(s);
  const $$ = (s, scope = document) => [...scope.querySelectorAll(s)];
  const menu = $('#mobile-menu');
  const menuButton = $('.menu-button');
  const form = $('#consult-form');
  const formHome = $('#form-home');
  const contactDialog = $('#contact-dialog');
  const menuBackground = $$('main, footer, .page-rail, .floating-contact, .skip');
  let returnFocus = null;
  const guides = {
    contract: { title: '거래와 계약', description: '계약서의 내용과 실제로 진행된 일을 함께 정리해보세요. 대금이나 손해에 관한 질문도 거래 과정의 기록에서 시작할 수 있습니다.', list: ['계약서와 이후에 변경한 문서', '거래가 진행된 날짜와 주고받은 내용', '지급하거나 받지 못한 대금에 관한 기록', '상담에서 확인하고 싶은 질문'] },
    property: { title: '부동산과 임대차', description: '계약의 시작부터 현재까지 중요한 날짜를 적어보세요. 계약서와 연락 내용을 곁에 두고 질문을 정리하면 상담 준비에 도움이 됩니다.', list: ['매매 또는 임대차 계약서', '보증금과 대금의 지급 기록', '계약 변경이나 종료에 관해 주고받은 문서', '현재 상황과 확인하고 싶은 질문'] },
    family: { title: '가족과 상속', description: '설명하고 싶은 가족 관계와 재산에 관한 내용을 나눠 적어보세요. 첫 상담에서는 무엇부터 확인할지 질문을 정리하는 데서 시작할 수 있습니다.', list: ['상담과 관련된 가족 관계의 간단한 정리', '알고 있는 재산과 관련 문서의 목록', '이미 진행된 일과 중요한 날짜', '상담에서 먼저 물어보고 싶은 질문'] },
    payment: { title: '대금과 손해배상', description: '거래 내용, 지급 기록, 문제를 알게 된 시점을 나눠 정리해보세요. 무엇이 자료로 남아 있는지 함께 확인할 수 있도록 목록을 만들어보세요.', list: ['계약과 거래 조건이 적힌 문서', '대금의 지급 또는 청구 기록', '관련 연락과 문서의 날짜', '손해에 관해 확인할 질문'] },
    documents: { title: '자료를 준비하는 방법', description: '가지고 있는 자료의 종류부터 간단히 적어보세요. 이 시연에서는 파일을 첨부하지 않습니다.', list: ['원본과 사본을 구분해 보관하기', '자료마다 날짜와 간단한 설명 적기', '연락과 문서를 시간순으로 묶기', '부족하거나 확인이 필요한 자료 표시하기'] },
    record: { title: '일어난 일을 정리합니다.', description: '설명을 길게 쓰기보다 주요 날짜와 사건을 적어보세요. 기억에 의존한 내용과 자료로 확인할 수 있는 내용을 구분해두면 질문을 만들기 쉽습니다.', list: ['어떤 일이 있었는지 한두 문장으로 적기', '중요한 날짜를 시간순으로 정리하기', '관련 당사자와 주고받은 내용 적기', '첫 상담에서 확인하고 싶은 내용 표시하기'] },
    scope: { title: '다음에 살펴볼 범위를 정합니다.', description: '첫 상담에서 어떤 자료를 더 확인할지, 어떤 질문을 먼저 다룰지 정리하는 흐름을 보여주는 예시입니다.', list: ['설명과 자료 사이에 확인이 필요한 부분', '추가로 정리할 문서와 기록', '먼저 확인하고 싶은 질문의 순서', '이후 상담에서 논의할 범위'] }
  };
  const caution = '일반적인 상담 준비 예시입니다. 사건의 법률 판단이나 필수 서류 목록을 뜻하지 않습니다.';
  function setMenu(open) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    $('.menu-button img').src = open ? 'assets/ui58/x.svg' : 'assets/ui58/menu.svg';
    document.body.classList.toggle('menu-open', open);
    menuBackground.forEach(element => { element.inert = open; });
    if (open) $('a', menu).focus();
  }
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  $('.header .wordmark').addEventListener('click', () => setMenu(false));
  $$('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false)));
  const desktop = matchMedia('(min-width:768px)');
  desktop.addEventListener('change', e => { if (e.matches) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus(); }
    if (e.key === 'Tab' && !menu.hidden) {
      const links = $$('a', menu), last = links.at(-1);
      if (e.shiftKey && document.activeElement === menuButton) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); menuButton.focus(); }
      else if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); menuButton.focus(); }
    }
  });
  const dialogs = $$('dialog');
  function restoreForm() { if (form.parentElement !== formHome) formHome.append(form); }
  function openDialog(dialog, focusTarget) {
    if (!menu.hidden) setMenu(false);
    if (!dialogs.some(d => d.open)) returnFocus = document.activeElement;
    dialogs.forEach(d => { if (d.open) d.close(); });
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
    if (focusTarget) focusTarget.focus();
  }
  dialogs.forEach(dialog => {
    $$('[data-close]', dialog).forEach(button => button.addEventListener('click', () => dialog.close()));
    dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
    dialog.addEventListener('close', () => {
      if (dialog === contactDialog) restoreForm();
      if (!dialogs.some(d => d.open)) {
        document.body.classList.remove('dialog-open');
        if (returnFocus?.isConnected) returnFocus.focus({preventScroll:true});
      }
    });
  });
  function openGuide(key, listOnly = false) {
    const guide = guides[key];
    $('#guide-title').textContent = (listOnly ? '준비 목록 / ' : '') + guide.title;
    const content = $('#guide-content');
    content.replaceChildren();
    const p = document.createElement('p'); p.textContent = guide.description; content.append(p);
    const ul = document.createElement('ul');
    guide.list.forEach(text => { const li = document.createElement('li'); li.textContent = text; ul.append(li); });
    const note = document.createElement('p'); note.className = 'guide-note'; note.textContent = caution;
    content.append(ul, note);
    openDialog($('#guide-dialog'));
  }
  $$('[data-guide]').forEach(button => button.addEventListener('click', e => { e.preventDefault(); openGuide(button.dataset.guide); }));
  $$('[data-list]').forEach(button => button.addEventListener('click', () => openGuide(button.dataset.list, true)));
  function openContact() {
    openDialog(contactDialog);
    $('#dialog-form-home').append(form);
    contactDialog.scrollTop = 0;
    $('[name=name]', form).focus({preventScroll:true});
  }
  $$('[data-contact]').forEach(button => button.addEventListener('click', openContact));
  $('#guide-contact').addEventListener('click', openContact);
  const processes = [
    {title:'먼저, 일어난 일을 정리합니다.',body:'처음부터 완벽한 설명을 준비할 필요는 없습니다. 중요한 날짜와 당사자, 주고받은 내용을 간단히 적어보세요. 기억나는 내용과 자료로 확인할 수 있는 내용을 나누면 질문도 선명해집니다.',key:'record'},
    {title:'남아 있는 자료를 살펴봅니다.',body:'계약서와 연락 내용, 지급 기록처럼 이미 가지고 있는 자료부터 목록을 만들어보세요. 자료가 모두 갖춰져 있지 않더라도 무엇이 있고 무엇을 확인해야 하는지 구분할 수 있습니다.',key:'documents'},
    {title:'다음에 살펴볼 범위를 정합니다.',body:'지금 가장 궁금한 질문과 앞으로 확인할 내용을 나눠봅니다. 첫 상담에서 이야기할 순서를 정리하고, 추가로 살펴볼 자료를 준비하는 흐름을 보여드립니다.',key:'scope'}
  ];
  let processIndex = 0;
  $$('[data-process]').forEach(button => button.addEventListener('click', () => {
    processIndex = (processIndex + Number(button.dataset.process) + processes.length) % processes.length;
    $('#process-label').textContent = `첫 상담 / 0${processIndex + 1}`;
    $('#process-title').textContent = processes[processIndex].title;
    $('#process-body').textContent = processes[processIndex].body;
    $('#process-count').textContent = `0${processIndex + 1} / 03`;
  }));
  $('#process-detail').addEventListener('click', () => openGuide(processes[processIndex].key));
  let resourceIndex = 0;
  const resourceCards = $$('.resource-card');
  function renderResources() {
    const distance = resourceCards[0].getBoundingClientRect().width + parseFloat(getComputedStyle($('.resource-track')).gap);
    $('.resource-track').style.transform = `translateX(${-resourceIndex * distance}px)`;
    resourceCards.forEach((card, i) => { card.classList.toggle('is-current', i === resourceIndex); card.inert = i !== resourceIndex; card.setAttribute('aria-hidden', String(i !== resourceIndex)); });
    $('#resource-count').textContent = `0${resourceIndex + 1} / 03`;
  }
  $$('[data-resource]').forEach(button => button.addEventListener('click', () => { resourceIndex = (resourceIndex + Number(button.dataset.resource) + resourceCards.length) % resourceCards.length; renderResources(); }));
  new ResizeObserver(renderResources).observe($('.resource-window'));
  renderResources();
  const searchTerms = {
    contract: '계약 거래 사업 문서 계약서 검토 계약 검토 계약 해지 상담 준비',
    property: '부동산 임대 임대차 보증금 반환 전세 월세 매매 주택 상가 계약 종료 해지 상담 준비',
    family: '가족 상속 재산 상속 재산 상담 준비',
    payment: '대금 손해 손해배상 지급 돈 미수금 거래 대금 상담 준비',
    documents: '자료 준비 문서 기록 서류 상담 준비'
  };
  const normalizeSearch = value => value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').trim();
  $('.search-form').addEventListener('submit', e => {
    e.preventDefault();
    const rawQuery = $('#keyword').value.trim();
    const query = normalizeSearch(rawQuery);
    const tokens = query.split(/\s+/).filter(Boolean);
    const keys = rawQuery ? Object.keys(searchTerms).filter(key => {
      const terms = normalizeSearch(guides[key].title + ' ' + searchTerms[key]);
      return tokens.length > 0 && (tokens.every(token => terms.includes(token)) || terms.replace(/\s+/g, '').includes(query.replace(/\s+/g, '')));
    }) : ['contract','property','family','payment'];
    $('#search-description').textContent = rawQuery ? `“${rawQuery}” 검색 결과 ${keys.length}개` : '상담할 업무를 선택해보세요.';
    const results = $('#search-results');
    results.replaceChildren();
    if (!keys.length) {
      const p = document.createElement('p');
      p.textContent = '일치하는 자료가 없습니다. 아래 업무에서 골라보세요.';
      results.append(p);
    }
    const displayedKeys = keys.length ? keys : ['contract','property','family','payment'];
    displayedKeys.forEach(key => {
      const button = document.createElement('button');
      button.className = 'search-result';
      button.textContent = guides[key].title;
      button.addEventListener('click', () => openGuide(key));
      results.append(button);
    });
    openDialog($('#search-dialog'));
  });
  const fields = $$('input, select, textarea', form);
  const fieldNames = {name:'성함',phone:'연락처',email:'이메일',organization:'소속',topic:'상담 분야',method:'상담 방식',message:'문의 내용'};
  const validationSummary = $('#form-validation');
  function fieldError(field) {
    if (field.required && !field.value.trim()) {
      if (field.name === 'topic') return '상담 분야를 선택해주세요.';
      return `${fieldNames[field.name]}${field.name === 'message' ? '을' : field.name === 'name' ? '을' : '를'} 입력해주세요.`;
    }
    if (field.validity.typeMismatch && field.type === 'email') return '이메일 형식을 확인해주세요.';
    return field.validity.valid ? '' : '입력 내용을 확인해주세요.';
  }
  function showFieldError(field, message) {
    const error = $(`#error-${field.name}`);
    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
  }
  function resetValidation() {
    fields.forEach(field => showFieldError(field, ''));
    validationSummary.hidden = true;
    validationSummary.textContent = '';
  }
  fields.forEach(field => {
    field.setAttribute('aria-describedby', `error-${field.name}`);
    const clearCorrectedError = () => {
      if (field.hasAttribute('aria-invalid')) showFieldError(field, fieldError(field));
      const remaining = fields.filter(item => item.hasAttribute('aria-invalid')).length;
      validationSummary.hidden = remaining === 0;
      validationSummary.textContent = remaining ? `입력 항목 ${remaining}개를 확인해주세요.` : '';
    };
    field.addEventListener('input', clearCorrectedError);
    field.addEventListener('change', clearCorrectedError);
  });
  function revealInvalidField(field) {
    const label = field.closest('label');
    field.focus({preventScroll:true});
    if (contactDialog.open) {
      const headerHeight = $('.dialog-head', contactDialog).getBoundingClientRect().height;
      contactDialog.scrollTop += label.getBoundingClientRect().top - contactDialog.getBoundingClientRect().top - headerHeight - 24;
    } else {
      const top = scrollY + label.getBoundingClientRect().top - $('.header').getBoundingClientRect().height - 24;
      window.scrollTo({top:Math.max(0, top),behavior:'instant'});
    }
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const invalidFields = fields.filter(field => {
      const message = fieldError(field);
      showFieldError(field, message);
      return Boolean(message);
    });
    if (invalidFields.length) {
      validationSummary.hidden = false;
      validationSummary.textContent = `입력 항목 ${invalidFields.length}개를 확인해주세요.`;
      requestAnimationFrame(() => revealInvalidField(invalidFields[0]));
      return;
    }
    validationSummary.hidden = true;
    const data = new FormData(form);
    const labels = {name:'성함',phone:'연락처',email:'이메일',organization:'소속',topic:'상담 분야',method:'상담 방식',message:'문의 내용'};
    $('#confirm-content').replaceChildren();
    Object.entries(labels).forEach(([key,label]) => { const dt = document.createElement('dt'), dd = document.createElement('dd'); dt.textContent = label; dd.textContent = data.get(key) || '입력하지 않음'; $('#confirm-content').append(dt,dd); });
    openDialog($('#confirm-dialog'));
  });
  form.noValidate = true;
  form.addEventListener('reset', resetValidation);
  $('#clear-form').addEventListener('click', () => { form.reset(); $('#confirm-content').replaceChildren(); $('#confirm-dialog').close(); });
  const rail = $$('.page-rail a');
  const sections = rail.map(link => $(link.getAttribute('href')));
  function updateRail() {
    const threshold = innerHeight * .4;
    let index = 0;
    sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= threshold) index = i; });
    const resourcesRect = $('#resources').getBoundingClientRect();
    $('.floating-contact').hidden = index === 4 || (resourcesRect.top < innerHeight && resourcesRect.bottom > 0);
    $('.page-rail').hidden = $('footer').getBoundingClientRect().top < innerHeight * .65;
    rail.forEach((link, i) => { link.classList.toggle('active', i === index); if (i === index) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
  }
  addEventListener('scroll', updateRail, {passive:true});
  addEventListener('resize', updateRail);
  updateRail();
})();
