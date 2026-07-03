'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RollingDigitsProps {
  value: number;
  label: string;
}

export default function RollingDigits({ value, label }: RollingDigitsProps) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const padValue = String(currentValue).padStart(2, '0');
  const digits = padValue.split('');

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center text-4xl md:text-6xl font-serif text-[var(--foreground)] h-16 md:h-20 overflow-hidden relative">
        {/* Subtle glass overlay for watch effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)] opacity-80 pointer-events-none z-10" />
        
        {digits.map((digit, i) => (
          <div key={i} className="relative w-[1ch] flex justify-center text-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={`${i}-${digit}`}
                initial={{ y: 50, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -50, opacity: 0, rotateX: 90 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
      <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mt-2 font-sans">
        {label}
      </span>
    </div>
  );
}
