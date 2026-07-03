'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { DAILY_QUOTES } from '@/config/content';

export default function Chapter3() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[var(--background)] py-[20vh] px-4 md:px-12 relative overflow-hidden">
      
      {/* Decorative background text */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-[20%] -left-[10%] text-[20vw] font-serif text-[var(--secondary)] opacity-40 whitespace-nowrap pointer-events-none mix-blend-multiply"
      >
        Reasons Why
      </motion.div>

      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto mb-[20vh] text-center relative z-20">
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-12 h-[1px] bg-[var(--accent-gold)]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">Chapter 03</span>
          <span className="w-12 h-[1px] bg-[var(--accent-gold)]" />
        </div>
        <h2 className="font-serif text-[clamp(50px,8vw,120px)] leading-[0.9] font-light text-[var(--foreground)] tracking-tight">
          Things I Love<br/>About You
        </h2>
        <p className="text-[var(--muted)] font-sans font-light max-w-lg mx-auto mt-12 leading-[2] text-lg tracking-wide">
          An interactive collection. Click any fragment to read the full sentiment.
        </p>
      </div>

      {/* Premium Masonry/Grid Gallery */}
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-center gap-x-8 gap-y-16 md:gap-16 p-4 relative z-10">
        {DAILY_QUOTES.map((quote, idx) => {
          // Deterministic pseudo-randomness for layout
          const isLarge = idx % 5 === 0;
          const isMedium = idx % 3 === 0 && !isLarge;
          const randomRotation = (idx % 2 === 0 ? 1 : -1) * (idx % 3 + 1);
          
          return (
            <motion.div
              key={idx}
              layoutId={`quote-${idx}`}
              onClick={() => setSelectedQuote(quote)}
              initial={{ rotate: randomRotation, y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ 
                rotate: 0, 
                scale: 1.02, 
                zIndex: 50,
                y: -10,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={`cursor-view cinematic-shadow flex-shrink-0 relative group transition-all duration-700 bg-white border border-[var(--secondary)] flex flex-col justify-center ${
                isLarge ? 'w-full md:w-[600px] p-12 md:p-20 aspect-[4/3]' :
                isMedium ? 'w-full md:w-[400px] p-10 md:p-16 aspect-square' :
                'w-[80vw] md:w-[300px] p-8 md:p-12 aspect-[3/4]'
              }`}
            >
              {/* Fake Tape for some items */}
              {idx % 4 === 0 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md rotate-2 shadow-sm border border-white/40 z-10" />
              )}

              <p className={`line-clamp-4 text-center ${
                isLarge ? 'font-serif italic text-3xl md:text-5xl text-[var(--foreground)] leading-[1.3]' :
                isMedium ? 'font-sans font-light text-xl md:text-2xl text-[var(--muted)] leading-[1.6]' :
                'font-handwritten text-3xl md:text-4xl text-[var(--foreground)] leading-[1.5]'
              }`}>
                {quote}
              </p>

              {/* Read more indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center gap-2">
                <span className="w-[1px] h-6 bg-[var(--accent-gold)]" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--accent-gold)] font-sans">Read</span>
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
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedQuote(null)}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 cursor-pointer no-cursor"
          >
            <div className="absolute top-12 text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">
              Click anywhere to return
            </div>
            
            <motion.div 
              layoutId={`quote-${DAILY_QUOTES.indexOf(selectedQuote)}`}
              className="bg-transparent max-w-5xl relative px-4 md:px-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-[var(--accent-gold)] font-serif text-[120px] leading-none absolute -top-20 -left-10 opacity-30 select-none">
                &quot;
              </div>
              <p className="font-serif text-[clamp(40px,5vw,70px)] leading-[1.2] text-center text-[var(--foreground)] font-light relative z-10">
                {selectedQuote}
              </p>
              <div className="text-[var(--accent-gold)] font-serif text-[120px] leading-none absolute -bottom-32 -right-10 opacity-30 select-none rotate-180">
                &quot;
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
