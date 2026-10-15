// AFTERLOOK A02-BGM-003, Close Looking. Source and reuse scope: docs/TRD.md.
// Stream the recording through a quiet gain envelope; do not decode the whole
// three-minute track into a Web Audio buffer or layer the former score over it.
export class AuroraScore {
  constructor() {
    this.enabled = false;
    this.requested = false;
    this.mood = 0;
    this.journey = 0;
    this.generation = 0;
    this.pending = null;
  }
  start({ automatic = false } = {}) {
    this.requested = true;
    if (!this.ctx) this.build();
    clearTimeout(this.suspendTimer);
    // A blocked resume can remain pending until a gesture. Leave both controls
    // usable and avoid loading the recording before playback is permitted.
    if (automatic && this.ctx.state !== "running") return Promise.resolve(false);
    if (this.enabled) return Promise.resolve(true);
    if (this.pending) return this.pending;
    const generation = this.generation;
    // Invoke both within the trusted input task, before awaiting either one.
    const resume = this.ctx.resume();
    const play = this.media.play();
    let loadTimer;
    const timeout = new Promise((_, reject) => {
      loadTimer = setTimeout(() => reject(new Error("Audio loading timed out")), 14000);
    });
    const pending = Promise.race([Promise.all([resume, play]), timeout]).then(() => {
      if (!this.requested || generation !== this.generation) return false;
      if (this.ctx.state !== "running" || this.media.paused) return false;
      this.enabled = true;
      this.master.gain.cancelScheduledValues(this.ctx.currentTime);
      this.master.gain.setTargetAtTime(0.22, this.ctx.currentTime, 0.65);
      return true;
    }).catch((error) => {
      if (!this.requested || generation !== this.generation) return false;
      this.media.pause();
      if (automatic && error.name === "NotAllowedError") return false;
      throw error;
    }).finally(() => {
      clearTimeout(loadTimer);
      if (this.pending === pending) this.pending = null;
    });
    this.pending = pending;
    return pending;
  }
  stop() {
    const wasEnabled = this.enabled;
    this.requested = false;
    this.enabled = false;
    this.generation++;
    this.pending = null;
    if (!this.ctx) return;
    // pause() also aborts an in-flight media.play() when a page is hidden.
    if (!wasEnabled) this.media.pause();
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
    clearTimeout(this.suspendTimer);
    this.suspendTimer = setTimeout(() => {
      if (!this.requested) {
        this.media.pause();
        void this.ctx.suspend().catch(() => {});
      }
    }, 900);
  }
  build() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error("Audio unavailable");
    this.ctx = new AudioContext();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0;
    this.master.connect(this.ctx.destination);
    this.media = document.createElement("audio");
    this.media.hidden = true;
    this.media.setAttribute("aria-hidden", "true");
    this.media.setAttribute("playsinline", "");
    this.media.preload = "none";
    this.media.loop = true;
    this.media.src = "/rebrand/assets/audio/close-looking.mp3?v=1";
    this.media.addEventListener("error", () => {
      if (!this.enabled) return; // Initial loading errors reject play().
      this.stop();
      this.onError?.();
    });
    document.body.append(this.media);
    this.source = this.ctx.createMediaElementSource(this.media);
    this.source.connect(this.master);
  }
  // Preserve the visual controller's interface without synthesized sound FX.
  chime() {}
  transition() {}
  setJourney(progress) {
    this.journey = progress;
  }
  get pulse() {
    const beat = 60 / 92;
    return this.enabled && this.media
      ? Math.exp(-((this.media.currentTime % beat) / beat) * 5)
      : 0;
  }
}
