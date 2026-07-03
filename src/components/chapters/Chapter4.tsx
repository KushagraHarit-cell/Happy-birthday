'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OPEN_WHEN_LETTERS } from '@/config/content';

export default function Chapter4() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-32 px-4 relative">
      <div className="max-w-4xl mx-auto mb-24 text-center">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Chapter 04</span>
        <h2 className="font-serif text-5xl md:text-7xl mt-4 mb-6">Little Surprises</h2>
        <p className="text-[var(--muted)] font-light max-w-lg mx-auto leading-relaxed">
          A collection of sealed letters, waiting to be opened precisely when the moment calls for them.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 p-4">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -5, scale: 1.02 }}
            onClick={() => setActiveLetter(letter.id)}
            className="group cursor-pointer perspective-1000"
          >
            {/* The Envelope */}
            <div className="relative w-full h-[250px] bg-[#f9f8f6] shadow-xl border border-[#e5e0d8] flex flex-col items-center justify-center transition-all duration-500 transform-style-3d">
              {/* Flap Outline */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-t border-[var(--accent-gold)]/20" />
              <svg className="absolute top-0 left-0 w-full h-1/2 pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="0,0 100,0 50,100" fill="currentColor" className="text-[var(--accent-gold)]" />
              </svg>
              
              {/* Wax Seal */}
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#8B0000] rounded-full flex items-center justify-center shadow-md border-2 border-red-900/40 z-10 transition-transform duration-500 group-hover:scale-110">
                <span className="text-[#F6F3EE] opacity-80 font-serif italic text-lg">H</span>
              </div>

              {/* Title */}
              <h3 className="mt-16 font-serif text-2xl text-[var(--foreground)] tracking-wide z-20">{letter.title}</h3>
              <p className="text-[var(--muted)] text-sm font-light mt-2 z-20 max-w-[80%] text-center">{letter.description}</p>
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
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 overflow-y-auto"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              layoutId={`envelope-${activeLetter}`}
              initial={{ rotateX: 90, opacity: 0, y: 50 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              exit={{ rotateX: -90, opacity: 0, y: -50 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="bg-[#FFFAF0] shadow-2xl w-full max-w-2xl min-h-[60vh] my-8 p-12 md:p-20 relative paper-texture cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveLetter(null)}
                className="absolute top-8 right-8 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors uppercase text-[10px] tracking-widest"
              >
                Fold Back
              </button>
              
              {/* Letter Content */}
              <div className="font-handwritten text-2xl md:text-3xl leading-relaxed text-[#2C3539] whitespace-pre-wrap ink-texture opacity-90">
                {OPEN_WHEN_LETTERS.find(l => l.id === activeLetter)?.content}
              </div>
              
              <div className="mt-16 text-right font-handwritten text-3xl text-[var(--accent-gold)]">
                Yours truly, <br/>
                <span className="text-4xl text-[#2C3539]">A.</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
