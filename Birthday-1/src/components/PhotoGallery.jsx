import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_CONFIG } from '../config/birthdayData';
import { X, ChevronLeft, ChevronRight, Heart, Maximize2, Upload, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PhotoGallery() {
  const [photos, setPhotos] = useState(BIRTHDAY_CONFIG.memories);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  const [likedPhotos, setLikedPhotos] = useState({});

  const activePhoto = activePhotoIndex !== null ? photos[activePhotoIndex] : null;

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, photos.length]);

  const handleNext = () => {
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleToggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setLikedPhotos((prev) => {
      const isLiked = !prev[id];
      if (isLiked) {
        confetti({
          particleCount: 20,
          spread: 45,
          origin: { y: 0.6 },
          colors: ['#ff4d6d', '#ff758f', '#ffd700'],
        });
      }
      return { ...prev, [id]: isLiked };
    });
  };

  // Optional custom photo upload
  const handlePhotoUpload = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhotos((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], url: imageUrl };
        return updated;
      });
    }
  };

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-pink-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

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
          <span>Treasured Chapters</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          ✨ Beautiful Memories ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-pink-200/70 text-base sm:text-lg max-w-xl mx-auto mt-3 font-light"
        >
          Every smile, every laugh, and every quiet moment we hold deep in our hearts. Click any photo to view in full splendour.
        </motion.p>
      </div>

      {/* 6 Grid Photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative rounded-3xl overflow-hidden glass-panel border border-white/15 p-3 hover:border-pink-400/40 transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(236,72,153,0.25)] flex flex-col cursor-pointer"
            onClick={() => setActivePhotoIndex(index)}
          >
            {/* Image Frame */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-purple-950/40">
              <img
                src={item.url}
                alt={item.caption}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Top tag badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-medium text-pink-200">
                {item.tag}
              </div>

              {/* Zoom pill indicator */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Change/Upload Photo button on hover */}
              <label
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/30 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Change this photo"
                onClick={(e) => e.stopPropagation()}
              >
                <Upload className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoUpload(e, index)}
                />
              </label>
            </div>

            {/* Caption & Footer */}
            <div className="pt-4 pb-2 px-2 flex items-center justify-between">
              <div>
                <h3 className="font-medium text-base sm:text-lg text-white group-hover:text-pink-200 transition-colors">
                  {item.caption}
                </h3>
                <span className="text-xs text-pink-300/60 font-light">{item.date}</span>
              </div>

              {/* Heart like button */}
              <button
                onClick={(e) => handleToggleLike(item.id, e)}
                className={`p-2 rounded-full transition-transform active:scale-125 ${
                  likedPhotos[item.id]
                    ? 'text-rose-500 fill-current'
                    : 'text-pink-300/40 hover:text-rose-400'
                }`}
                title="Like memory"
              >
                <Heart className={`w-5 h-5 ${likedPhotos[item.id] ? 'fill-current' : ''}`} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActivePhotoIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActivePhotoIndex(null)}
              className="absolute top-5 right-5 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <motion.div
              key={activePhoto.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 max-h-[70vh]">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain max-h-[70vh] rounded-2xl"
                />
              </div>

              {/* Lightbox Caption Card */}
              <div className="mt-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 text-center">
                <span className="text-white font-medium text-lg">{activePhoto.caption}</span>
                <button
                  onClick={() => handleToggleLike(activePhoto.id)}
                  className={`p-1.5 rounded-full ${
                    likedPhotos[activePhoto.id] ? 'text-rose-500 fill-current' : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${likedPhotos[activePhoto.id] ? 'fill-current' : ''}`} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
