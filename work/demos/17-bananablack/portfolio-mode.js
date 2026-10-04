(function () {
  const root = new URL('.', document.currentScript.src);
  const photos = window.BANANABK_ARCHIVE_PHOTOS;
  const routes = window.BANANABK_ARCHIVE_ROUTES;
  const message = '포트폴리오 보관본입니다. 문의와 업로드는 전송되지 않습니다.';
  const images = slug => (photos.images[slug] || []).map(item => ({...item, resolved_url:new URL(item.archive_path,root).href}));
  window.BANANABK_ARCHIVE = {
    works(path) {
      const query = new URL(path, root).searchParams;
      if (query.get('mode') === 'hub') return {categories:photos.categories,firstImageBySlug:Object.fromEntries(photos.categories.map(c=>[c.slug,images(c.slug)[0]]))};
      const slug=query.get('slug');
      return {categories:photos.categories,category:photos.categories.find(c=>c.slug===slug),images:images(slug)};
    }
  };
  const originalFetch=window.fetch.bind(window);
  window.fetch=(input, options={})=>{
    const request=input instanceof Request ? input : null;
    const method=(options.method || request?.method || 'GET').toUpperCase();
    const url=new URL(request?.url || String(input),location.href);
    if(!['GET','HEAD'].includes(method)||url.origin!==location.origin)return Promise.reject(new Error('Portfolio archive does not send requests to operational services'));
    return originalFetch(input,options);
  };
  document.addEventListener('submit',event=>{event.preventDefault();event.stopImmediatePropagation();},true);
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href]');if(!a)return;
    if(/^(?:mailto:|tel:)|pf\.kakao\.com/.test(a.getAttribute('href'))){event.preventDefault();event.stopImmediatePropagation();window.alert(message);}
  },true);
  function fixLinks(scope=document) {
    scope.querySelectorAll('a[href^="/"]').forEach(a=>{
      const url=new URL(a.getAttribute('href'),location.origin);const target=routes[url.pathname]||routes[url.pathname.replace(/\/$/,'')];
      if(target)a.href=new URL(target+url.search+url.hash,root).href;
    });
  }
  document.addEventListener('DOMContentLoaded',()=>{
    fixLinks();new MutationObserver(()=>fixLinks()).observe(document.body,{childList:true,subtree:true});
    document.querySelectorAll('form').forEach(form=>{
      const note=document.createElement('p');note.textContent=message;note.setAttribute('role','status');form.prepend(note);
      form.querySelectorAll('input,textarea,select,button').forEach(el=>{el.disabled=true;});
    });
    const note=document.createElement('p');note.textContent=message;note.style.cssText='padding:16px 24px;margin:0;text-align:center;font:13px/1.7 sans-serif;background:#f4f2ec;color:#333';document.body.append(note);
  });
})();
