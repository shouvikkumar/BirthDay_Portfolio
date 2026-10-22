import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { launchGrandFinale, launchCelebrationConfetti } from '../utils/confetti';
import { audioEngine } from '../utils/audio';
import { Sparkles, Gift, Heart, Send, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalSurprise({ name }) {
  const [revealed, setRevealed] = useState(false);
  const [hugSent, setHugSent] = useState(false);
  const fireworksCanvasRef = useRef(null);

  const handleReveal = () => {
    setRevealed(true);
    audioEngine.playFanfare();
    launchGrandFinale();
  };

  // Canvas Fireworks Simulation
  useEffect(() => {
    if (!revealed) return;
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const fireworks = [];
    const particles = [];
    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#f59e0b', '#38bdf8', '#10b981', '#fbcfe8', '#ffd700'];

    class Firework {
      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.targetY = Math.random() * (height * 0.45) + (height * 0.1);
        this.speed = Math.random() * 4 + 6;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.y -= this.speed;
        if (this.y <= this.targetY) {
          this.explode();
          return true; // remove
        }
        return false;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      explode() {
        const count = 40;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.06; // gravity
        this.alpha -= this.decay;
        return this.alpha <= 0;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let lastFireworkTime = 0;

    const loop = (timestamp) => {
      ctx.fillStyle = 'rgba(11, 8, 25, 0.2)';
      ctx.fillRect(0, 0, width, height);

      if (timestamp - lastFireworkTime > 600) {
        fireworks.push(new Firework());
        lastFireworkTime = timestamp;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
        if (fireworks[i].update()) {
          fireworks.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        if (particles[i].update()) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [revealed]);

  const handleSendHug = () => {
    setHugSent(true);
    audioEngine.playSparkleSound();
    launchCelebrationConfetti();
    setTimeout(() => setHugSent(false), 4000);
  };

  return (
    <section id="surprise" className="relative py-28 px-4 flex flex-col items-center justify-center min-h-[85vh] overflow-hidden text-center">
      {/* Fireworks Canvas overlay */}
      {revealed && (
        <canvas
          ref={fireworksCanvasRef}
          className="fixed inset-0 pointer-events-none z-30"
          aria-hidden="true"
        />
      )}

      <div className="relative z-40 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {!revealed ? (
            /* Initial State */
            <motion.div
              key="unrevealed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs tracking-wider uppercase font-semibold mb-6">
                <Gift className="w-3.5 h-3.5 text-pink-300" />
                <span>The Grand Finale</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                {BIRTHDAY_CONFIG.finalSurprise.previewText}
              </h2>

              <p className="text-pink-200/80 text-base sm:text-lg max-w-lg mb-10 font-light">
                Before this celebration comes to a close, there is one last starry gift waiting to be unlocked.
              </p>

              <motion.button
                onClick={handleReveal}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="relative group px-10 py-5 rounded-full font-bold text-xl sm:text-2xl text-white shadow-[0_0_50px_rgba(236,72,153,0.5)] cursor-pointer overflow-hidden"
              >
                {/* Glowing Pulsing Button Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 group-hover:from-pink-400 group-hover:to-amber-300 transition-all duration-300 animate-pulse-glow" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="relative z-10 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-amber-200 animate-spin" style={{ animationDuration: '4s' }} />
                  <span>{BIRTHDAY_CONFIG.finalSurprise.buttonText}</span>
                  <Sparkles className="w-6 h-6 text-amber-200" />
                </span>
              </motion.button>
            </motion.div>
          ) : (
            /* Revealed Grand Celebration */
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-panel-glow rounded-3xl p-8 sm:p-14 border-2 border-pink-400/40 shadow-[0_0_80px_rgba(236,72,153,0.35)] relative overflow-hidden"
            >
              {/* Grand Banner */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-sm font-semibold mb-6 shadow-lg">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Endless Fireworks & Love</span>
              </div>

              {/* Exact requested text: HAPPY BIRTHDAY, [NAME]! 🎂🎉❤️ */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-gradient-text drop-shadow-[0_0_40px_rgba(244,114,182,0.6)]">
                {BIRTHDAY_CONFIG.finalSurprise.headingTemplate(name)}
              </h1>

              {/* Exact requested subtitle text */}
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-pink-100 max-w-3xl mx-auto leading-relaxed mb-10">
                "{BIRTHDAY_CONFIG.finalSurprise.message}"
              </p>

              {/* Interactive Celebration Controls */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
                <motion.button
                  onClick={handleSendHug}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 font-semibold text-white shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 text-pink-200 fill-current" />
                  <span>{hugSent ? 'Virtual Hug Delivered! 🤗💕' : 'Send a Virtual Hug 🤗'}</span>
                </motion.button>

                <motion.button
                  onClick={() => launchGrandFinale()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3.5 rounded-full glass-panel hover:bg-white/15 border border-pink-400/30 text-pink-100 font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>More Fireworks! 🎆</span>
                </motion.button>

                <button
                  onClick={() => setRevealed(false)}
                  className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-300/80 hover:text-white transition cursor-pointer"
                  title="Replay Surprise"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
