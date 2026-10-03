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
assert(!/<audio[^>]*autoplay/.test(html), "Sound remains opt-in");
console.log("First-release checks passed: approved silk renderer, static fallback, opt-in audio and previous UI removal.");

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
const scoreStub = {
  enabled: false,
  async start() {
    audioStarts++;
    if (rejectAudioStart) throw new Error("Audio unavailable");
    await new Promise((resolveStart) => { finishAudioStart = resolveStart; });
    this.enabled = true;
  },
  stop() { this.enabled = false; },
};
const rootStyle = {};
runInNewContext(playbackSource + "\nmotionState(); soundState();", {
  document: { body: { classList: { toggle() {} } }, documentElement: { style: rootStyle } },
  motionButtons: motionControls,
  soundButtons: soundControls,
  score: scoreStub,
  paused: false,
  soundBusy: false,
  status: announcement,
  reduced: media,
  needsRender: false,
  targetProgress: 0,
  setChapter() {},
});
const assertMotion = (pressed, label) => motionControls.forEach((button) => {
  assert.equal(button.attributes["aria-pressed"], pressed);
  assert.equal(button.attributes["aria-label"], label);
  assert.equal(button.textContent, pressed === "true" ? "움직임 멈춤" : "움직임 켜짐");
});
const assertSound = (pressed, busy = false) => soundControls.forEach((button) => {
  assert.equal(button.attributes["aria-pressed"], pressed);
  assert.equal(button.attributes["aria-label"], pressed === "true" ? "배경 음악 끄기" : "배경 음악 켜기");
  assert.equal(button.label.textContent, pressed === "true" ? "음악 켜짐" : "음악 켜기");
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
assertSound("false");
const pendingAudio = soundControls[0].listeners.click();
assertSound("false", true);
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
console.log("Playback checks passed: two controls stay synchronized, reduced motion, busy guard, failure recovery and retry.");
