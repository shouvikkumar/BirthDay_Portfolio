import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

const BALLOON_COLORS = [
  { bg: 'from-pink-500 via-rose-400 to-pink-300', glow: 'rgba(244, 114, 182, 0.4)', color: '#ec4899' },
  { bg: 'from-purple-500 via-fuchsia-400 to-violet-300', glow: 'rgba(168, 85, 247, 0.4)', color: '#a855f7' },
  { bg: 'from-amber-400 via-yellow-300 to-amber-200', glow: 'rgba(251, 191, 36, 0.4)', color: '#f59e0b' },
  { bg: 'from-sky-400 via-blue-300 to-indigo-200', glow: 'rgba(56, 189, 248, 0.4)', color: '#0ea5e9' },
  { bg: 'from-rose-400 via-red-300 to-pink-200', glow: 'rgba(251, 113, 133, 0.4)', color: '#f43f5e' },
];

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    // Generate initial set of continuous floating balloons
    const initialBalloons = Array.from({ length: 9 }, (_, i) => ({
      id: `balloon-${i}-${Date.now()}`,
      x: 5 + (i * 10) + (Math.random() * 5),
      size: 48 + Math.random() * 26,
      duration: 16 + Math.random() * 12,
      delay: i * 1.8,
      style: BALLOON_COLORS[i % BALLOON_COLORS.length],
      sway: 15 + Math.random() * 25,
    }));
    setBalloons(initialBalloons);
  }, []);

  const handlePop = (e, balloon) => {
    e.stopPropagation();
    audioEngine.playPopSound();

    // Trigger mini confetti at pop location
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      colors: [balloon.style.color, '#ffffff', '#ffd700'],
      ticks: 50,
      scalar: 0.8,
    });

    // Remove and respawn balloon
    setBalloons((prev) => prev.filter((b) => b.id !== balloon.id));
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: `balloon-respawn-${Date.now()}-${Math.random()}`,
          x: 5 + Math.random() * 90,
          size: 48 + Math.random() * 26,
          duration: 16 + Math.random() * 12,
          delay: 0,
          style: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          sway: 15 + Math.random() * 25,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh', x: `${b.x}vw`, opacity: 0 }}
            animate={{
              y: '-20vh',
              x: [`${b.x}vw`, `${b.x + b.sway / 10}vw`, `${b.x - b.sway / 10}vw`, `${b.x}vw`],
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute pointer-events-auto cursor-pointer group"
            style={{ width: b.size, height: b.size * 1.25 }}
            onClick={(e) => handlePop(e, b)}
            whileHover={{ scale: 1.15 }}
            title="Click to pop! 🎈"
          >
            {/* Balloon Body */}
            <div
              className={`w-full h-full rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-tr ${b.style.bg} relative shadow-lg transition-transform`}
              style={{
                boxShadow: `0 10px 25px ${b.style.glow}, inset -5px -5px 12px rgba(0,0,0,0.15), inset 6px 6px 12px rgba(255,255,255,0.4)`,
              }}
            >
              {/* Highlight gleam */}
              <div className="absolute top-2 left-2.5 w-3 h-5 rounded-full bg-white/50 -rotate-45 blur-[0.5px]" />
              {/* Balloon knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-sm"
                style={{ backgroundColor: b.style.color }}
              />
              {/* Hanging String */}
              <svg
                className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-10 overflow-visible"
                viewBox="0 0 10 30"
              >
                <path
                  d="M 5 0 Q 8 10, 3 20 T 5 30"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
