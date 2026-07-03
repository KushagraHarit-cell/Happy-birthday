'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '@/config/content';

export default function Chapter1() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Use the first 3 images from memories
  const photos = MEMORIES.filter(m => m.mediaType === 'image').slice(0, 3);

  return (
    <div className="w-full min-h-screen bg-[var(--background)] py-32 px-4 relative">
      
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto mb-32 text-center md:text-left">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Chapter 01</span>
        <h1 className="font-serif text-6xl md:text-8xl mt-4 mb-8">First Impression</h1>
        <p className="text-[var(--muted)] font-sans font-light max-w-lg leading-relaxed text-sm">
          Some moments are quiet, unassuming. But they shift the trajectory of your entire life. 
          Looking back, it wasn't just a first impression—it was the prologue to everything that matters.
        </p>
      </div>

      {/* Editorial Spread Section */}
      <div className="max-w-6xl mx-auto relative h-[800px] md:h-[600px]">
        
        {/* Photo 1: Top Left */}
        {photos[0] && (
          <motion.div 
            layoutId={`photo-${photos[0].id}`}
            onClick={() => setSelectedPhoto(photos[0].mediaUrl)}
            whileHover={{ y: -10, rotate: -2, zIndex: 10 }}
            className="absolute top-0 left-4 md:left-[10%] w-[280px] md:w-[320px] aspect-[4/5] bg-white p-4 shadow-xl cursor-pointer group border border-[#ECE7DF]"
          >
            {/* Fake Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm border border-white/20 z-10" />
            
            <div className="relative w-full h-[calc(100%-40px)] overflow-hidden">
              <motion.img 
                src={photos[0].mediaUrl} 
                alt="First impression" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-xl text-center mt-3 text-[var(--muted)]">{photos[0].caption.split('.')[0]}</p>
          </motion.div>
        )}

        {/* Photo 2: Center Right (overlapping) */}
        {photos[1] && (
          <motion.div 
            layoutId={`photo-${photos[1].id}`}
            onClick={() => setSelectedPhoto(photos[1].mediaUrl)}
            whileHover={{ y: -10, rotate: 1, zIndex: 10 }}
            className="absolute top-[200px] md:top-[100px] right-4 md:right-[15%] w-[300px] md:w-[400px] aspect-[16/9] bg-white p-4 shadow-xl cursor-pointer z-0 group border border-[#ECE7DF] rotate-3"
          >
            <div className="absolute -top-3 right-4 w-12 h-6 bg-white/40 backdrop-blur-sm -rotate-3 shadow-sm border border-white/20 z-10" />
            <div className="relative w-full h-[calc(100%-40px)] overflow-hidden">
              <motion.img 
                src={photos[1].mediaUrl} 
                alt="Memory" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-xl text-center mt-3 text-[var(--muted)]">{photos[1].caption.split('.')[0]}</p>
          </motion.div>
        )}

        {/* Photo 3: Bottom Left (overlapping) */}
        {photos[2] && (
          <motion.div 
            layoutId={`photo-${photos[2].id}`}
            onClick={() => setSelectedPhoto(photos[2].mediaUrl)}
            whileHover={{ y: -10, rotate: -4, zIndex: 10 }}
            className="absolute bottom-0 md:bottom-[-50px] left-[10%] md:left-[30%] w-[250px] md:w-[300px] aspect-square bg-white p-4 shadow-xl cursor-pointer z-1 group border border-[#ECE7DF] -rotate-2"
          >
            {/* Coffee Stain fake element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-[3px] border-[#8B4513]/10 z-10 pointer-events-none" />
            
            <div className="relative w-full h-[calc(100%-40px)] overflow-hidden">
              <motion.img 
                src={photos[2].mediaUrl} 
                alt="Memory 3" 
                className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            <p className="font-handwritten text-xl text-center mt-3 text-[var(--muted)]">{photos[2].caption.split('.')[0]}</p>
          </motion.div>
        )}

      </div>

      {/* Fullscreen Viewer Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[1000] bg-[var(--background)]/95 backdrop-blur-md flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.img
              layoutId={`photo-${photos.find(p => p.mediaUrl === selectedPhoto)?.id}`}
              src={selectedPhoto}
              className="max-w-full max-h-full object-contain shadow-2xl"
              alt="Fullscreen memory"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
