import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const html = read("index.html");
const app = read("rebrand/app.js");
assert.match(html, /name="robots" content="index, follow"/);
assert.match(read("rebrand/style.css"), /prefers-reduced-motion/);
assert.match(app, /visibilitychange/);
assert.match(app, /import\("\.\/silk\.js\?v=3"\)/);
assert(!/sculptureMode|field\.js|AuroraScene/.test(app), "Only the approved silk renderer remains");
assert.match(read("rebrand/silk.js"), /webglcontextlost/);
for (const previous of ["style.css", "script.js", "rebrand/index.html", "rebrand/field.js", "scripts/vendor-three.mjs", "rebrand/vendor/three.js", "rebrand/assets/sculpture-desktop.webp", "rebrand/assets/sculpture-mobile.webp"])
  assert(!existsSync(resolve(root, previous)), `Previous comparison or renderer removed: ${previous}`);
assert(statSync(resolve(root, "rebrand/assets/resonance.webp")).size < 300000, "Hero compressed under 300 KB");
assert(!/<audio[^>]*autoplay/.test(html), "Audio uses the policy-aware Web Audio controller");
assert.match(app, /soundWanted = !posterMode && readSoundPreference\(\)/);
assert.match(app, /if \(soundWanted && !document.hidden\) void startSound\(true\)/);
assert.match(app, /audio\.js\?v=4/);
console.log("First-release checks passed: approved silk renderer, static fallback, quiet default music and previous UI removal.");

// Exercise the production playback controller with hero and footer controls.
// DOM geometry and keyboard navigation are checked in the browser QA pass.
const { runInNewContext } = await import("node:vm");
const playbackApp = read("rebrand/app.js");
const playbackStart = playbackApp.indexOf("function motionState()");
const playbackEnd = playbackApp.indexOf('window.addEventListener(\n  "pointermove",', playbackStart);
assert(playbackStart >= 0 && playbackEnd > playbackStart, "Playback controller is available for integration checks");
const playbackSource = playbackApp.slice(playbackStart, playbackEnd);
function playbackButton() {
  const label = { textContent: "" };
  return {
    disabled: false,
    textContent: "",
    attributes: {},
    listeners: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    querySelector(selector) { assert.equal(selector, ".sound-label"); return label; },
    addEventListener(name, listener) { this.listeners[name] = listener; },
    label,
  };
}
const productionHtml = read("index.html");
const motionCount = [...productionHtml.matchAll(/<button\b(?=[^>]*class="[^"]*\bmotion-toggle\b)[^>]*>/g)].length;
const soundCount = [...productionHtml.matchAll(/<button\b(?=[^>]*class="[^"]*\bsound-toggle\b)[^>]*>/g)].length;
assert.equal(motionCount, 2, "Hero and footer each expose a motion control");
assert.equal(soundCount, 2, "Hero and footer each expose a sound control");
const motionControls = Array.from({ length: motionCount }, playbackButton);
const soundControls = Array.from({ length: soundCount }, playbackButton);
const media = {
  matches: false,
  addEventListener(name, listener) { assert.equal(name, "change"); this.change = listener; },
};
const announcement = { textContent: "" };
let audioStarts = 0;
let finishAudioStart;
let rejectAudioStart = false;
let autoplayBlocked = false;
const scoreStub = {
  enabled: false,
  requested: false,
  async start({ automatic = false } = {}) {
    audioStarts++;
    this.requested = true;
    if (automatic && autoplayBlocked) return false;
    if (rejectAudioStart) throw new Error("Audio unavailable");
    await new Promise((resolveStart) => { finishAudioStart = resolveStart; });
    this.enabled = this.requested;
    return this.enabled;
  },
  stop() { this.enabled = false; this.requested = false; },
};
const rootStyle = {};
const preferences = new Map();
const gestures = {};
const playbackDocument = {
  hidden: false,
  body: { classList: { toggle() {} } },
  documentElement: { style: rootStyle },
  addEventListener(name, listener) { gestures[name] = listener; },
};
const playbackContext = {
  document: playbackDocument,
  sessionStorage: { getItem(key) { return preferences.get(key) ?? null; }, setItem(key, value) { preferences.set(key, value); } },
  motionButtons: motionControls,
  soundButtons: soundControls,
  score: scoreStub,
  paused: false,
  soundBusy: false,
  soundWanted: true,
  soundFailed: false,
  resumeAudio: false,
  restoreAudioPending: false,
  status: announcement,
  reduced: media,
  needsRender: false,
  targetProgress: 0,
  setChapter() {},
};
runInNewContext(playbackSource + "\nmotionState(); soundState();", playbackContext);
const assertMotion = (pressed, label) => motionControls.forEach((button) => {
  assert.equal(button.attributes["aria-pressed"], pressed);
  assert.equal(button.attributes["aria-label"], label);
  assert.equal(button.textContent, pressed === "true" ? "움직임 멈춤" : "움직임 켜짐");
});
const assertSound = (pressed, busy = false, label = pressed === "true" ? "음악 켜짐" : "음악 켜기") => soundControls.forEach((button) => {
  assert.equal(button.attributes["aria-pressed"], pressed);
  assert.equal(button.attributes["aria-label"], pressed === "true" ? "배경 음악 끄기" : "배경 음악 켜기");
  assert.equal(button.label.textContent, label);
  assert.equal(button.attributes["aria-disabled"], String(busy));
  assert.equal(button.attributes["aria-busy"], String(busy));
  assert.equal(button.disabled, false, "Audio controls retain native focusability while busy");
});
assertMotion("false", "움직임 일시 정지");
motionControls[0].listeners.click();
assertMotion("true", "움직임 재생");
assert.equal(rootStyle.scrollBehavior, "auto");
motionControls[1].listeners.click();
assertMotion("false", "움직임 일시 정지");
media.matches = true;
media.change();
assertMotion("true", "움직임 재생");
media.matches = false;
media.change();
assertMotion("false", "움직임 일시 정지");
assertSound("false", false, "음악 대기");
const pendingAudio = soundControls[0].listeners.click();
assertSound("false", true, "음악 대기");
await soundControls[1].listeners.click();
assert.equal(audioStarts, 1, "Second control cannot start audio while the first is busy");
finishAudioStart();
await pendingAudio;
assertSound("true");
await soundControls[1].listeners.click();
assertSound("false");
rejectAudioStart = true;
await soundControls[0].listeners.click();
assertSound("false");
assert.match(announcement.textContent, /재생할 수 없습니다/);
rejectAudioStart = false;
const retryAudio = soundControls[1].listeners.click();
finishAudioStart();
await retryAudio;
assertSound("true");
await soundControls[0].listeners.click();
assertSound("false");

