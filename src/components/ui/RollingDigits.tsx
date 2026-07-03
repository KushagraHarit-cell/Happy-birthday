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
        className="flex items-center justify-center text-[clamp(40px,8vw,100px)] font-serif text-[var(--foreground)] font-light overflow-hidden h-[1.2em] relative"
        style={{ perspective: '800px' }}
      >
        {digits.map((digit, i) => (
          <div key={i} className="relative w-[0.6em] flex justify-center text-center leading-none">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${i}-${digit}`}
                initial={{ y: '50%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-50%', opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
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
      <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--muted)] mt-2 font-sans font-medium transition-colors duration-500 group-hover:text-[var(--foreground)]">
        {label}
      </span>
    </div>
  );
}
