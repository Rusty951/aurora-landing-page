/*
 * 오로라의소리 — analytics.js v7
 * 운영 환경 GA4 페이지뷰 · 참여 · 외부 링크 클릭 추적
 */

var GA_MEASUREMENT_ID = 'G-YQJ3DC2SQN';
var PRODUCTION_TRACKING_HOSTS = ['www.aurorasound.kr', 'aurorasound.kr'];

function isProductionTrackingHost() {
  return PRODUCTION_TRACKING_HOSTS.indexOf(window.location.hostname) !== -1;
}

(function initGA() {
  if (!isProductionTrackingHost()) return;
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  document.head.appendChild(script);
})();

function getLandingContext() {
  var path = window.location.pathname;
  var landingType = 'other';

  if (path === '/' || path === '/index.html') {
    landingType = 'organic_root';
  } else if (path === '/interview' || path === '/interview/') {
    landingType = 'paid_interview';
  }

  return {
    landing_type: landingType,
    landing_path: path
  };
}

function getUtmParams() {
  var search = new URLSearchParams(window.location.search);
  return {
    utm_source: search.get('utm_source') || '',
    utm_medium: search.get('utm_medium') || '',
    utm_campaign: search.get('utm_campaign') || '',
    utm_content: search.get('utm_content') || '',
    utm_term: search.get('utm_term') || ''
  };
}

function trackingParams(params) {
  return Object.assign({}, getLandingContext(), getUtmParams(), params || {});
}

function gaTrack(eventName, params) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, trackingParams(params));
}

function metaTrackContactClick(params) {
  if (!isProductionTrackingHost()) return;
  if (getLandingContext().landing_type !== 'paid_interview') return;
  if (typeof window.fbq !== 'function') return;

  window.fbq('track', 'Contact', trackingParams(Object.assign({
    contact_method: 'kakao_openchat',
    contact_stage: 'outbound_click'
  }, params || {})));
}

/* 보이는 탭에서 누적 10초를 넘긴 세션만 한 번 기록한다. */
(function trackTenSecondEngagement() {
  if (!isProductionTrackingHost()) return;

  var context = getLandingContext();
  var storageKey = 'aurora_engaged_10s:' + context.landing_path;
  var activeMs = 0;
  var visibleSince = document.visibilityState === 'visible' ? Date.now() : null;
  var timer = null;
  var sent = false;

  try {
    if (window.sessionStorage.getItem(storageKey) === '1') return;
  } catch (error) {
    /* 저장소를 사용할 수 없어도 측정은 계속한다. */
  }

  function cleanup() {
    if (timer) window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  }

  function sendEvent() {
    if (sent) return;
    sent = true;

    try {
      window.sessionStorage.setItem(storageKey, '1');
    } catch (error) {
      /* 저장 실패는 이벤트 전송을 막지 않는다. */
    }

    gaTrack('engaged_10s', { engagement_seconds: 10 });
    cleanup();
  }

  function schedule() {
    if (sent || visibleSince === null) return;
    if (timer) window.clearTimeout(timer);

    timer = window.setTimeout(function () {
      activeMs += Date.now() - visibleSince;
      visibleSince = Date.now();

      if (activeMs >= 10000) sendEvent();
      else schedule();
    }, Math.max(0, 10000 - activeMs));
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      if (visibleSince !== null) activeMs += Date.now() - visibleSince;
      visibleSince = null;
      if (timer) window.clearTimeout(timer);
      timer = null;
      return;
    }

    visibleSince = Date.now();
    if (activeMs >= 10000) sendEvent();
    else schedule();
  }

  document.addEventListener('visibilitychange', onVisibilityChange);
  schedule();
})();

/* HTML의 data-track 값을 단일 계약으로 사용한다. */
(function bindTrackedLinks() {
  var eventNames = {
    naver_blog: 'click_blog',
    wordpress_blog: 'click_wordpress_blog',
    instagram: 'click_instagram',
    youtube: 'click_youtube',
    email: 'click_email'
  };

  document.addEventListener('click', function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest('[data-track]') : null;
    if (!link) return;

    var trackType = link.getAttribute('data-track');
    var params = {
      button_id: link.id || '',
      cta_location: link.getAttribute('data-cta-location') || '',
      is_primary_cta: link.getAttribute('data-primary-cta') === 'true'
    };

    if (trackType === 'kakao') {
      if (params.is_primary_cta) gaTrack('click_cta_primary', params);
      gaTrack('click_kakao_openchat', params);
      metaTrackContactClick(params);
      return;
    }

    if (eventNames[trackType]) gaTrack(eventNames[trackType], params);
  });
})();