// Initial autoplay rejection leaves controls usable and retries on a real
// interaction. An explicit mute survives later gestures and page restoration.
assert.equal(preferences.get("aurora-sound"), "off");
assert.equal(playbackContext.readSoundPreference(), false);
preferences.clear();
assert.equal(playbackContext.readSoundPreference(), true);
playbackContext.soundWanted = true;
autoplayBlocked = true;
await playbackContext.startSound(true);
assertSound("false", false, "음악 대기");
const startsBeforeGesture = audioStarts;
const pageClick = { type: "click", isTrusted: true, target: { closest() { return null; } } };
gestures.click({ ...pageClick, isTrusted: false });
gestures.click({ ...pageClick, target: { closest() { return {}; } } });
assert.equal(audioStarts, startsBeforeGesture, "Synthetic and sound-control clicks do not activate the automatic retry");
gestures.click(pageClick);
gestures.click(pageClick);
assert.equal(audioStarts, startsBeforeGesture + 1, "First interaction starts only one pending playback request");
finishAudioStart();
await new Promise((resolveTick) => setImmediate(resolveTick));
assertSound("true");
playbackDocument.hidden = true;
playbackContext.pauseSound();
assertSound("false", false, "음악 대기");
playbackDocument.hidden = false;
playbackContext.restoreSound();
finishAudioStart();
await new Promise((resolveTick) => setImmediate(resolveTick));
assertSound("true");
await soundControls[1].listeners.click();
const mutedStarts = audioStarts;
gestures.click(pageClick);
playbackContext.pauseSound();
playbackContext.restoreSound();
assert.equal(audioStarts, mutedStarts, "Explicit mute survives later gestures and restoring the page");
assertSound("false");
playbackContext.soundWanted = true;
playbackDocument.hidden = true;
await playbackContext.startSound(true);
assert.equal(audioStarts, mutedStarts, "Hidden pages do not start background music");
playbackDocument.hidden = false;
const startBeforeHide = playbackContext.startSound();
playbackDocument.hidden = true;
playbackContext.pauseSound();
finishAudioStart();
await startBeforeHide;
assert.equal(scoreStub.enabled, false, "A pending start cannot resurrect playback after the page is hidden");
playbackDocument.hidden = false;
autoplayBlocked = false;
const startDuringVisibilityChange = playbackContext.startSound();
playbackDocument.hidden = true;
playbackContext.pauseSound();
playbackDocument.hidden = false;
playbackContext.restoreSound();
finishAudioStart();
await startDuringVisibilityChange;
finishAudioStart();
await new Promise((resolveTick) => setImmediate(resolveTick));
assertSound("true");
await soundControls[0].listeners.click();
playbackContext.sessionStorage.getItem = () => { throw new Error("Storage unavailable"); };
assert.equal(playbackContext.readSoundPreference(), true, "Default music remains available without storage");

