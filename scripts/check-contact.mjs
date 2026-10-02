import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const catalog = JSON.parse(read('work/catalog.json'));
for (const path of ['index.html', 'work/index.html', ...catalog.map(work => `work/${work.slug}/index.html`)]) {
  const html = read(path);
  const footer = html.match(/<nav class="footer-socials"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert(footer, `${path}: footer contact navigation exists`);
  assert.deepEqual([...footer.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]),
    ['footer-youtube-link', 'footer-facebook-link', 'footer-insta-link', 'footer-email-link'],
    `${path}: YouTube, Facebook, Instagram, email order`);
  const email = footer.match(/<a\b[^>]*id="footer-email-link"[\s\S]*?<\/a>/)?.[0];
  assert(email?.includes('href="mailto:contact@aurorasound.kr"'));
  assert(email?.includes('data-track="email"'));
  assert(/aria-label="[^"]*contact@aurorasound.kr/.test(email));
  assert(email?.includes('<svg') && !/[↗↘]/.test(email));
  assert.equal((html.match(/id="footer-email-link"/g) || []).length, 1);
  const links = html.match(/<a\b[^>]*id="floating-cta-btn"[^>]*>/g) || [];
  assert.equal(links.length, 1, `${path}: exactly one floating inquiry link`);
  assert(links[0].includes('href="https://open.kakao.com/o/sMBNyzpi"'));
  assert(links[0].includes('data-cta-location="floating"'));
  assert(links[0].includes('data-primary-cta="false"'));
  assert(links[0].includes('rel="noopener noreferrer"'));
  assert.equal((html.match(/src="\/rebrand\/contact\.js\?v=1"/g) || []).length, 1);
}
const source = read('rebrand/contact.js');
function browser({hero = true, primary = true, workPrimary = false, observers = true} = {}) {
  const handlers = {}, frames = [], mutations = [], intersections = [];
  const state = {heroBottom: 844, primaryTop: 2400, primaryBottom: 2464, modal: false};
  const link = {hidden: true, addEventListener: (name, callback) => {handlers['link:' + name] = callback;}};
  const heroNode = {getBoundingClientRect: () => ({bottom: state.heroBottom})};
  const primaryNode = {getBoundingClientRect: () => ({top: state.primaryTop, bottom: state.primaryBottom})};
  const document = {
    activeElement: null,
    getElementById: id => id === 'floating-cta-btn' ? link : id === 'final-cta-btn' && primary ? primaryNode : null,
    querySelector: selector => selector === '.work-cta-link' ? workPrimary ? primaryNode : null : selector === '.experience' ? hero ? heroNode : null : selector === '.header' ? {getBoundingClientRect: () => ({bottom: 96})} : selector === 'dialog[open]' ? state.modal ? {} : null : null,
    querySelectorAll: () => [{}],
  };
  const window = {document, innerHeight: 844, addEventListener: (name, callback) => {handlers[name] = callback;}, requestAnimationFrame: callback => {frames.push(callback);}};
  window.window = window;
  if (observers) {
    window.IntersectionObserver = class {constructor(callback) {intersections.push(callback);} observe() {}};
    window.MutationObserver = class {constructor(callback) {mutations.push(callback);} observe() {}};
  }
  vm.runInContext(source, vm.createContext(window));
  const flush = () => {while (frames.length) frames.shift()();};
  const event = name => {handlers[name]();flush();};
  return {link, state, document, event, flush, mutations, intersections};
}
let b = browser();
assert.equal(b.link.hidden, true, 'Hero controls retain their space');
b.state.heroBottom = 95; b.event('scroll');
assert.equal(b.link.hidden, false, 'Scrolling past hero exposes inquiry');
b.state.primaryTop = 600; b.event('scroll');
assert.equal(b.link.hidden, true, 'Visible main CTA suppresses its duplicate');
b.state.primaryTop = 900; b.event('scroll');
b.document.activeElement = b.link; b.state.primaryTop = 600; b.event('scroll');
assert.equal(b.link.hidden, false, 'Layout changes preserve focused inquiry');
b.document.activeElement = null; b.event('link:blur');
assert.equal(b.link.hidden, true, 'After blur main CTA replaces floating CTA');
b.state.primaryTop = 900; b.event('scroll');
b.state.modal = true; b.mutations[0](); b.flush();
assert.equal(b.link.hidden, true, 'Modal hides floating CTA');
b.state.modal = false; b.mutations[0](); b.flush();
assert.equal(b.link.hidden, false, 'Modal close restores inquiry');
b = browser({hero: false, primary: false});
assert.equal(b.link.hidden, false, 'Portfolio detail has inquiry without homepage hero');
b = browser({hero: false, primary: false, workPrimary: true});
assert.equal(b.link.hidden, false, 'Portfolio inquiry is available while browsing');
b.state.primaryTop = 600; b.event('scroll');
assert.equal(b.link.hidden, true, 'Visible portfolio footer CTA suppresses floating inquiry');
b.state.primaryBottom = 95; b.event('scroll');
assert.equal(b.link.hidden, false, 'Passing the portfolio footer CTA restores inquiry');
b = browser({observers: false}); b.state.heroBottom = 95; b.event('scroll');
assert.equal(b.link.hidden, false, 'Scroll fallback works without observer APIs');
b.state.primaryTop = 600; b.event('resize');
assert.equal(b.link.hidden, true, 'Resize refreshes visibility without observers');
console.log('Floating inquiry passed: 42 pages, hero/main CTA suppression, focus preservation, modal restore and observer fallback.');
