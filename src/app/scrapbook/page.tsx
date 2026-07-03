'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MEMORIES } from '@/config/content';

export default function ScrapbookPage() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  
  // Filter only memories containing images
  const scrapbookPhotos = MEMORIES.filter(m => m.mediaType === 'image');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-[#d4a373]/10 text-[#d4a373] border border-[#d4a373]/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Scrapbook</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#3d342d] font-serif mb-4">
          Digital Scrapbook
        </h1>
        <p className="text-[#6d5e53] max-w-md mx-auto text-sm sm:text-base">
          Our shared polaroid drawer. Drag and slide the photos around to arrange them on the digital board.
        </p>
      </div>

      {/* Interactive Board Constraints Container */}
      <div 
        ref={constraintsRef}
        className="relative h-[600px] w-full bg-[#faf6f0]/40 border border-[#d4a373]/25 rounded-3xl overflow-hidden shadow-sm p-6 select-none"
      >
        {/* Helper info */}
        <p className="text-xs text-[#8c7a6b] absolute top-4 left-6 z-20 pointer-events-none">
          ✨ Hold and drag polaroids to move them. Drag them anywhere on the board!
        </p>

        {/* Floating background glowing orb */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-96 h-96 bg-[#d4a373]/5 rounded-full blur-3xl" />
        </div>

        {/* Scattered Polaroids */}
        {scrapbookPhotos.map((photo, index) => {
          // Compute diverse starting positions and rotations so they scatter naturally
          const rotations = [-8, 6, -3, 5, -5];
          const rotation = rotations[index % rotations.length];
          
          // Scatter across coordinates
          const leftOffsets = ['10%', '45%', '20%', '65%', '72%'];
          const topOffsets = ['60px', '140px', '280px', '90px', '320px'];
          
          const left = leftOffsets[index % leftOffsets.length];
          const top = topOffsets[index % topOffsets.length];

          return (
            <motion.div
              key={photo.id}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.15}
              whileDrag={{ scale: 1.06, zIndex: 50, rotate: 0 }}
              className="polaroid-card absolute w-[220px] cursor-grab active:cursor-grabbing select-none"
              style={{
                left: left,
                top: top,
                '--rotate': `${rotation}deg`
              } as React.CSSProperties}
            >
              <div className="w-full h-[185px] relative bg-gray-100 overflow-hidden mb-3.5 border-b border-gray-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={photo.mediaUrl} 
                  alt={photo.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <h3 className="text-xs font-semibold text-gray-800 text-center tracking-tight truncate px-1">
                {photo.title}
              </h3>
              <p className="text-[9px] text-gray-400 text-center mt-1 font-mono tracking-wider font-semibold">
                {photo.date}
              </p>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
}