// Exercise the production streaming engine with delayed device/network replies.
// Existing controller tests above also cover gesture fallback and remembered mute.
const timers = new Map();
let timerId = 0;
const targets = [];
const elements = [];
const resumes = [];
const plays = [];
let resumeCalls = 0;
let playCalls = 0;
let pauseCalls = 0;
let sourceCount = 0;
const testDocument = {
  body: { append(media) { elements.push(media); } },
  createElement(tag) {
    assert.equal(tag, "audio");
    return {
      paused: true, currentTime: 0, listeners: {},
      setAttribute() {},
      addEventListener(name, listener) { this.listeners[name] = listener; },
      play() {
        playCalls++;
        return new Promise((resolvePlay, rejectPlay) => plays.push({
          resolve: () => { this.paused = false; resolvePlay(); }, reject: rejectPlay,
        }));
      },
      pause() { this.paused = true; pauseCalls++; },
    };
  },
};
class DeviceContext {
  state = "suspended";
  currentTime = 2;
  destination = {};
  createGain() {
    return { connect() {}, gain: { value: 0, cancelScheduledValues() {}, setTargetAtTime(value) { targets.push(value); } } };
  }
  createMediaElementSource() { sourceCount++; return { connect() {} }; }
  resume() {
    resumeCalls++;
    return new Promise((resolveResume) => resumes.push(() => { this.state = "running"; resolveResume(); }));
  }
  async suspend() { this.state = "suspended"; }
}
const Score = runInNewContext(read("rebrand/audio.js").replace("export class AuroraScore", "class AuroraScore") + "\nAuroraScore;", {
  window: { AudioContext: DeviceContext }, document: testDocument,
  setTimeout(callback, delay) { const id = ++timerId; timers.set(id, { callback, delay }); return id; },
  clearTimeout(id) { timers.delete(id); },
});
const engine = new Score();
assert.equal(await engine.start({ automatic: true }), false);
assert.equal(resumeCalls, 0, "Blocked automatic start avoids a never-settling resume promise");
assert.equal(playCalls, 0, "Blocked autoplay does not request the recording");
assert.equal(engine.media.preload, "none");
assert.equal(engine.media.loop, true);
assert.equal(engine.media.hidden, true);
assert.equal(engine.media.src, "/rebrand/assets/audio/close-looking.mp3?v=1");
const duplicateStart1 = engine.start();
const duplicateStart2 = engine.start();
assert.equal(duplicateStart1, duplicateStart2, "Concurrent starts share one network/device operation");
resumes.splice(0).forEach((finish) => finish());
plays.splice(0).forEach((reply) => reply.resolve());
await duplicateStart1;
assert.equal(engine.enabled, true);
assert.equal(playCalls, 1);
assert.equal(sourceCount, 1, "One recording source is connected");
assert.equal(elements.length, 1, "Only one audio element is created");
assert.equal(targets.at(-1), 0.22, "Normalized recording is attenuated to quiet background level");
assert.equal(timers.size, 0, "Successful playback releases its loading timeout");
engine.stop();
assert.equal(engine.enabled, false);
assert.equal(targets.at(-1), 0);
const oldPauseTimer = [...timers.keys()][0];
const restart = engine.start();
assert(!timers.has(oldPauseTimer), "Restart cancels the old fade/suspension timer");
resumes.splice(0).forEach((finish) => finish());
plays.splice(0).forEach((reply) => reply.resolve());
await restart;
engine.stop();
[...timers.values()].forEach(({ callback }) => callback());
timers.clear();
assert.equal(engine.media.paused, true, "Mute pauses the stream after the short fade");
assert.equal(engine.ctx.state, "suspended");
const canceledStart = engine.start();
const pendingPlay = plays.shift();
engine.stop();
assert.equal(engine.media.paused, true, "Stopping a pending start pauses it immediately");
pendingPlay.reject(Object.assign(new Error("Interrupted"), { name: "AbortError" }));
resumes.splice(0).forEach((finish) => finish());
assert.equal(await canceledStart, false);
assert.equal(engine.enabled, false, "Stopping during loading cannot resurrect playback");
const failedStart = engine.start();
resumes.splice(0).forEach((finish) => finish());
plays.shift().reject(new Error("Network unavailable"));
await assert.rejects(failedStart, /Network unavailable/);
assert.equal(engine.media.paused, true);
assert.equal(engine.pending, null, "Loading failure leaves playback retryable");
const stalledStart = engine.start();
resumes.splice(0).forEach((finish) => finish());
[...timers.values()].find(({ delay }) => delay === 14000).callback();
await assert.rejects(stalledStart, /timed out/);
plays.shift().reject(new Error("Canceled request"));
assert.equal(engine.enabled, false, "A stalled request cannot leave controls busy indefinitely");
const permittedAutoplay = engine.start({ automatic: true });
resumes.splice(0).forEach((finish) => finish());
plays.shift().resolve();
await permittedAutoplay;
assert.equal(engine.enabled, true, "Permitted autoplay starts without a separate interaction");
let mediaErrors = 0;
engine.onError = () => { mediaErrors++; };
engine.media.listeners.error();
assert.equal(engine.enabled, false);
assert.equal(mediaErrors, 1, "A stream error updates the playback controller");
assert(pauseCalls > 0);
assert(statSync(resolve(root, "rebrand/assets/audio/close-looking.mp3")).size < 3000000, "Full recording stays under 3 MB");
console.log("Playback checks passed: lazy streamed recording, quiet gain, retry, mute/visibility cancellation and synchronized controls.");
