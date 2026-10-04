// Original generative score: 84 BPM, D minor / Bb / F / C. No external recordings.
// Start quietly when autoplay is allowed, otherwise wait for an interaction.
export class AuroraScore {
  constructor() {
    this.enabled = false;
    this.requested = false;
    this.mood = 0;
    this.timer = null;
    this.step = 0;
    this.journey = 0;
    this.epoch = 0;
    this.lastTransition = -10;
  }
  async start({ automatic = false } = {}) {
    this.requested = true;
    if (!this.ctx) this.build();
    clearTimeout(this.suspendTimer);
    // A policy-blocked resume() may never settle until a gesture. Keep controls
    // available rather than leaving the initial automatic attempt busy.
    if (automatic && this.ctx.state !== "running") return false;
    await this.ctx.resume();
    if (!this.requested || this.ctx.state !== "running") return false;
    if (this.enabled) return true;
    this.enabled = true;
    this.master.gain.cancelScheduledValues(this.ctx.currentTime);
    this.master.gain.setTargetAtTime(0.018, this.ctx.currentTime, 0.65);
    this.next = this.ctx.currentTime + 0.1;
    this.epoch = this.next - (this.step * (60 / 84)) / 2;
    this.schedule();
    clearInterval(this.timer);
    this.timer = setInterval(() => this.schedule(), 80);
    return true;
  }
  stop() {
    this.requested = false;
    this.enabled = false;
    clearInterval(this.timer);
    if (!this.ctx) return;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.12);
    clearTimeout(this.suspendTimer);
    this.suspendTimer = setTimeout(() => {
      if (!this.enabled) this.ctx.suspend();
    }, 900);
  }
  build() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error("Audio unavailable");
    const ctx = (this.ctx = new AudioContext());
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -18;
    limiter.knee.value = 20;
    limiter.ratio.value = 4;
    this.filter = ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 2100;
    this.filter.Q.value = 0.4;
    this.master.connect(this.filter);
    this.filter.connect(limiter);
    limiter.connect(ctx.destination);
    this.reverb = ctx.createConvolver();
    const length = Math.floor(ctx.sampleRate * 3.2),
      impulse = ctx.createBuffer(2, length, ctx.sampleRate);
    let seed = 127;
    for (let c = 0; c < 2; c++) {
      const data = impulse.getChannelData(c);
      for (let i = 0; i < length; i++) {
        seed = (seed * 16807) % 2147483647;
        data[i] = (seed / 1073741823.5 - 1) * Math.pow(1 - i / length, 3.2);
      }
    }
    this.reverb.buffer = impulse;
    const wet = ctx.createGain();
    wet.gain.value = 0.3;
    this.reverb.connect(wet);
    wet.connect(this.master);
    this.delay = ctx.createDelay(2);
    this.delay.delayTime.value = (60 / 84) * 0.75;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.24;
    const echo = ctx.createGain();
    echo.gain.value = 0.18;
    this.delay.connect(feedback);
    feedback.connect(this.delay);
    this.delay.connect(echo);
    echo.connect(this.master);
  }
  tone(midi, time, duration, volume, type = "sine", pan = 0) {
    const ctx = this.ctx,
      oscillator = ctx.createOscillator(),
      gain = ctx.createGain(),
      panner = ctx.createStereoPanner();
    oscillator.type = type;
    oscillator.frequency.value = 440 * 2 ** ((midi - 69) / 12);
    panner.pan.value = pan;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(
      volume,
      time + (type === "sine" ? 0.015 : 0.6),
    );
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(gain);
    gain.connect(panner);
    panner.connect(this.master);
    panner.connect(this.reverb);
    panner.connect(this.delay);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.05);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
      panner.disconnect();
    };
  }
  schedule() {
    if (!this.enabled || this.ctx.state !== "running") return;
    const beat = 60 / 84,
      chords = [
        [50, 57, 60, 64],
        [46, 53, 57, 60],
        [53, 60, 64, 67],
        [48, 55, 58, 62],
      ];
    while (this.next < this.ctx.currentTime + 0.2) {
      const step = this.step % 64,
        chord = chords[Math.floor(step / 16)],
        t = this.next;
      if (step % 16 === 0)
        chord.forEach((note, i) =>
          this.tone(note, t, beat * 9, 0.045, "triangle", (i - 1.5) * 0.4),
        );
      if (step % 2 === 0) {
        const sequence = [0, 2, 1, 3, 2, 1, 3, 2];
        const i = sequence[(step / 2) % 8];
        this.tone(
          chord[i] + 12 + (this.mood === 1 ? 12 : 0),
          t,
          beat * 2.8,
          0.08,
          "sine",
          Math.sin(step * 1.8) * 0.6,
        );
      }
      if (step % 8 === 0) this.tone(chord[0] - 12, t, beat * 3, 0.13);
      if (step % 4 === 0) {
        const osc = this.ctx.createOscillator(),
          envelope = this.ctx.createGain();
        osc.frequency.setValueAtTime(90, t);
        osc.frequency.exponentialRampToValueAtTime(38, t + 0.14);
        envelope.gain.setValueAtTime(0.13, t);
        envelope.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        osc.connect(envelope);
        envelope.connect(this.master);
        osc.start(t);
        osc.stop(t + 0.36);
        osc.onended = () => {
          osc.disconnect();
          envelope.disconnect();
        };
      }
      this.step++;
      this.next += beat / 2;
    }
  }
  chime() {
    if (this.enabled && this.ctx?.state === "running")
      this.tone(
        [86, 89, 81][this.mood],
        this.ctx.currentTime,
        2.2,
        0.09,
        "sine",
        0,
      );
  }
  setJourney(progress) {
    this.journey = progress;
    if (this.ctx && this.enabled)
      this.filter.frequency.setTargetAtTime(
        1700 + Math.sin(progress * Math.PI) * 1600,
        this.ctx.currentTime,
        0.3,
      );
  }
  transition(chapter) {
    if (
      !this.enabled ||
      !this.ctx ||
      this.ctx.currentTime - this.lastTransition < 1.5
    )
      return;
    this.lastTransition = this.ctx.currentTime;
    [0, 7, 12].forEach((interval, i) =>
      this.tone(
        74 + chapter * 2 + interval,
        this.ctx.currentTime + i * 0.09,
        3.2,
        0.035,
        "sine",
        (i - 1) * 0.35,
      ),
    );
  }
  get pulse() {
    return this.enabled && this.ctx
      ? Math.exp(
          -(
            (Math.max(0, this.ctx.currentTime - this.epoch) % (60 / 84)) /
            (60 / 84)
          ) * 5,
        )
      : 0;
  }
}
