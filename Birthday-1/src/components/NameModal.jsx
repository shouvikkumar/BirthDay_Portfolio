import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESETS = ['Sarah', 'Emma', 'Jessica', 'Sophie', 'Alex', 'Sweetheart', 'Bestie'];

export default function NameModal({ isOpen, onClose, currentName, onSaveName }) {
  const [tempName, setTempName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      onSaveName(tempName.trim());
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
      });
      onClose();
    }
  };

  const handleSelectPreset = (name) => {
    setTempName(name);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-md w-full glass-panel-glow rounded-3xl p-6 sm:p-8 border border-pink-400/40 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-pink-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Personalize The Celebration</h3>
            <p className="text-xs sm:text-sm text-pink-200/70 mt-1">
              Change the birthday person's name across the entire experience.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-pink-300 mb-1.5">
                Birthday Person's Name
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter name (e.g. Sarah)"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-pink-300/40 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/30 text-lg font-medium"
                autoFocus
              />
            </div>

            {/* Quick Suggestions */}
            <div>
              <span className="block text-xs text-pink-300/60 mb-2">Quick suggestions:</span>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSelectPreset(p)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                      tempName === p
                        ? 'bg-pink-500 text-white shadow-md'
                        : 'bg-white/10 text-pink-200 hover:bg-white/20'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-pink-300 text-sm hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-sm font-semibold shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Update Experience</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
