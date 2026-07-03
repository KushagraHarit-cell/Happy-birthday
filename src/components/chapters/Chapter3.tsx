'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DAILY_QUOTES } from '@/config/content';

const TYPES = ['polaroid', 'clipping', 'sticky', 'flower', 'receipt', 'film'];

export default function Chapter3() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-32 px-4 relative">
      <div className="max-w-4xl mx-auto mb-24 text-center">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Chapter 03</span>
        <h2 className="font-serif text-5xl md:text-7xl mt-4 mb-6">Things I Love About You</h2>
        <p className="text-[var(--muted)] font-light max-w-lg mx-auto">
          An interactive collection. Click any item to read closely.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 p-8">
        {DAILY_QUOTES.map((quote, idx) => {
          const type = TYPES[idx % TYPES.length];
          const randomRotation = Math.random() * 20 - 10;
          
          return (
            <motion.div
              key={idx}
              layoutId={`quote-${idx}`}
              onClick={() => setSelectedQuote(quote)}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
              initial={{ rotate: randomRotation }}
              className={`cursor-pointer shadow-lg transition-shadow duration-300 hover:shadow-2xl flex-shrink-0 ${
                type === 'polaroid' ? 'bg-white p-4 pb-12 w-64 aspect-[3/4] border border-[#ece7df]' :
                type === 'clipping' ? 'bg-[#fcfcfc] p-6 w-72 border-l-4 border-[var(--accent-gold)] font-serif italic text-xl' :
                type === 'sticky' ? 'bg-[#fff9c4] p-6 w-56 aspect-square shadow-md' :
                type === 'receipt' ? 'bg-white p-6 w-48 font-mono text-sm border-t-2 border-dashed border-gray-300' :
                'bg-[var(--secondary)] p-6 w-64'
              }`}
            >
              <p className={`line-clamp-4 ${type === 'sticky' ? 'font-handwritten text-2xl text-blue-800' : 'text-[var(--foreground)]'}`}>
                {quote}
              </p>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuote(null)}
            className="fixed inset-0 z-[100] bg-[var(--background)]/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div 
              className="bg-white p-12 md:p-24 shadow-2xl max-w-2xl border border-[var(--secondary)]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif text-3xl md:text-5xl leading-tight text-center">
                "{selectedQuote}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
