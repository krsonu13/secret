// Pure Web Audio API Synthesizer - works offline and zero CDN dependency
class AudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: any = null;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // ignore audio errors
    }
  }

  playChime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.4, 'sine', 0.15), i * 80);
    });
  }

  playBlowCandle() {
    const ctx = this.getContext();
    if (!ctx) return;
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.4);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
  }

  startMelody() {
    if (this.isPlaying) return;
    this.isPlaying = true;

    const melody = [
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.5 },
      { f: 261.63, d: 0.5 },  { f: 349.23, d: 0.5 },  { f: 329.63, d: 0.8 },
      { f: 0, d: 0.2 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 293.66, d: 0.5 },
      { f: 261.63, d: 0.5 },  { f: 392.00, d: 0.5 },  { f: 349.23, d: 0.8 },
      { f: 0, d: 0.2 },
      { f: 261.63, d: 0.35 }, { f: 261.63, d: 0.25 }, { f: 523.25, d: 0.5 },
      { f: 440.00, d: 0.5 },  { f: 349.23, d: 0.5 },  { f: 329.63, d: 0.5 },
      { f: 293.66, d: 0.8 },
      { f: 0, d: 0.2 },
      { f: 466.16, d: 0.35 }, { f: 466.16, d: 0.25 }, { f: 440.00, d: 0.5 },
      { f: 349.23, d: 0.5 },  { f: 392.00, d: 0.5 },  { f: 349.23, d: 1.0 },
      { f: 0, d: 0.8 }
    ];

    let idx = 0;
    const tick = () => {
      if (!this.isPlaying) return;
      const note = melody[idx];
      if (note.f > 0) {
        this.playTone(note.f, note.d * 0.9, 'triangle', 0.08);
        this.playTone(note.f * 1.5, note.d * 0.7, 'sine', 0.03);
      }
      idx = (idx + 1) % melody.length;
      this.timer = setTimeout(tick, note.d * 1000);
    };
    tick();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggleMelody(): boolean {
    if (this.isPlaying) {
      this.stopMelody();
      return false;
    } else {
      this.startMelody();
      return true;
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

export const soundSynth = new AudioSynthesizer();
