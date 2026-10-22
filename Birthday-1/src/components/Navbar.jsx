import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Edit3, Music, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export default function Navbar({ name, onEditName }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Sync state with audio engine
    const checkState = () => {
      setIsPlaying(audioEngine.isPlaying);
      setIsMuted(audioEngine.isMuted);
    };
    checkState();
    const interval = setInterval(checkState, 800);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    const active = audioEngine.toggleMusic();
    setIsPlaying(active);
  };

  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-3 md:px-8 flex justify-center pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-2 md:gap-6 px-4 py-2.5 rounded-full glass-panel-glow max-w-4xl w-full shadow-2xl backdrop-blur-xl transition-all">
        {/* Brand / Name badge */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-sm shadow-md">
            🎂
          </div>
          <span className="font-semibold text-sm md:text-base tracking-wide bg-gradient-to-r from-pink-200 to-amber-200 bg-clip-text text-transparent truncate max-w-[120px] md:max-w-none">
            {name}'s Day
          </span>
        </div>

        {/* Navigation jump pills (desktop/tablet) */}
        <div className="hidden lg:flex items-center gap-5 text-xs tracking-wider uppercase font-medium text-pink-200/70">
          <a href="#hero" className="hover:text-pink-300 transition-colors">Celebration</a>
          <a href="#message" className="hover:text-pink-300 transition-colors">Letter</a>
          <a href="#memories" className="hover:text-pink-300 transition-colors">Memories</a>
          <a href="#cake" className="hover:text-pink-300 transition-colors">Cake & Wish</a>
          <a href="#reasons" className="hover:text-pink-300 transition-colors">Special</a>
          <a href="#surprise" className="hover:text-amber-300 text-amber-200/90 font-bold transition-colors">Surprise ✨</a>
        </div>

        {/* Action Controls: Music + Name Customizer */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Quick Name Change Pill */}
          <button
            onClick={onEditName}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-pink-100 text-xs font-medium transition cursor-pointer"
            title="Edit birthday person's name"
          >
            <Edit3 className="w-3.5 h-3.5 text-pink-300" />
            <span className="hidden sm:inline">Name</span>
          </button>

          {/* Music Play/Pause */}
          <button
            onClick={handleTogglePlay}
            className={`p-2 rounded-full border transition cursor-pointer flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-pink-500/20 border-pink-400/40 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                : 'bg-white/10 border-white/15 text-pink-300/70 hover:bg-white/20'
            }`}
            title={isPlaying ? 'Pause music' : 'Play celestial birthday tune'}
            aria-label="Toggle Music"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                {/* Visualizer bars */}
                <span className="flex items-end gap-0.5 h-3.5 px-0.5">
                  <span className="w-0.5 h-2 bg-pink-400 animate-pulse" />
                  <span className="w-0.5 h-3.5 bg-amber-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 h-1.5 bg-purple-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </span>
              </>
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-pink-200 transition cursor-pointer"
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
            aria-label="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-300" /> : <Volume2 className="w-3.5 h-3.5 text-pink-300" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
