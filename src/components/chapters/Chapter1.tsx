'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '@/config/content';

export default function Chapter1() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photos = MEMORIES.filter(m => m.mediaType === 'image').slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-[15vh] px-4 md:px-[10vw] relative">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mb-[15vh] text-center md:text-left">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)]">Chapter 01</span>
        <h1 className="font-serif text-5xl md:text-8xl mt-6 mb-8 font-light leading-none">First Impression</h1>
        <p className="text-[var(--muted)] font-sans font-light max-w-xl leading-relaxed text-base md:text-lg">
          Some moments are quiet, unassuming. But they shift the trajectory of your entire life. 
          Looking back, it wasn't just a first impression—it was the prologue to everything that matters.
        </p>
      </div>

      {/* Editorial Spread Section */}
      <div className="w-full relative min-h-[100vh] md:min-h-[800px] flex flex-col md:block">
        
        {/* Photo 1: Top Left */}
        {photos[0] && (
          <motion.div 
            layoutId={`photo-${photos[0].id}`}
            onClick={() => setSelectedPhoto(photos[0].mediaUrl)}
            whileHover={{ y: -15, rotate: -2, zIndex: 10, scale: 1.02 }}
            className="md:absolute top-0 left-0 w-full md:w-[380px] lg:w-[450px] aspect-[4/5] bg-white p-4 shadow-2xl cursor-view group border border-[var(--secondary)] mb-16 md:mb-0 transition-transform duration-500"
          >
            {/* Fake Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-md rotate-2 shadow-sm border border-white/40 z-10" />
            
            <div className="relative w-full h-[calc(100%-60px)] overflow-hidden bg-[var(--foreground)]">
              <motion.img 
                src={photos[0].mediaUrl} 
                alt="First impression" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-2xl text-center mt-5 text-[var(--muted)]">{photos[0].caption.split('.')[0]}</p>
          </motion.div>
        )}

        {/* Text Block */}
        <div className="md:absolute top-[10%] right-[5%] w-full md:w-[350px] font-serif text-2xl md:text-4xl text-[var(--muted)] italic leading-relaxed mb-16 md:mb-0 z-0">
          "It felt like walking into a warm room after being out in the cold. Every word from you felt like it was meant just for me."
        </div>

        {/* Photo 2: Center Right (overlapping) */}
        {photos[1] && (
          <motion.div 
            layoutId={`photo-${photos[1].id}`}
            onClick={() => setSelectedPhoto(photos[1].mediaUrl)}
            whileHover={{ y: -15, rotate: 1, zIndex: 10, scale: 1.02 }}
            className="md:absolute top-[350px] right-0 w-full md:w-[450px] lg:w-[550px] aspect-[16/9] bg-white p-4 shadow-2xl cursor-view z-1 group border border-[var(--secondary)] md:rotate-3 mb-16 md:mb-0 transition-transform duration-500"
          >
            <div className="absolute -top-3 right-8 w-16 h-8 bg-white/40 backdrop-blur-md -rotate-3 shadow-sm border border-white/40 z-10" />
            <div className="relative w-full h-[calc(100%-50px)] overflow-hidden bg-[var(--foreground)]">
              <motion.img 
                src={photos[1].mediaUrl} 
                alt="Memory" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-2xl text-center mt-4 text-[var(--muted)]">{photos[1].caption.split('.')[0]}</p>
          </motion.div>
        )}

        {/* Photo 3: Bottom Left (overlapping) */}
        {photos[2] && (
          <motion.div 
            layoutId={`photo-${photos[2].id}`}
            onClick={() => setSelectedPhoto(photos[2].mediaUrl)}
            whileHover={{ y: -15, rotate: -4, zIndex: 10, scale: 1.02 }}
            className="md:absolute bottom-[-100px] left-[20%] w-[80%] md:w-[350px] aspect-square bg-[var(--secondary)] p-6 shadow-2xl cursor-view z-2 group border border-white md:-rotate-2 transition-transform duration-500"
          >
            {/* Coffee Stain fake element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full border-[4px] border-[#8B4513]/10 z-10 pointer-events-none mix-blend-multiply" />
            
            <div className="relative w-full h-[calc(100%-60px)] overflow-hidden bg-[var(--foreground)]">
              <motion.img 
                src={photos[2].mediaUrl} 
                alt="Memory 3" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-2xl text-center mt-5 text-[var(--muted)]">{photos[2].caption.split('.')[0]}</p>
          </motion.div>
        )}
      </div>

      {/* Fullscreen Viewer Modal (Shared Layout Animation) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[1000] bg-[var(--foreground)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer no-cursor"
          >
            <motion.img
              layoutId={`photo-${photos.find(p => p.mediaUrl === selectedPhoto)?.id}`}
              src={selectedPhoto}
              className="w-full max-w-5xl max-h-[80vh] object-contain shadow-2xl border border-white/10"
              alt="Fullscreen memory"
            />
            <div className="absolute bottom-12 text-white/50 text-[10px] tracking-widest uppercase">Click anywhere to close</div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
