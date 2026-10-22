import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { Heart, RotateCcw, Sparkles, Feather } from 'lucide-react';

export default function MessageSection() {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const fullMessage = BIRTHDAY_CONFIG.messageSection.message;
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView && !isTyping && displayedText.length === 0) {
      startTyping();
    }
  }, [isInView]);

  const startTyping = () => {
    setDisplayedText('');
    setIsDone(false);
    setIsTyping(true);

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setDisplayedText(fullMessage.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsDone(true);
        setIsTyping(false);
      }
    }, 28); // gentle cadence
  };

  const handleShowInstant = () => {
    setDisplayedText(fullMessage);
    setIsDone(true);
    setIsTyping(false);
  };

  return (
    <section
      id="message"
      ref={containerRef}
      className="relative py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700/20 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl w-full"
      >
        {/* Section title badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs tracking-wider uppercase font-semibold">
            <Feather className="w-3.5 h-3.5 text-pink-300" />
            <span>Heartfelt Note</span>
          </span>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-pink-400/20 text-2xl font-serif-display select-none">❧</div>
          <div className="absolute top-4 right-4 text-pink-400/20 text-2xl font-serif-display select-none rotate-90">❧</div>
          <div className="absolute bottom-4 left-4 text-pink-400/20 text-2xl font-serif-display select-none -rotate-90">❧</div>
          <div className="absolute bottom-4 right-4 text-pink-400/20 text-2xl font-serif-display select-none rotate-180">❧</div>

          {/* Card Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-display text-white tracking-wide">
              {BIRTHDAY_CONFIG.messageSection.title}
            </h2>
            <div className="w-24 h-0.5 mx-auto mt-3 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
          </div>

          {/* Typewriter text container */}
          <div className="min-h-[170px] sm:min-h-[150px] relative">
            <p className="text-base sm:text-lg md:text-xl text-pink-100/90 leading-relaxed font-light tracking-wide text-center sm:text-left selection:bg-pink-500/30">
              {displayedText}
              {!isDone && (
                <span className="inline-block w-2 h-5 ml-1 bg-pink-400 animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* Wax Seal / Signature & Controls */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Romantic Signature badge */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-lg border border-white/30">
                <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-pink-300/70 font-medium">With Endless Love</span>
                <span className="font-script text-xl text-amber-200">Forever & Always</span>
              </div>
            </div>

            {/* Replay / Instant actions */}
            <div className="flex items-center gap-2">
              {isTyping && (
                <button
                  onClick={handleShowInstant}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-medium transition cursor-pointer"
                >
                  Skip
                </button>
              )}
              <button
                onClick={startTyping}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/30 text-pink-200 text-xs font-medium transition cursor-pointer"
                title="Replay typewriter animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
