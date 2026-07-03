'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OPEN_WHEN_LETTERS } from '@/config/content';

export default function Chapter4() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-40 px-4 relative overflow-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-32 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)]">Chapter 04</span>
        <h2 className="font-serif text-5xl md:text-8xl mt-6 mb-8 font-light">Little Surprises</h2>
        <p className="text-[var(--muted)] font-light max-w-lg mx-auto leading-relaxed text-lg">
          A collection of sealed letters, waiting to be opened precisely when the moment calls for them.
        </p>
      </div>

      {/* Grid of Envelopes */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 p-4 perspective-[2000px]">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -10, scale: 1.05, rotateX: 5 }}
            onClick={() => setActiveLetter(letter.id)}
            className="group cursor-view"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* The Envelope */}
            <div className="relative w-full aspect-[4/3] bg-[#fdfbf7] shadow-xl flex flex-col items-center justify-center border border-[var(--secondary)] transition-all duration-700 hover:shadow-2xl">
              
              {/* Envelope Flap styling */}
              <svg className="absolute top-0 left-0 w-full h-[60%] pointer-events-none drop-shadow-sm opacity-40 z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,0 50,100" fill="#f4f1eb" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
              </svg>
              
              {/* Wax Seal */}
              <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#5e0000] z-20 transition-transform duration-500 group-hover:scale-110">
                <span className="text-[#F6F3EE] opacity-90 font-serif italic text-2xl">A</span>
              </div>

              {/* Title on envelope */}
              <div className="absolute bottom-8 left-0 w-full text-center z-20">
                <h3 className="font-serif text-2xl md:text-3xl text-[var(--foreground)] tracking-wide">{letter.title}</h3>
                <p className="text-[var(--muted)] text-xs uppercase tracking-[0.2em] mt-3 font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">Open Envelope</p>
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
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 overflow-y-auto cursor-pointer no-cursor perspective-[2000px]"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              layoutId={`envelope-${activeLetter}`}
              initial={{ rotateX: 70, opacity: 0, y: 100, scale: 0.8 }}
              animate={{ rotateX: 0, opacity: 1, y: 0, scale: 1 }}
              exit={{ rotateX: -70, opacity: 0, y: -100, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="bg-[#fcfbf9] shadow-2xl w-full max-w-3xl min-h-[70vh] my-8 p-16 md:p-24 relative paper-texture cursor-default border border-[var(--secondary)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Subtle Fold Lines */}
              <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black/5" />
              <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black/5" />

              {/* Letter Content with SVG filter for Ink Bleed */}
              <svg className="hidden">
                <defs>
                  <filter id="ink-bleed">
                    <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              <div className="flex-1 flex flex-col justify-center">
                <div 
                  className="font-handwritten text-4xl md:text-5xl leading-[1.6] text-[#1a1c20] whitespace-pre-wrap mix-blend-multiply opacity-90"
                  style={{ filter: "url(#ink-bleed)" }}
                >
                  {OPEN_WHEN_LETTERS.find(l => l.id === activeLetter)?.content}
                </div>
                
                <div 
                  className="mt-24 text-right font-handwritten text-4xl text-[var(--accent-gold)]"
                  style={{ filter: "url(#ink-bleed)" }}
                >
                  Yours truly, <br/>
                  <span className="text-5xl text-[#1a1c20] mt-4 block">A.</span>
                </div>
              </div>

              <div className="absolute top-8 right-8 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase text-[10px] tracking-widest cursor-pointer" onClick={() => setActiveLetter(null)}>
                Fold Back
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
