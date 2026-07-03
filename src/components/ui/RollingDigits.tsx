'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RollingDigitsProps {
  value: number;
  label: string;
}

export default function RollingDigits({ value, label }: RollingDigitsProps) {
  const padValue = String(value).padStart(2, '0');
  const digits = padValue.split('');

  return (
    <div className="flex flex-col items-center group cursor-default">
      <div 
        className="flex items-center justify-center text-4xl md:text-7xl font-serif text-[var(--foreground)] h-20 md:h-28 overflow-hidden relative"
        style={{ perspective: '800px' }}
      >
        {/* Subtle glass overlay for watch effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)] opacity-90 pointer-events-none z-10" />
        
        {/* Barrel frame line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--accent-gold)]/20 z-0 pointer-events-none" />

        {digits.map((digit, i) => (
          <div key={i} className="relative w-[1ch] mx-0.5 flex justify-center text-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${i}-${digit}`}
                initial={{ y: 60, opacity: 0, rotateX: -60, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, rotateX: 0, scale: 1 }}
                exit={{ y: -60, opacity: 0, rotateX: 60, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 180, damping: 25, mass: 1 }}
                className="absolute inset-x-0"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder for layout */}
            <span className="opacity-0">{digit}</span>
          </div>
        ))}
      </div>
      <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-[var(--accent-gold)] mt-4 font-sans font-medium transition-colors duration-500 group-hover:text-[var(--foreground)]">
        {label}
      </span>
    </div>
  );
}
