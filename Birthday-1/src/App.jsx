import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { DEFAULT_NAME } from './config/birthdayData';
import OpeningScreen from './components/OpeningScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MessageSection from './components/MessageSection';
import PhotoGallery from './components/PhotoGallery';
import InteractiveCake from './components/InteractiveCake';
import ReasonsSection from './components/ReasonsSection';
import CountdownSection from './components/CountdownSection';
import FinalSurprise from './components/FinalSurprise';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';
import FloatingBalloons from './components/FloatingBalloons';
import SparkleCursor from './components/SparkleCursor';
import NameModal from './components/NameModal';

export default function App() {
  const [opened, setOpened] = useState(false);
  const [name, setName] = useState(DEFAULT_NAME);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);

  // Sync document title with active name
  useEffect(() => {
    document.title = `🎂 Happy Birthday, ${name}! 🎉 A Magical Celebration`;
  }, [name]);

  const handleOpenSurprise = () => {
    setOpened(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0819] text-pink-100 selection:bg-pink-500/30 selection:text-pink-100 overflow-x-hidden font-sans">
      {/* Interactive Cursor Fairy Dust */}
      <SparkleCursor />

      {/* Opening Fullscreen Screen Gate */}
      <AnimatePresence>
        {!opened && (
          <OpeningScreen onOpen={handleOpenSurprise} name={name} />
        )}
      </AnimatePresence>

      {/* Main Experience content (rendered behind curtain for instant smooth reveal) */}
      <div className={`transition-opacity duration-1000 ${opened ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Ambient Particle Dust */}
        <ParticleBackground />

        {/* Floating Background Balloons with Pop interaction */}
        <FloatingBalloons />

        {/* Floating Top Navigation & Audio Control */}
        <Navbar name={name} onEditName={() => setIsNameModalOpen(true)} />

        <main className="relative z-20">
          {/* Hero Section */}
          <HeroSection name={name} />

          {/* Birthday Message Section */}
          <MessageSection />

          {/* Memory / Photo Gallery Section */}
          <PhotoGallery />

          {/* Interactive Birthday Cake Section */}
          <InteractiveCake />

          {/* Reasons You're Special Section */}
          <ReasonsSection />

          {/* Countdown Section */}
          <CountdownSection />

          {/* Final Surprise Section */}
          <FinalSurprise name={name} />
        </main>

        {/* Footer */}
        <Footer name={name} />

        {/* Name Customization Modal */}
        <NameModal
          isOpen={isNameModalOpen}
          onClose={() => setIsNameModalOpen(false)}
          currentName={name}
          onSaveName={(newName) => setName(newName)}
        />
      </div>
    </div>
  );
}
