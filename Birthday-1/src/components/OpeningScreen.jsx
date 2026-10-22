import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { launchCelebrationConfetti, launchHeartShower } from '../utils/confetti';
import { audioEngine } from '../utils/audio';
import { Sparkles, Gift, Heart, Stars } from 'lucide-react';

export default function OpeningScreen({ onOpen, name }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Audio fanfare & start background music
    audioEngine.playFanfare();
    audioEngine.startMusic();

    // Confetti and celebratory heart shower
    launchCelebrationConfetti();
    launchHeartShower();

    // Smooth exit delay to let the initial animation bloom
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0819] via-[#160b2b] to-[#250d3a] px-4"
    >
      {/* Ambient background glowing orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating stars in opening curtain */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 14 + 10}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-lg w-full text-center flex flex-col items-center"
      >
        {/* Animated Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-pink-400/30 text-pink-200 text-sm md:text-base font-medium shadow-[0_0_25px_rgba(244,114,182,0.25)] mb-8"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>{BIRTHDAY_CONFIG.opening.badge}</span>
          <Stars className="w-4 h-4 text-pink-300" />
        </motion.div>

        {/* Floating Animated Gift Box Visual */}
        <motion.div
          className="relative mb-10 cursor-pointer"
          onClick={handleOpenClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(244,114,182,0.5)] border border-white/20 relative group">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-3xl bg-pink-500/30 animate-ping opacity-50" />

            <motion.div
              animate={
                isOpening
                  ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.3, 1.5] }
                  : { rotate: [0, -5, 5, 0] }
              }
              transition={
                isOpening
                  ? { duration: 0.6 }
                  : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <Gift className="w-16 h-16 md:w-20 md:h-20 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
            </motion.div>

            {/* Sparkle badge on corner */}
            <div className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-lg font-bold">
              ✨
            </div>
          </div>
        </motion.div>

        {/* Name teaser */}
        <h2 className="text-xl md:text-2xl text-pink-200/90 font-light tracking-wide mb-3">
          Specially crafted for{' '}
          <span className="font-semibold text-white underline decoration-pink-400 decoration-wavy decoration-2">
            {name}
          </span>
        </h2>

        {/* Instruction subtext */}
        <p className="text-sm md:text-base text-pink-300/70 mb-8 max-w-sm">
          A world of wishes, memories, and celebration has been prepared just for you. Turn up your volume for the full magic!
        </p>

        {/* Animated Open Button */}
        <motion.button
          onClick={handleOpenClick}
          disabled={isOpening}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-8 py-4 rounded-full font-semibold text-lg md:text-xl text-white shadow-2xl overflow-hidden cursor-pointer transition-all duration-300"
        >
          {/* Shimmering gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 group-hover:from-pink-400 group-hover:via-purple-400 group-hover:to-amber-300 transition-all duration-500 animate-pulse-glow" />

          {/* Glint effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          {/* Button content */}
          <span className="relative z-10 flex items-center justify-center gap-3">
            {isOpening ? (
              <>
                <Sparkles className="w-6 h-6 animate-spin" />
                <span>Unwrapping Magic...</span>
              </>
            ) : (
              <>
                <span>{BIRTHDAY_CONFIG.opening.buttonText}</span>
                <Heart className="w-5 h-5 text-rose-200 fill-current animate-bounce" />
              </>
            )}
          </span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
