import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { launchCandleBlownConfetti } from '../utils/confetti';
import { audioEngine } from '../utils/audio';
import { Sparkles, Wind, Flame, RotateCcw } from 'lucide-react';

export default function InteractiveCake() {
  // 5 candles state
  const [candles, setCandles] = useState([true, true, true, true, true]);
  const [wishMade, setWishMade] = useState(false);
  const [screenFlash, setScreenFlash] = useState(false);

  const areAllBlown = candles.every((c) => !c);

  const blowAllCandles = () => {
    if (areAllBlown) return;

    audioEngine.playBlowSound();
    setCandles([false, false, false, false, false]);
    setWishMade(true);

    // Screen flash
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 500);

    // Blast celebratory confetti
    setTimeout(() => {
      launchCandleBlownConfetti();
    }, 250);
  };

  const blowSingleCandle = (index) => {
    if (!candles[index]) return;
    audioEngine.playBlowSound();

    const updated = [...candles];
    updated[index] = false;
    setCandles(updated);

    if (updated.every((c) => !c)) {
      setWishMade(true);
      setScreenFlash(true);
      setTimeout(() => setScreenFlash(false), 500);
      setTimeout(() => launchCandleBlownConfetti(), 250);
    }
  };

  const relightCandles = () => {
    audioEngine.playSparkleSound();
    setCandles([true, true, true, true, true]);
    setWishMade(false);
  };

  // Candle positioning data
  const candleConfigs = [
    { x: 50, y: 35, height: 26, color: '#f43f5e' },
    { x: 75, y: 28, height: 32, color: '#ec4899' },
    { x: 100, y: 22, height: 38, color: '#eab308' }, // center tall
    { x: 125, y: 28, height: 32, color: '#a855f7' },
    { x: 150, y: 35, height: 26, color: '#38bdf8' },
  ];

  return (
    <section id="cake" className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Golden Screen Flash when wish is made */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-gradient-to-tr from-amber-300 via-pink-300 to-white pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
      >
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs tracking-wider uppercase font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Moment</span>
        </div>

        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          {BIRTHDAY_CONFIG.cake.title}
        </h2>

        <p className="text-pink-200/80 text-sm sm:text-base max-w-md mx-auto mb-8 font-light">
          Close your eyes, think of your deepest wish, and blow out the candles! You can tap each candle or blow them all at once.
        </p>

        {/* Wish Made Reveal Announcement */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="mb-6 px-6 py-3 rounded-2xl glass-panel-glow border-2 border-amber-300/60 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/30 text-amber-100 font-bold text-lg sm:text-xl shadow-[0_0_35px_rgba(251,191,36,0.4)]"
            >
              {BIRTHDAY_CONFIG.cake.wishMadeText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Cake Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center my-2">
          {/* Cake Glow */}
          <div
            className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 -z-10 ${
              areAllBlown ? 'bg-purple-900/20' : 'bg-amber-400/20 shadow-[0_0_80px_rgba(251,191,36,0.3)]'
            }`}
          />

          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl overflow-visible">
            {/* Cake Pedestal */}
            <ellipse cx="100" cy="182" rx="85" ry="12" fill="#ffffff" opacity="0.15" />
            <path d="M 40 180 Q 100 196 160 180 L 148 194 Q 100 204 52 194 Z" fill="url(#pedestalGrad)" />

            {/* Bottom Tier */}
            <rect x="30" y="128" width="140" height="52" rx="10" fill="url(#cakeDarkRose)" />
            {/* Bottom Tier Frosting Swags */}
            <path
              d="M 30 128 Q 44 144 58 128 Q 72 144 86 128 Q 100 144 114 128 Q 128 144 142 128 Q 156 144 170 128 L 170 124 L 30 124 Z"
              fill="#fb7185"
            />

            {/* Middle Tier */}
            <rect x="46" y="86" width="108" height="42" rx="8" fill="url(#cakeViolet)" />
            {/* Middle Tier Frosting Swags */}
            <path
              d="M 46 86 Q 60 100 74 86 Q 88 100 102 86 Q 116 100 130 86 Q 144 100 154 86 L 154 82 L 46 82 Z"
              fill="#f472b6"
            />

            {/* Top Tier */}
            <rect x="62" y="52" width="76" height="34" rx="7" fill="url(#cakeGold)" />
            {/* Top Tier Frosting Cream */}
            <path
              d="M 62 52 Q 74 64 86 52 Q 98 64 110 52 Q 122 64 138 52 L 138 49 L 62 49 Z"
              fill="#fed7aa"
            />

            {/* Decorative Pearls & Hearts on cake */}
            <circle cx="50" cy="150" r="2.5" fill="#fde047" />
            <circle cx="75" cy="155" r="2.5" fill="#f43f5e" />
            <circle cx="100" cy="150" r="2.5" fill="#fde047" />
            <circle cx="125" cy="155" r="2.5" fill="#38bdf8" />
            <circle cx="150" cy="150" r="2.5" fill="#fde047" />

            <circle cx="65" cy="106" r="2" fill="#fed7aa" />
            <circle cx="100" cy="108" r="2" fill="#ffffff" />
            <circle cx="135" cy="106" r="2" fill="#fed7aa" />

            {/* 5 Animated Candles */}
            {candleConfigs.map((candle, i) => {
              const isLit = candles[i];
              const candleTop = 52 - candle.height;
              const wickTop = candleTop - 5;

              return (
                <g
                  key={i}
                  className="cursor-pointer group"
                  onClick={() => blowSingleCandle(i)}
                  title={isLit ? 'Click to blow out this candle 🕯️' : 'Extinguished'}
                >
                  {/* Candle Wax Body */}
                  <rect
                    x={candle.x - 3.5}
                    y={candleTop}
                    width="7"
                    height={candle.height}
                    rx="2"
                    fill={candle.color}
                  />

                  {/* Wick */}
                  <line
                    x1={candle.x}
                    y1={candleTop}
                    x2={candle.x}
                    y2={wickTop}
                    stroke="#27272a"
                    strokeWidth="1.5"
                  />

                  {/* Flame or Smoke */}
                  {isLit ? (
                    <g
                      className="animate-flame"
                      style={{
                        transformOrigin: `${candle.x}px ${wickTop}px`,
                        animationDelay: `${i * 0.25}s`,
                      }}
                    >
                      {/* Outer flame */}
                      <ellipse
                        cx={candle.x}
                        cy={wickTop - 8}
                        rx="4.5"
                        ry="8"
                        fill="#ff7043"
                      />
                      {/* Inner core */}
                      <ellipse
                        cx={candle.x}
                        cy={wickTop - 7}
                        rx="2.5"
                        ry="5"
                        fill="#fef08a"
                      />
                    </g>
                  ) : (
                    /* Smoke wisps rising */
                    <g className="animate-smoke" style={{ transformOrigin: `${candle.x}px ${wickTop}px` }}>
                      <path
                        d={`M ${candle.x} ${wickTop} Q ${candle.x - 4} ${wickTop - 12}, ${candle.x + 3} ${wickTop - 24} T ${candle.x} ${wickTop - 36}`}
                        fill="none"
                        stroke="rgba(220, 220, 240, 0.7)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </g>
                  )}
                </g>
              );
            })}

            <defs>
              <linearGradient id="pedestalGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4c1d95" />
                <stop offset="50%" stopColor="#831843" />
                <stop offset="100%" stopColor="#4c1d95" />
              </linearGradient>
              <linearGradient id="cakeDarkRose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4c0519" />
              </linearGradient>
              <linearGradient id="cakeViolet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#581c87" />
                <stop offset="100%" stopColor="#2e1065" />
              </linearGradient>
              <linearGradient id="cakeGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9a3412" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Action Controls */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {!areAllBlown ? (
            <motion.button
              onClick={blowAllCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 font-semibold text-lg text-white shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Wind className="w-5 h-5 text-amber-200" />
              <span>{BIRTHDAY_CONFIG.cake.buttonBlow}</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={relightCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 font-semibold text-lg text-white shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center gap-2 cursor-pointer transition-all"
            >
              <Flame className="w-5 h-5 text-amber-300" />
              <span>{BIRTHDAY_CONFIG.cake.buttonRelight}</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
