import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SparkleCursor() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    let counter = 0;
    const addSparkle = (x, y) => {
      counter++;
      if (counter % 3 !== 0) return; // throttle

      const id = Date.now() + Math.random();
      const shapes = ['✨', '⭐', '💖', '💫', '✦'];
      const colors = ['#f472b6', '#fbbf24', '#c084fc', '#38bdf8', '#ffffff'];

      setSparkles((prev) => [
        ...prev.slice(-12), // keep maximum 12 concurrent sparkles
        {
          id,
          x: x + (Math.random() - 0.5) * 16,
          y: y + (Math.random() - 0.5) * 16,
          char: shapes[Math.floor(Math.random() * shapes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.floor(Math.random() * 8) + 12,
        },
      ]);
    };

    const handleMouseMove = (e) => {
      addSparkle(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, scale: 0.6, x: s.x - 10, y: s.y - 10 }}
            animate={{
              opacity: 0,
              scale: 1.3,
              y: s.y - 25,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute select-none pointer-events-none"
            style={{
              color: s.color,
              fontSize: `${s.size}px`,
              filter: `drop-shadow(0 0 6px ${s.color})`,
            }}
          >
            {s.char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
