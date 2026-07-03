'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Sequence:
    // 0.5s: Text appears
    // 2.0s: Text disappears, wax seal breaks / paper unfolds (simulated by scale/opacity)
    // 3.0s: Preloader unmounts
    
    const t1 = setTimeout(() => setTextVisible(true), 500);
    const t2 = setTimeout(() => setTextVisible(false), 2000);
    const t3 = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] bg-[#111111] flex flex-col items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: textVisible ? 1 : 0, y: textVisible ? 0 : -10 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="text-[#ECE7DF] font-serif text-sm tracking-widest italic"
          >
            Preparing your surprise...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
