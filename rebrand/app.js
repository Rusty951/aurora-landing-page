import { AuroraScore } from "./audio.js?v=2";
import { initShowcase } from "./showcase.js?v=5";
const $ = (selector) => document.querySelector(selector);
const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const smooth = (a, b, n) => {
  const t = clamp((n - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const experience = $(".experience"),
  stage = $(".experience-stage"),
  canvas = $("#aurora-field");
const chapters = [...document.querySelectorAll("[data-chapter]")],
  jumps = [...document.querySelectorAll("[data-jump]")];
const cursor = $(".cursor"),
  progressBar = $(".scroll-progress"),
  header = $(".header");
const motionButton = $(".motion-toggle"),
  soundButton = $(".sound-toggle"),
  status = $("#experience-status");
const pointer = { x: 0, y: 0 },
  targetPointer = { x: 0, y: 0 },
  screen = { x: -100, y: -100 },
  cursorPosition = { x: -100, y: -100 };
const score = new AuroraScore();
const sculptureMode =
  new URLSearchParams(location.search).get("render") === "mesh";
document.body.classList.toggle("silk-mode", !sculptureMode);
const posterMode = new URLSearchParams(location.search).has("poster");
if (posterMode) document.body.classList.add("poster-export");
let scene = null,
  paused = reduced.matches || posterMode,
  time = 0,
  last = performance.now(),
  raf = 0,
  impactAge = 100,
  mood = 0,
  moodSmooth = 0;
let progress = 0,
  targetProgress = 0,
  activeChapter = 0,
  sceneVisible = true,
  needsRender = true,
  soundBusy = false,
  resumeAudio = false;
let range = 1,
  documentRange = 1;
if (sculptureMode) experience.classList.add("staged");
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }),
  { threshold: 0.09 },
);
document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));
document.body.classList.add("enhanced");
new IntersectionObserver(([entry]) => {
  sceneVisible = entry.isIntersecting;
  if (sceneVisible) needsRender = true;
}).observe(experience);
// Keep sound controls available without covering the mobile contact button.
new IntersectionObserver(
  ([entry]) => {
    document.body.classList.toggle("contact-view", entry.isIntersecting);
  },
  { rootMargin: "0px 0px -10% 0px" },
).observe($("#contact"));
function measure() {
  range = sculptureMode
    ? Math.max(1, experience.offsetHeight - stage.offsetHeight)
    : Math.max(1, stage.offsetHeight);
  documentRange = Math.max(
    1,
    document.documentElement.scrollHeight - innerHeight,
  );
  scene?.resize();
  onScroll();
  needsRender = true;
}
function onScroll() {
  targetProgress = clamp((scrollY - experience.offsetTop) / range);
  progressBar.style.transform = `scaleX(${clamp(scrollY / documentRange)})`;
  header.classList.toggle("scrolled", scrollY > 50);
  if (paused) needsRender = true;
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", measure, { passive: true });
document.fonts?.ready.then(measure);
function setChapter(p) {
  const weights = sculptureMode
    ? [
        1 - smooth(0.15, 0.29, p),
        smooth(0.27, 0.39, p) * (1 - smooth(0.6, 0.72, p)),
        smooth(0.7, 0.83, p),
      ]
    : [1, 0, 0];
  const selected = weights.indexOf(Math.max(...weights));
  chapters.forEach((chapter, i) => {
    const opacity = weights[i];
    chapter.style.opacity = opacity;
    chapter.style.visibility = opacity > 0.005 ? "visible" : "hidden";
    chapter.style.transform = paused
      ? "none"
      : `translate3d(0,${(1 - opacity) * (i === 0 ? -24 : 24)}px,0)`;
    chapter.inert = selected !== i;
    chapter.setAttribute("aria-hidden", String(selected !== i));
  });
  jumps.forEach((button, i) => {
    button.classList.toggle("active", i === selected);
    if (i === selected) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  if (selected !== activeChapter) {
    activeChapter = selected;
    score.transition(selected);
  }
}
jumps.forEach((button, i) =>
  button.addEventListener("click", () =>
    window.scrollTo({
      top: experience.offsetTop + range * [0, 0.48, 0.94][i],
      behavior: paused ? "instant" : "smooth",
    }),
  ),
);
function motionState() {
  document.body.classList.toggle("motion-paused", paused);
  document.documentElement.style.scrollBehavior = paused ? "auto" : "";
  motionButton.textContent = paused ? "움직임 멈춤" : "움직임 켜짐";
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.setAttribute(
    "aria-label",
    paused ? "움직임 재생" : "움직임 일시 정지",
  );
  needsRender = true;
  setChapter(targetProgress);
}
motionButton.addEventListener("click", () => {
  paused = !paused;
  motionState();
  status.textContent = paused
    ? "움직임을 멈췄습니다. 스크롤로 다음 장면을 볼 수 있습니다."
    : "움직임을 재생합니다.";
});
reduced.addEventListener("change", () => {
  paused = reduced.matches;
  motionState();
});
function soundState() {
  soundButton.setAttribute("aria-pressed", String(score.enabled));
  soundButton.setAttribute(
    "aria-label",
    score.enabled ? "배경 음악 끄기" : "배경 음악 켜기",
  );
  $(".sound-label").textContent = score.enabled ? "음악 켜짐" : "음악 켜기";
}
soundButton.addEventListener("click", async () => {
  if (soundBusy) return;
  soundBusy = true;
  try {
    if (score.enabled) score.stop();
    else await score.start();
    soundState();
    status.textContent = score.enabled
      ? "배경 음악을 재생합니다."
      : "배경 음악을 껐습니다.";
  } catch {
    status.textContent =
      "배경 음악을 재생할 수 없습니다. 다시 눌러 시도해주세요.";
  } finally {
    soundBusy = false;
  }
});
window.addEventListener(
  "pointermove",
  (event) => {
    if (event.pointerType === "touch") return;
    screen.x = event.clientX;
    screen.y = event.clientY;
    targetPointer.x = (event.clientX / innerWidth) * 2 - 1;
    targetPointer.y = 1 - (event.clientY / innerHeight) * 2;
    document.body.classList.add("has-pointer");
  },
  { passive: true },
);
document.addEventListener("pointerover", (event) =>
  cursor.classList.toggle("over", !!event.target.closest("a,button,summary")),
);
document.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget) document.body.classList.remove("has-pointer");
});
function resonate() {
  if (!paused) {
    impactAge = 0;
    needsRender = true;
  }
  score.chime();
}
stage.addEventListener("pointerdown", (event) => {
  if (!event.target.closest("a,button")) resonate();
});
$(".resonate-trigger").addEventListener("click", () => {
  resonate();
  status.textContent = paused
    ? "움직임을 켜면 조형물에 파동을 보낼 수 있습니다."
    : "조형물에 파동을 보냈습니다.";
});
document.querySelectorAll(".magnetic").forEach((element) => {
  element.addEventListener("pointermove", (event) => {
    if (paused || event.pointerType === "touch") return;
    const rect = element.getBoundingClientRect();
    element.style.translate = `${(event.clientX - rect.left - rect.width / 2) * 0.1}px ${(event.clientY - rect.top - rect.height / 2) * 0.12}px`;
  });
  element.addEventListener("pointerleave", () => {
    element.style.translate = "";
  });
});
// Native disclosure state remains usable without JavaScript.
const detailAnimations = new WeakMap();
document.querySelectorAll("details").forEach((details) => {
  const summary = details.querySelector("summary");
  summary.addEventListener("click", (event) => {
    if (paused) return;
    event.preventDefault();
    const previous = detailAnimations.get(details);
    const opening = previous ? !previous.opening : !details.open;
    const startHeight = details.getBoundingClientRect().height;
    previous?.animation.cancel();
    details.open = true;
    const endHeight = opening
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + 1;
    details.style.overflow = "hidden";
    const animation = details.animate(
      [{ height: `${startHeight}px` }, { height: `${endHeight}px` }],
      { duration: 450, easing: "cubic-bezier(.22,1,.36,1)" },
    );
    detailAnimations.set(details, { animation, opening });
    animation.onfinish = () => {
      details.open = opening;
      details.style.overflow = "";
      detailAnimations.delete(details);
      measure();
    };
  });
});
function frame(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  if (!paused) {
    time += dt;
    impactAge += dt;
    progress += (targetProgress - progress) * (1 - Math.exp(-dt * 9));
    moodSmooth += (mood - moodSmooth) * (1 - Math.exp(-dt * 3));
    pointer.x += (targetPointer.x - pointer.x) * (1 - Math.exp(-dt * 3));
    pointer.y += (targetPointer.y - pointer.y) * (1 - Math.exp(-dt * 3));
  } else {
    progress = targetProgress;
    moodSmooth = mood;
  }
  if (sceneVisible) {
    setChapter(progress);
    score.setJourney(progress);
    if (!paused || needsRender)
      scene?.render({
        time,
        progress,
        pointer,
        pulse: paused ? 0 : score.pulse,
        mood: moodSmooth,
        impactAge,
      });
  }
  if (!paused) {
    cursorPosition.x +=
      (screen.x - cursorPosition.x) * (1 - Math.exp(-dt * 14));
    cursorPosition.y +=
      (screen.y - cursorPosition.y) * (1 - Math.exp(-dt * 14));
    cursor.style.transform = `translate3d(${cursorPosition.x}px,${cursorPosition.y}px,0) translate(-50%,-50%)`;
  }
  needsRender = false;
  raf = requestAnimationFrame(frame);
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(raf);
    resumeAudio = score.enabled;
    if (resumeAudio) score.stop();
  } else {
    cancelAnimationFrame(raf);
    last = performance.now();
    raf = requestAnimationFrame(frame);
    if (resumeAudio) {
      resumeAudio = false;
      score
        .start()
        .then(soundState)
        .catch(() => {
          score.stop();
          soundState();
        });
    }
  }
});
window.addEventListener("pagehide", () => {
  score.stop();
  cancelAnimationFrame(raf);
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    last = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
    soundState();
    measure();
  }
});
initShowcase({ motionAllowed: () => !paused });
motionState();
measure();
raf = requestAnimationFrame(frame);
// Keep the text, links, disclosures and static artwork alive if WebGL or the
// graphics module is unavailable. Failure never gates entry into the site.
import(sculptureMode ? "./field.js?v=2" : "./silk.js?v=3")
  .then((module) => {
    const Renderer = sculptureMode ? module.AuroraScene : module.AuroraSilk;
    scene = new Renderer(canvas);
    document.body.classList.toggle(
      "scene-failed",
      sculptureMode ? !scene.ready : scene.failed,
    );
    measure();
  })
  .catch((error) => {
    document.body.classList.add("scene-failed");
    console.warn("Static scene fallback.", error);
  });
