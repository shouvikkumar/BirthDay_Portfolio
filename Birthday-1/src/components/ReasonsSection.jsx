import React from 'react';
import { motion } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReasonsSection() {
  const handleCardClick = (e, color) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 18,
      spread: 50,
      origin: { x, y },
      scalar: 0.9,
    });
  };

  return (
    <section id="reasons" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background glow blooms */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-pink-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs tracking-wider uppercase font-semibold mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Little Things We Adore</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          💖 Why You're So Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-pink-200/70 text-base sm:text-lg max-w-xl mx-auto mt-3 font-light"
        >
          Out of a billion stars in the sky, you shine with a light that is entirely your own.
        </motion.p>
      </div>

      {/* 6 Animated Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BIRTHDAY_CONFIG.reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={(e) => handleCardClick(e, item.color)}
            className={`group relative rounded-3xl p-7 glass-panel-glow border ${item.border} hover:border-pink-300/60 transition-all duration-500 shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between`}
          >
            {/* Top Glowing Gradient Accent */}
            <div
              className={`absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${item.color} blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none`}
            />

            <div>
              {/* Icon Container with Floating Animation */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300">
                <span>{item.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-pink-200 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-pink-100/80 text-sm sm:text-base leading-relaxed font-light">
                {item.description}
              </p>
            </div>

            {/* Bottom mini indicator */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-pink-300/60 font-medium">
              <span>Touch of love</span>
              <Heart className="w-4 h-4 text-pink-400 group-hover:text-rose-400 group-hover:fill-current transition-colors" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
