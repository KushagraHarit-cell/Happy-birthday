'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, Heart, ArrowLeft } from 'lucide-react';
import { OPEN_WHEN_LETTERS } from '@/config/content';

export default function Chapter2() {
  const [isOpen, setIsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);

  // Handwritten letter content
  const letterTitle = "My Dearest,";
  const letterBody = `I wanted to write you something that you could keep forever. In this fast, digital world, my feelings for you remain steady, deep, and true. 

You are the first thing on my mind when I wake up and the last when I drift off to sleep. Every day I spend with you is a new favorite day of mine. You've brought a light into my life that I never knew existed, and I am endlessly grateful for your warmth, your kindness, and your love.

This is a little letter from my soul to yours. Thank you for being you. Thank you for loving me. 

With all my heart,
Your Favorite Person 💖`;

  const toggleEnvelope = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => setIsRead(true), 1200);
    }
  };

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 relative z-10 flex flex-col items-center">
      
      {/* Chapter Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ffd1dc]/10 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#ffd1dc]/10 text-[#ffd1dc] border border-[#ffd1dc]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter Two</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2d141c] font-serif mb-4 relative z-10">
          Written in the Stars
        </h1>
        <p className="text-[#5e3e47] max-w-md mx-auto text-sm sm:text-base font-light relative z-10">
          Click on the envelope to break the seal and unfold the letter inside.
        </p>
      </div>

      {/* Envelope Container */}
      <div className="relative w-full max-w-lg h-[450px] flex items-center justify-center">
        
        {/* ENVELOPE WIDGET */}
        <motion.div 
          layout
          onClick={toggleEnvelope}
          className={`relative cursor-pointer transition-all duration-500 ${
            isOpen ? 'scale-95' : 'hover:scale-105'
          }`}
          style={{ width: '380px', height: '240px' }}
        >
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#f0eaf5] rounded-2xl shadow-2xl border border-[#2d2242]" />

          {/* Letter Sheet (that slides out) */}
          <motion.div
            initial={{ y: 0, scale: 0.95, zIndex: 1 }}
            animate={{
              y: isOpen ? -180 : 0,
              scale: isOpen ? 1.05 : 0.95,
              zIndex: isOpen ? 25 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
              delay: isOpen ? 0.4 : 0,
            }}
            className="absolute left-6 right-6 bottom-4 top-4 bg-white rounded-xl shadow-xl p-8 text-[#5e3e47] border border-[#b794f4]/20 flex flex-col justify-between"
            onClick={(e) => {
              if (isOpen) {
                e.stopPropagation(); // prevent closing when clicking the letter
              }
            }}
          >
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="handwritten text-3xl text-[#ffd1dc] mb-4 border-b border-black/10 pb-2">
                {letterTitle}
              </h3>
              <p className="handwritten text-xl leading-relaxed text-[#2d141c] whitespace-pre-line tracking-wide opacity-90">
                {letterBody}
              </p>
            </div>
            <div className="text-right mt-4 font-sans uppercase tracking-[0.2em] text-[9px] text-[#9b8d90]">
              Swipe to scroll • Click envelope to close
            </div>
          </motion.div>

          {/* Top Flap (opens 180deg) */}
          <motion.div
            initial={{ rotateX: 0, zIndex: 15 }}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 5 : 15,
            }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ originY: 0 }}
            className="absolute top-0 left-0 right-0 h-[120px] bg-[#1f1b2c] rounded-t-2xl border-t border-[#312642] shadow-inner flex justify-center items-end"
          >
            {/* Triangular shape of the flap */}
            <div className="w-0 h-0 border-l-[190px] border-l-transparent border-r-[190px] border-r-transparent border-t-[120px] border-t-[#f0eaf5] absolute top-0" />
          </motion.div>

          {/* Side and Bottom Flaps */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
            {/* Left flap */}
            <div className="absolute top-0 bottom-0 left-0 w-0 h-0 border-t-[120px] border-t-transparent border-b-[120px] border-b-transparent border-l-[190px] border-l-[#e8ddef]" />
            
            {/* Right flap */}
            <div className="absolute top-0 bottom-0 right-0 w-0 h-0 border-t-[120px] border-t-transparent border-b-[120px] border-b-transparent border-r-[190px] border-r-[#e8ddef]" />
            
            {/* Bottom flap */}
            <div className="absolute bottom-0 left-0 right-0 h-0 border-l-[190px] border-l-transparent border-r-[190px] border-r-transparent border-b-[140px] border-b-[#e2d5ed]" />
          </div>

          {/* Wax Seal / Heart Button */}
          <motion.div
            animate={{
              scale: isOpen ? 0.8 : 1,
              opacity: isOpen ? 0 : 1,
              zIndex: 30,
            }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100px] left-[166px] w-12 h-12 rounded-full bg-[#b794f4] border border-[#a17be0] flex items-center justify-center shadow-[0_0_15px_rgba(183,148,244,0.4)] cursor-pointer hover:bg-[#a17be0] transition-colors"
          >
            <Heart className="w-5 h-5 fill-current text-[#111417] animate-pulse" />
          </motion.div>
        </motion.div>
      </div>

      {/* Instructions when read */}
      <AnimatePresence>
        {isRead && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center mt-10 text-xs text-[#ffd1dc] bg-white/80 backdrop-blur-md border border-[#ffd1dc]/20 rounded-xl px-5 py-3 shadow-lg uppercase tracking-wider font-semibold"
          >
            ✨ You can read and scroll the letter. Click outside it to seal the envelope back.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
