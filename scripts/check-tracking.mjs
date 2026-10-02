import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const analytics = readFileSync(new URL('../analytics.js', import.meta.url), 'utf8');
const bootScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
const links = [...html.matchAll(/<a\b[^>]*data-track=[^>]*>/g)].map(match => {
  const attributes = Object.fromEntries([...match[0].matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
  return { id: attributes.id, getAttribute: name => attributes[name] || null };
});
assert.equal(links.length, 3, 'All three outbound links must be tracked.');
const cta = links.find(link => link.id === 'final-cta-btn');

for (const [hostname, pathname, expectedType] of [
  ['localhost', '/', 'organic_root'],
  ['100.111.129.29', '/interview', 'paid_interview'],
  ['aurora-landing-page-preview.vercel.app', '/interview', 'paid_interview'],
  ['www.aurorasound.kr', '/', 'organic_root'],
  ['www.aurorasound.kr', '/interview', 'paid_interview'],
  ['aurorasound.kr', '/interview/', 'paid_interview'],
]) {
  const handlers = {}, loadedScripts = [], classes = new Set();
  const document = {
    visibilityState: 'visible',
    documentElement: { classList: { add: name => classes.add(name) } },
    createElement: () => ({}),
    head: { appendChild: element => loadedScripts.push(element.src) },
    getElementsByTagName: () => [{ parentNode: { insertBefore: element => loadedScripts.push(element.src) } }],
    addEventListener: (name, callback) => { handlers[name] = callback; },
    removeEventListener: () => {},
  };
  const window = {
    location: { hostname, pathname, search: '?utm_source=release-check&utm_campaign=rebrand' },
    sessionStorage: { getItem: () => null, setItem: () => {} },
    setTimeout: () => 1, clearTimeout: () => {},
  };
  window.window = window; window.document = document; window.URLSearchParams = URLSearchParams;
  const context = vm.createContext(window);
  for (const script of bootScripts) vm.runInContext(script, context);
  vm.runInContext(analytics, context);
  assert.equal(classes.has('ad-mode'), expectedType === 'paid_interview');
  handlers.click({ target: { closest: () => cta } });
  const production = ['www.aurorasound.kr', 'aurorasound.kr'].includes(hostname);
  if (!production) {
    assert.equal(window.gtag, undefined); assert.equal(window.fbq, undefined);
    assert.equal(loadedScripts.length, 0, 'Preview must not load tracking providers.');
    continue;
  }
  const events = window.dataLayer.filter(event => event[0] === 'event');
  assert.deepEqual(Array.from(events, event => event[1]), ['click_cta_primary', 'click_kakao_openchat']);
  for (const event of events) {
    assert.equal(event[2].landing_type, expectedType);
    assert.equal(event[2].landing_path, pathname);
    assert.equal(event[2].button_id, 'final-cta-btn');
    assert.equal(event[2].utm_source, 'release-check');
    assert.equal(event[2].cta_location, 'final');
  }
  if (expectedType === 'paid_interview') {
    const meta = window.fbq.queue;
    assert.equal(meta.filter(event => event[1] === 'PageView').length, 1);
    const contact = meta.filter(event => event[1] === 'Contact');
    assert.equal(contact.length, 1);
    assert.equal(contact[0][2].contact_stage, 'outbound_click');
    assert.equal(meta.some(event => event[1] === 'Lead'), false);
  } else assert.equal(window.fbq, undefined, 'Organic root must not initialize Meta.');
}
console.log('Tracking integration passed: local/Tailscale/preview isolation, organic/paid events, preserved CTA and UTM context.');
