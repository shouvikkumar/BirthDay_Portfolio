import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { Heart, ArrowUp } from 'lucide-react';

export default function Footer({ name }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 px-4 border-t border-white/10 bg-[#070510] overflow-hidden text-center">
      {/* Animated Floating Hearts around footer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/30 text-lg sm:text-2xl"
            style={{
              bottom: '-20px',
              left: `${5 + (i * 7)}%`,
            }}
            animate={{
              y: [0, -120],
              x: [0, (i % 2 === 0 ? 20 : -20), 0],
              opacity: [0, 0.7, 0],
              scale: [0.6, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + (i % 3) * 1.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-pink-200 transition-all cursor-pointer hover:-translate-y-1 shadow-lg"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Footer text required by prompt */}
        <p className="text-base sm:text-lg text-pink-200/90 font-light max-w-md">
          {BIRTHDAY_CONFIG.footer.message}
        </p>

        {/* Celebrant dedication */}
        <div className="text-xs text-pink-400/60 tracking-wider uppercase font-medium">
          Dedicated with joy to <span className="text-pink-300 font-semibold">{name}</span> • Forever Cherished
        </div>
      </div>
    </footer>
  );
}
