'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OPEN_WHEN_LETTERS } from '@/config/content';

export default function Chapter4() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-[20vh] px-4 md:px-12 relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-[20vh] text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-[var(--accent-gold)]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">Chapter 04</span>
          <span className="w-12 h-[1px] bg-[var(--accent-gold)]" />
        </div>
        <h2 className="font-serif text-[clamp(50px,8vw,120px)] leading-[0.9] font-light text-[var(--foreground)] tracking-tight mb-12">
          Little Surprises
        </h2>
        <p className="text-[var(--muted)] font-sans font-light max-w-lg mx-auto leading-[2] text-lg tracking-wide">
          A collection of sealed letters, waiting to be opened precisely when the moment calls for them.
        </p>
      </div>

      {/* Grid of Envelopes */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 p-4 perspective-[2000px] relative z-10">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -15, scale: 1.02, rotateX: 2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setActiveLetter(letter.id)}
            className="group cursor-view"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Envelope */}
            <div className="relative w-full aspect-[1.4/1] bg-[#F7F5F0] cinematic-shadow flex flex-col items-center justify-center border border-[var(--secondary)] transition-all duration-700">
              
              {/* Envelope Flap styling */}
              <svg className="absolute top-0 left-0 w-full h-[55%] pointer-events-none drop-shadow-sm opacity-50 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,0 50,100" fill="#F0ECE4" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
              </svg>
              
              {/* Wax Seal */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#7A1D1D] rounded-full flex items-center justify-center shadow-lg border-2 border-[#541212] z-20 transition-transform duration-500 group-hover:scale-110">
                <span className="text-[#F6F3EE] opacity-80 font-serif italic text-xl">A</span>
              </div>

              {/* Title on envelope */}
              <div className="absolute bottom-10 left-0 w-full text-center z-20 px-4">
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--foreground)] tracking-wide">{letter.title}</h3>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-2">
                  <span className="w-[1px] h-4 bg-[var(--accent-gold)]" />
                  <span className="text-[8px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-sans">Open</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Realistic Letter Modal */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-y-auto cursor-pointer no-cursor perspective-[2000px]"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              layoutId={`envelope-${activeLetter}`}
              initial={{ rotateX: 60, opacity: 0, y: 150, scale: 0.9 }}
              animate={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
              exit={{ rotateX: -60, opacity: 0, y: -150, scale: 0.9 }}
              transition={{ type: 'spring', damping: 30, stiffness: 150, mass: 1 }}
              className="bg-[#FBF9F5] cinematic-shadow w-full max-w-4xl min-h-[75vh] my-8 p-16 md:p-32 relative paper-texture cursor-default flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Fold Lines */}
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black/5" />
              <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black/5" />

              {/* Letter Content with SVG filter for Ink Bleed */}
              <svg className="hidden">
                <defs>
                  <filter id="ink-bleed">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div 
                  className="font-handwritten text-4xl md:text-5xl leading-[1.8] text-[#222] whitespace-pre-wrap mix-blend-multiply opacity-90 tracking-wide"
                  style={{ filter: "url(#ink-bleed)" }}
                >
                  {OPEN_WHEN_LETTERS.find(l => l.id === activeLetter)?.content}
                </div>
                
                <div 
                  className="mt-32 text-right font-handwritten text-3xl md:text-4xl text-[var(--muted)] mix-blend-multiply"
                  style={{ filter: "url(#ink-bleed)" }}
                >
                  Yours truly, <br/>
                  <span className="text-5xl md:text-6xl text-[var(--foreground)] mt-6 block">A.</span>
                </div>
              </div>

              <div 
                className="absolute top-10 right-10 flex items-center gap-4 group cursor-pointer z-20"
                onClick={() => setActiveLetter(null)}
              >
                <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors font-sans">
                  Fold Back
                </span>
                <span className="w-8 h-[1px] bg-[var(--muted)] group-hover:bg-[var(--foreground)] transition-colors" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
