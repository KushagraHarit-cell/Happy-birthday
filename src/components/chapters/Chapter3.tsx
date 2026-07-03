'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAILY_QUOTES } from '@/config/content';

const TYPES = ['polaroid', 'clipping', 'sticky', 'flower', 'receipt', 'film'];

export default function Chapter3() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-40 px-4 relative overflow-hidden">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-[15vh] text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)]">Chapter 03</span>
        <h2 className="font-serif text-5xl md:text-8xl mt-6 mb-8 font-light">Things I Love About You</h2>
        <p className="text-[var(--muted)] font-light max-w-lg mx-auto leading-relaxed text-lg">
          An interactive collection. Click any item to read closely.
        </p>
      </div>

      {/* Physics/Masonry Gallery */}
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-16 md:gap-24 p-8 relative z-10">
        {DAILY_QUOTES.map((quote, idx) => {
          const type = TYPES[idx % TYPES.length];
          const randomRotation = Math.random() * 16 - 8;
          const randomY = Math.random() * 60 - 30;
          
          return (
            <motion.div
              key={idx}
              layoutId={`quote-${idx}`}
              onClick={() => setSelectedQuote(quote)}
              initial={{ rotate: randomRotation, y: randomY }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.05, 
                zIndex: 50,
                y: randomY - 10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`cursor-view shadow-xl flex-shrink-0 relative group transition-colors duration-500 ${
                type === 'polaroid' ? 'bg-white p-4 pb-16 w-64 md:w-80 aspect-[3/4] border border-[#ece7df]' :
                type === 'clipping' ? 'bg-[#fcfcfc] p-8 md:p-12 w-72 md:w-96 border-l-4 border-[var(--accent-gold)]' :
                type === 'sticky' ? 'bg-[#fff9c4] p-8 md:p-10 w-56 md:w-72 aspect-square shadow-md' :
                type === 'receipt' ? 'bg-white p-8 w-48 md:w-64 font-mono text-xs md:text-sm border-t-[3px] border-dashed border-gray-300' :
                'bg-[var(--secondary)] p-8 md:p-12 w-64 md:w-80'
              }`}
            >
              {/* Fake Tape for certain items */}
              {(type === 'polaroid' || type === 'clipping') && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-md rotate-2 shadow-sm border border-white/40 z-10" />
              )}

              <p className={`line-clamp-5 ${
                type === 'sticky' ? 'font-handwritten text-3xl md:text-4xl text-blue-900 leading-relaxed' : 
                type === 'clipping' ? 'font-serif italic text-2xl md:text-3xl text-[var(--foreground)] leading-tight' :
                'text-[var(--foreground)] text-base md:text-lg font-light'
              }`}>
                {quote}
              </p>

              {/* Read more indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[9px] uppercase tracking-widest text-[var(--accent-gold)]">
                Read
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Reading Modal */}
      <AnimatePresence>
        {selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuote(null)}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer no-cursor"
          >
            <motion.div 
              layoutId={`quote-${DAILY_QUOTES.indexOf(selectedQuote)}`}
              className="bg-white p-16 md:p-32 shadow-2xl max-w-4xl border border-[var(--secondary)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--accent-gold)]/30" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--accent-gold)]/30" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--accent-gold)]/30" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--accent-gold)]/30" />

              <p className="font-serif text-4xl md:text-6xl leading-[1.2] text-center text-[var(--foreground)] font-light">
                "{selectedQuote}"
              </p>
            </motion.div>
            
            <div className="absolute bottom-12 text-[var(--muted)] text-[10px] tracking-widest uppercase">Click anywhere to close</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
