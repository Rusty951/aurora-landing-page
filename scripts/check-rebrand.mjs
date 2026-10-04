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
assert.match(app, /audio\.js\?v=3/);
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

// Exercise the actual score start/stop code independently of device speakers.
// Delayed browser resume promises must never create duplicate or revived loops.
const intervals = new Set();
const targets = [];
const canceledSuspensions = [];
const Score = runInNewContext(read("rebrand/audio.js").replace("export class AuroraScore", "class AuroraScore") + "\nAuroraScore;", {
  setInterval(callback) { intervals.add(callback); return callback; },
  clearInterval(id) { intervals.delete(id); },
  setTimeout() { return 7; },
  clearTimeout(id) { canceledSuspensions.push(id); },
});
const engine = new Score();
const resumeWaiters = [];
let resumeCalls = 0;
let schedules = 0;
engine.ctx = { state: "suspended", currentTime: 2, resume() { resumeCalls++; return new Promise((resolveResume) => resumeWaiters.push(resolveResume)); }, suspend() {} };
engine.master = { gain: { cancelScheduledValues() {}, setTargetAtTime(value) { targets.push(value); } } };
engine.schedule = () => { schedules++; };
assert.equal(await engine.start({ automatic: true }), false);
assert.equal(resumeCalls, 0, "Blocked automatic start avoids a never-settling resume promise");
const duplicateStart1 = engine.start();
const duplicateStart2 = engine.start();
engine.ctx.state = "running";
resumeWaiters.splice(0).forEach((resolveResume) => resolveResume());
await Promise.all([duplicateStart1, duplicateStart2]);
assert.equal(schedules, 1, "Concurrent resume completions schedule music once");
assert.equal(intervals.size, 1, "Only one music scheduler runs");
assert(targets[0] > 0 && targets[0] <= 0.02, "Default master output stays very quiet");
engine.stop();
assert.equal(intervals.size, 0);
engine.ctx.state = "suspended";
const canceledStart = engine.start();
engine.stop();
engine.ctx.state = "running";
resumeWaiters.splice(0).forEach((resolveResume) => resolveResume());
await canceledStart;
assert.equal(engine.enabled, false, "Stopping during resume prevents audio from returning");
assert.equal(intervals.size, 0);
assert(canceledSuspensions.includes(7), "Starting again cancels the old suspension timeout");
const permittedAutoplay = engine.start({ automatic: true });
resumeWaiters.splice(0).forEach((resolveResume) => resolveResume());
await permittedAutoplay;
assert.equal(engine.enabled, true, "Permitted autoplay starts without a separate interaction");
engine.stop();
console.log("Playback checks passed: quiet default, gesture fallback, remembered mute, visibility cancellation, synchronized controls and single scheduling.");
