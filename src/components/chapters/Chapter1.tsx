'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MEMORIES } from '@/config/content';

export default function Chapter1() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const photos = MEMORIES.filter(m => m.mediaType === 'image').slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[var(--background)] py-[20vh] relative overflow-hidden">
      
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 mb-[25vh] text-center md:text-left relative z-20">
        <div className="flex items-center gap-4 justify-center md:justify-start mb-12">
          <span className="w-12 h-[1px] bg-[var(--accent-gold)]" />
          <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">Chapter 01</span>
        </div>
        <h1 className="font-serif text-[clamp(60px,10vw,140px)] leading-[0.85] tracking-[-0.03em] font-light text-[var(--foreground)]">
          First Impression
        </h1>
        <div className="mt-16 ml-0 md:ml-32 max-w-xl">
          <p className="text-[var(--muted)] font-sans font-light leading-[2] text-lg md:text-xl tracking-wide">
            Some moments are quiet, unassuming. But they shift the trajectory of your entire life. 
            Looking back, it wasn&apos;t just a first impression&mdash;it was the prologue to everything that matters.
          </p>
        </div>
      </div>

      {/* Editorial Spread Section - Flowing Composition */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative min-h-[120vh]">
        
        {/* Photo 1: Left Aligned */}
        {photos[0] && (
          <motion.div 
            style={{ y: y1 }}
            className="w-full md:w-[45%] lg:w-[400px] mb-32 md:mb-0 relative z-10"
          >
            <motion.div
              layoutId={`photo-${photos[0].id}`}
              onClick={() => setSelectedPhoto(photos[0].mediaUrl)}
              whileHover={{ scale: 1.02, rotate: -1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-4 pb-16 cinematic-shadow cursor-view group relative"
            >
              {/* Paper Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-md rotate-2 shadow-sm border border-white/50 z-20" />
              
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[var(--foreground)]">
                <motion.img 
                  src={photos[0].mediaUrl} 
                  alt="First impression" 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
              </div>
              <p className="absolute bottom-6 left-0 right-0 font-handwritten text-3xl text-center text-[var(--muted)] opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                {photos[0].caption.split('.')[0]}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Text Block in Center/Right */}
        <motion.div 
          style={{ y: y3 }}
          className="w-full md:w-1/2 md:absolute top-[25%] right-[5%] z-0 px-4 md:px-0 mb-32 md:mb-0"
        >
          <p className="font-serif text-[clamp(30px,4vw,50px)] text-[var(--foreground)] italic leading-[1.3] text-center md:text-left opacity-80">
            &quot;It felt like walking into a warm room after being out in the cold. Every word from you felt like it was meant just for me.&quot;
          </p>
        </motion.div>

        {/* Photo 2: Right Aligned, Lower */}
        {photos[1] && (
          <motion.div 
            style={{ y: y2 }}
            className="w-full md:w-[55%] lg:w-[600px] md:absolute top-[45%] right-0 z-20 mb-32 md:mb-0"
          >
            <motion.div
              layoutId={`photo-${photos[1].id}`}
              onClick={() => setSelectedPhoto(photos[1].mediaUrl)}
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--secondary)] p-6 cinematic-shadow cursor-view group relative"
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[var(--foreground)]">
                <motion.img 
                  src={photos[1].mediaUrl} 
                  alt="Memory" 
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-8 flex items-center justify-between">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">October 2024</p>
                <p className="font-handwritten text-2xl text-[var(--foreground)]">{photos[1].caption.split('.')[0]}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Photo 3: Bottom Left */}
        {photos[2] && (
          <motion.div 
            style={{ y: y1 }}
            className="w-full md:w-[40%] lg:w-[350px] md:absolute top-[75%] left-[10%] z-10"
          >
            <motion.div
              layoutId={`photo-${photos[2].id}`}
              onClick={() => setSelectedPhoto(photos[2].mediaUrl)}
              whileHover={{ scale: 1.03, rotate: -2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-3 pb-12 cinematic-shadow cursor-view group relative rotate-[-2deg]"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-[var(--foreground)]">
                <motion.img 
                  src={photos[2].mediaUrl} 
                  alt="Memory 3" 
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                />
              </div>
              <p className="absolute bottom-4 left-0 right-0 font-handwritten text-2xl text-center text-[var(--muted)]">
                {photos[2].caption.split('.')[0]}
              </p>
            </motion.div>
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
            className="fixed inset-0 z-[1000] bg-[var(--background)]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-pointer no-cursor"
          >
            <div className="absolute top-10 right-10 text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] mix-blend-difference z-50">Close</div>
            <motion.img
              layoutId={`photo-${photos.find(p => p.mediaUrl === selectedPhoto)?.id}`}
              src={selectedPhoto}
              className="w-full max-w-6xl max-h-[85vh] object-contain cinematic-shadow"
              alt="Fullscreen memory"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
