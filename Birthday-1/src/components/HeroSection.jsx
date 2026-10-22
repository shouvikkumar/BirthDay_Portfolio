import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { launchCelebrationConfetti, launchHeartShower } from '../utils/confetti';
import { Sparkles, Heart, ChevronDown, PartyPopper } from 'lucide-react';

export default function HeroSection({ name }) {
  const handleCelebrateClick = () => {
    launchCelebrationConfetti();
    launchHeartShower();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] md:w-[680px] h-[340px] md:h-[680px] bg-gradient-to-tr from-pink-500/20 via-purple-600/15 to-transparent rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Sparkles & Hearts around hero */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/40 text-xl md:text-2xl"
            style={{
              top: `${15 + (i * 7)}%`,
              left: `${8 + ((i * 17) % 84)}%`,
            }}
            animate={{
              y: [0, -18, 0],
              opacity: [0.3, 0.9, 0.3],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '💖' : '⭐'}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Floating Mini Pill */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/30 text-pink-200 text-xs md:text-sm font-medium mb-6 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>It's a Golden Milestone</span>
          <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
        </motion.div>

        {/* Large Animated Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-4 drop-shadow-2xl">
          <span className="block text-white/95">🎂 Happy Birthday,</span>
          <span className="block mt-2 font-script text-5xl sm:text-7xl md:text-8xl lg:text-9xl animate-gradient-text tracking-normal drop-shadow-[0_0_35px_rgba(236,72,153,0.5)]">
            {name}! 🎉
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-2xl md:text-3xl font-light text-pink-200/90 max-w-2xl mx-auto mt-2 mb-10 flex items-center justify-center gap-2"
        >
          <span>{BIRTHDAY_CONFIG.hero.subtitle}</span>
        </motion.p>

        {/* Centerpiece: Animated Birthday Cake Illustration with Flickering Candles */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, type: 'spring' }}
          className="relative my-4 cursor-pointer group"
          onClick={handleCelebrateClick}
          whileHover={{ scale: 1.04 }}
          title="Click the cake to throw confetti! 🎂"
        >
          {/* Cake Glow Aura */}
          <div className="absolute inset-0 bg-pink-500/25 rounded-full blur-3xl -z-10 group-hover:bg-pink-500/40 transition-all duration-500" />

          {/* SVG Animated Cake */}
          <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Plate / Stand */}
              <ellipse cx="100" cy="175" rx="80" ry="14" fill="#ffffff" opacity="0.2" />
              <ellipse cx="100" cy="172" rx="74" ry="11" fill="url(#plateGrad)" />
              <path d="M 60 172 Q 100 188 140 172 L 132 186 Q 100 196 68 186 Z" fill="#6d28d9" opacity="0.6" />

              {/* Bottom Cake Layer */}
              <rect x="42" y="120" width="116" height="48" rx="8" fill="url(#cakeBase)" />
              {/* Bottom frosting drips */}
              <path
                d="M 42 120 Q 52 135 62 120 Q 72 138 82 120 Q 92 134 102 120 Q 112 136 122 120 Q 132 135 142 120 Q 152 132 158 120 L 158 116 L 42 116 Z"
                fill="url(#frostingPink)"
              />

              {/* Middle Cake Layer */}
              <rect x="56" y="82" width="88" height="38" rx="7" fill="url(#cakeMiddle)" />
              {/* Middle frosting drips */}
              <path
                d="M 56 82 Q 67 96 78 82 Q 89 97 100 82 Q 111 96 122 82 Q 133 97 144 82 L 144 79 L 56 79 Z"
                fill="url(#frostingCream)"
              />

              {/* Top Cake Layer */}
              <rect x="70" y="52" width="60" height="30" rx="6" fill="url(#cakeTop)" />
              {/* Top frosting drips */}
              <path
                d="M 70 52 Q 80 62 90 52 Q 100 64 110 52 Q 120 62 130 52 L 130 50 L 70 50 Z"
                fill="url(#frostingPink)"
              />

              {/* Colorful Sprinkles on layers */}
              <circle cx="58" cy="135" r="2" fill="#ffd700" />
              <circle cx="85" cy="142" r="2" fill="#38bdf8" />
              <circle cx="115" cy="138" r="2" fill="#f43f5e" />
              <circle cx="140" cy="144" r="2" fill="#a855f7" />
              <circle cx="75" cy="98" r="1.8" fill="#ffd700" />
              <circle cx="102" cy="102" r="1.8" fill="#ec4899" />
              <circle cx="125" cy="96" r="1.8" fill="#38bdf8" />

              {/* Candles */}
              {/* Candle 1 (Left) */}
              <rect x="77" y="32" width="6" height="20" rx="2" fill="url(#candleGrad1)" />
              <line x1="80" y1="32" x2="80" y2="27" stroke="#333" strokeWidth="1.5" />
              <g className="animate-flame origin-bottom" style={{ transformOrigin: '80px 27px' }}>
                <ellipse cx="80" cy="22" rx="4.5" ry="7.5" fill="#ff7043" />
                <ellipse cx="80" cy="23" rx="2.5" ry="4.5" fill="#ffeb3b" />
              </g>

              {/* Candle 2 (Center - Tall) */}
              <rect x="97" y="26" width="6" height="26" rx="2" fill="url(#candleGrad2)" />
              <line x1="100" y1="26" x2="100" y2="20" stroke="#333" strokeWidth="1.5" />
              <g className="animate-flame origin-bottom" style={{ transformOrigin: '100px 20px', animationDelay: '0.3s' }}>
                <ellipse cx="100" cy="15" rx="5" ry="8.5" fill="#ff7043" />
                <ellipse cx="100" cy="16" rx="3" ry="5.5" fill="#fff59d" />
              </g>

              {/* Candle 3 (Right) */}
              <rect x="117" y="32" width="6" height="20" rx="2" fill="url(#candleGrad1)" />
              <line x1="120" y1="32" x2="120" y2="27" stroke="#333" strokeWidth="1.5" />
              <g className="animate-flame origin-bottom" style={{ transformOrigin: '120px 27px', animationDelay: '0.6s' }}>
                <ellipse cx="120" cy="22" rx="4.5" ry="7.5" fill="#ff7043" />
                <ellipse cx="120" cy="23" rx="2.5" ry="4.5" fill="#ffeb3b" />
              </g>

              {/* Gradients */}
              <defs>
                <linearGradient id="plateGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="50%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="cakeBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#831843" />
                  <stop offset="100%" stopColor="#500724" />
                </linearGradient>
                <linearGradient id="cakeMiddle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#701a75" />
                  <stop offset="100%" stopColor="#4a044e" />
                </linearGradient>
                <linearGradient id="cakeTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9d174d" />
                  <stop offset="100%" stopColor="#581c87" />
                </linearGradient>
                <linearGradient id="frostingPink" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="frostingCream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fed7aa" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <linearGradient id="candleGrad1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#fda4af" />
                </linearGradient>
                <linearGradient id="candleGrad2" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#fef08a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <span className="inline-block mt-1 text-xs text-pink-300/80 font-medium tracking-wider group-hover:text-pink-200 transition-colors">
            Tap cake for magic confetti ✨
          </span>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <motion.button
            onClick={handleCelebrateClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:shadow-[0_0_35px_rgba(236,72,153,0.65)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <span>Celebrate Now! 🎉</span>
          </motion.button>

          <a
            href="#message"
            className="px-7 py-3.5 rounded-full glass-panel hover:bg-white/15 border border-pink-400/30 text-pink-100 font-medium transition flex items-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-pink-400 fill-current" />
            <span>Read Birthday Letter</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-14"
        >
          <a
            href="#message"
            className="flex flex-col items-center gap-1 text-xs text-pink-300/60 hover:text-pink-200 transition-colors"
          >
            <span>Scroll for magic</span>
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
