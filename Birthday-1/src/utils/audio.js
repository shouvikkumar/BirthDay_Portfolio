/**
 * Web Audio API Music Box & Sound Effects Synthesizer
 * Provides high-fidelity, celestial, music-box Happy Birthday melody
 * and reactive sound effects without relying on external network MP3s.
 */

class BirthdayAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.timerId = null;
    this.currentNoteIndex = 0;
    this.tempo = 92; // gentle music box tempo (BPM)

    // "Happy Birthday" melody (MIDI note numbers + duration in beats)
    // C4=60, D4=62, E4=64, F4=65, G4=67, A4=69, B4=71, C5=72, D5=74, E5=76, F5=77
    this.melody = [
      // Phrase 1: "Happy Birthday to you"
      { note: 60, beats: 0.75 },
      { note: 60, beats: 0.25 },
      { note: 62, beats: 1.0 },
      { note: 60, beats: 1.0 },
      { note: 65, beats: 1.0 },
      { note: 64, beats: 2.0 },
      { note: null, beats: 0.5 },

      // Phrase 2: "Happy Birthday to you"
      { note: 60, beats: 0.75 },
      { note: 60, beats: 0.25 },
      { note: 62, beats: 1.0 },
      { note: 60, beats: 1.0 },
      { note: 67, beats: 1.0 },
      { note: 65, beats: 2.0 },
      { note: null, beats: 0.5 },

      // Phrase 3: "Happy Birthday dear [Name]"
      { note: 60, beats: 0.75 },
      { note: 60, beats: 0.25 },
      { note: 72, beats: 1.0 },
      { note: 69, beats: 1.0 },
      { note: 65, beats: 1.0 },
      { note: 64, beats: 1.0 },
      { note: 62, beats: 2.0 },
      { note: null, beats: 0.5 },

      // Phrase 4: "Happy Birthday to you!"
      { note: 70, beats: 0.75 },
      { note: 70, beats: 0.25 },
      { note: 69, beats: 1.0 },
      { note: 65, beats: 1.0 },
      { note: 67, beats: 1.0 },
      { note: 65, beats: 2.5 },
      { note: null, beats: 1.0 },

      // Dreamy Arpeggio Interlude (celestial chords)
      { note: 60, beats: 0.5 },
      { note: 64, beats: 0.5 },
      { note: 67, beats: 0.5 },
      { note: 72, beats: 1.0 },
      { note: 65, beats: 0.5 },
      { note: 69, beats: 0.5 },
      { note: 72, beats: 0.5 },
      { note: 77, beats: 1.5 },
      { note: null, beats: 1.0 },
    ];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.28;
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.45;
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn("AudioContext not supported or restricted", e);
    }
  }

  midiToFreq(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  // Plays a crystal music box bell tone
  playMusicBoxBell(midi, time, duration) {
    if (!this.ctx || !midi) return;
    const freq = this.midiToFreq(midi);

    // Primary bell tone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const bellGain = this.ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, time);

    // Harmonic overtone (celesta chime shimmer)
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2.01, time);

    // Envelope
    bellGain.gain.setValueAtTime(0.001, time);
    bellGain.gain.exponentialRampToValueAtTime(0.3, time + 0.02);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 1.8);

    osc1.connect(bellGain);
    osc2.connect(bellGain);
    bellGain.connect(this.musicGain);

    osc1.start(time);
    osc2.start(time);

    osc1.stop(time + duration * 2);
    osc2.stop(time + duration * 2);
  }

  stepMusic() {
    if (!this.isPlaying || !this.ctx) return;

    const current = this.melody[this.currentNoteIndex];
    const beatDuration = 60 / this.tempo;
    const noteTime = current.beats * beatDuration;

    if (current.note !== null) {
      this.playMusicBoxBell(current.note, this.ctx.currentTime, noteTime);
      // Soft gentle bass backing for key melody beats
      if (this.currentNoteIndex % 4 === 0) {
        this.playMusicBoxBell(current.note - 12, this.ctx.currentTime, noteTime * 1.5);
      }
    }

    this.currentNoteIndex = (this.currentNoteIndex + 1) % this.melody.length;
    this.timerId = setTimeout(() => {
      this.stepMusic();
    }, noteTime * 1000);
  }

  startMusic() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.stepMusic();
  }

  pauseMusic() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  toggleMute() {
    this.init();
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(
        this.isMuted ? 0 : 0.8,
        this.ctx.currentTime
      );
    }
    return this.isMuted;
  }

  setVolume(val) {
    if (!this.masterGain || !this.ctx) return;
    const clamped = Math.max(0, Math.min(1, val));
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : clamped, this.ctx.currentTime);
  }

  /* Sound Effects */
  playFanfare() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [60, 64, 67, 72, 76]; // C major celebratory harp sweep
    notes.forEach((note, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(this.midiToFreq(note), now + idx * 0.08);

      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.35, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  playBlowSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    // Breath / soft air puff sound (filtered noise)
    const bufferSize = this.ctx.sampleRate * 0.6;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(700, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.6);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start();
  }

  playPopSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.13);
  }

  playSparkleSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    [1200, 1600, 2100, 2600].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime(0.08, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.3);
    });
  }
}

export const audioEngine = new BirthdayAudioEngine();
