'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, BookOpen, X, ArrowLeft } from 'lucide-react';
import { OPEN_WHEN_LETTERS, OpenWhenLetter } from '@/config/content';

export default function OpenWhenPage() {
  const [selectedLetter, setSelectedLetter] = useState<OpenWhenLetter | null>(null);

  const openLetter = (letter: OpenWhenLetter) => {
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
      
      {/* Page Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-[#d4a373]/10 text-[#d4a373] border border-[#d4a373]/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Bonus Feature</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#3d342d] font-serif mb-4">
          Open When... Letters
        </h1>
        <p className="text-[#6d5e53] max-w-md mx-auto text-sm sm:text-base">
          Letters written for specific moments. Open them whenever you feel sad, sleepy, or just miss me.
        </p>
      </div>

      {/* Letters Grid */}
      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {OPEN_WHEN_LETTERS.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -5 }}
            onClick={() => openLetter(letter)}
            className="glass-panel border-[#d4a373]/20 bg-[#fdfbf7] hover:border-[#e07a5f]/40 rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 group"
          >
            {/* Background floating glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4a373]/5 rounded-full blur-xl pointer-events-none group-hover:bg-[#d4a373]/10" />

            <div className="flex gap-4 items-start relative z-10">
              <span className="text-4xl select-none">{letter.emoji}</span>
              <div>
                <h3 className="text-base font-bold text-[#3d342d] group-hover:text-[#e07a5f] transition-colors">
                  {letter.title}
                </h3>
                <p className="text-xs text-[#6d5e53] leading-relaxed">
                  {letter.description}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#e07a5f] group-hover:underline">
                Open Letter →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Letter Modal Viewer */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f0eaf5]lack/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-[#fdfbf7] rounded-3xl p-6 sm:p-10 shadow-md relative border border-[#d4a373]/30 flex flex-col justify-between"
              style={{ maxHeight: '85vh' }}
            >
              {/* Close Button */}
              <button
                onClick={closeLetter}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#faf6f0] text-[#3d342d] hover:bg-gray-200/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex-1 overflow-y-auto pr-2 mt-4">
                {/* Wax Seal Emblem */}
                <div className="flex justify-center mb-6 select-none pointer-events-none">
                  <div className="w-14 h-14 rounded-full bg-[#d4a373] border-2 border-[#c39262] flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 fill-current text-[#faf6f0]" />
                  </div>
                </div>

                <h2 className="handwritten text-2xl sm:text-3xl font-bold text-[#e07a5f] mb-4 border-b border-[#d4a373]/20 pb-2 text-center">
                  {selectedLetter.title}
                </h2>
                
                <p className="handwritten text-lg sm:text-xl leading-relaxed text-[#3d342d] whitespace-pre-line px-1 sm:px-4">
                  {selectedLetter.content}
                </p>
              </div>

              <div className="text-center mt-6 pt-4 border-t border-[#d4a373]/20">
                <button
                  onClick={closeLetter}
                  className="py-2.5 px-6 rounded-full bg-[#d4a373] hover:bg-[#c39262] text-[#faf6f0] text-xs font-bold transition-all duration-200 cursor-pointer shadow-md"
                >
                  Seal Letter Back
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
