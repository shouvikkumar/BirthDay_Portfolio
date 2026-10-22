import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { Clock } from 'lucide-react';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const configuredDate = BIRTHDAY_CONFIG.targetDate;
      let target = new Date(
        now.getFullYear(),
        configuredDate.getMonth(),
        configuredDate.getDate(),
        configuredDate.getHours(),
        configuredDate.getMinutes(),
        configuredDate.getSeconds(),
        configuredDate.getMilliseconds(),
      );

      if (target <= now) {
        target.setFullYear(target.getFullYear() + 1);
      }

      const difference = target.getTime() - now.getTime();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: 'from-pink-500 to-rose-500' },
    { label: 'Hours', value: timeLeft.hours, color: 'from-purple-500 to-fuchsia-500' },
    { label: 'Minutes', value: timeLeft.minutes, color: 'from-indigo-500 to-cyan-500' },
    { label: 'Seconds', value: timeLeft.seconds, color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <section className="relative py-20 px-4 max-w-5xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-panel-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden"
      >
        {/* Header badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs tracking-wider uppercase font-semibold mb-4">
          <Clock className="w-3.5 h-3.5 text-amber-300" />
          <span>Every Second Counts</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {BIRTHDAY_CONFIG.countdown.title}
        </h2>

        <p className="text-pink-200/70 text-sm sm:text-base max-w-md mx-auto mb-10 font-light">
          Celebrating 365 brand new days of laughter, blessings, and breathtaking memories.
        </p>

        {/* 4 Time Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {timeUnits.map((unit, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl glass-panel border border-white/15 p-4 sm:p-6 flex flex-col items-center justify-center shadow-lg group hover:border-pink-400/40 transition-colors"
            >
              {/* Inner Glow */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${unit.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Animated Number with Keyed AnimatePresence */}
              <div className="relative h-14 sm:h-18 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-pink-300/80 mt-2">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
