'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CHAPTERS } from '@/config/content';
import { Lock, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';

export default function MagazineStack() {
  const router = useRouter();

  const handleNavigate = (chapterId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      router.push(`/chapter/${chapterId}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-[20vh] pb-32">
      {CHAPTERS.map((chapter, index) => {
        const unlockDate = new Date(chapter.unlockDate).getTime();
        const isUnlocked = new Date().getTime() >= unlockDate;
        
        return (
          <MagazineCover 
            key={chapter.id} 
            chapter={chapter} 
            index={index} 
            isUnlocked={isUnlocked} 
            onClick={() => handleNavigate(chapter.id, isUnlocked)}
          />
        );
      })}
    </div>
  );
}

// Separate component to handle individual scroll parallax
function MagazineCover({ chapter, index, isUnlocked, onClick }: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col md:flex-row gap-16 lg:gap-32 items-center group cursor-view ${
        index % 2 !== 0 ? 'md:flex-row-reverse' : ''
      }`}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* The Magazine Cover Wrapper (Parallax Image) */}
      <motion.div 
        style={{ y: yImage }}
        className="relative w-[280px] md:w-[400px] lg:w-[480px] aspect-[3/4] bg-[var(--tertiary)] shadow-2xl flex-shrink-0 transition-transform duration-700 ease-out hover:scale-[1.02] overflow-hidden"
      >
        {/* Spine shadow */}
        <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10" />
        
        {/* Cover Content */}
        <div className="absolute inset-0 p-12 flex flex-col justify-between items-center text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--foreground)]/40">Issue 0{chapter.id}</span>
          <h3 className="font-serif text-5xl md:text-7xl text-[var(--foreground)] leading-none uppercase tracking-tight" style={{ WebkitTextStroke: '0.5px var(--foreground)' }}>
            {chapter.title.split(': ')[1]}
          </h3>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent-gold)]">Vol. I</span>
        </div>
        
        {/* Wax Seal (if locked) */}
        {!isUnlocked && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-[#8B0000] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md mix-blend-multiply border-[3px] border-[#5e0000]">
            <Lock className="text-[#F6F3EE] w-8 h-8 opacity-80" />
            <span className="absolute -bottom-8 text-[9px] uppercase tracking-widest text-[#8B0000] font-bold whitespace-nowrap bg-white/80 px-2 py-1 rounded">Locked</span>
          </div>
        )}
      </motion.div>

      {/* Typography / Info Side (Parallax Text) */}
      <motion.div 
        style={{ y: yText }}
        className="flex-1 flex flex-col gap-6 text-center md:text-left z-10"
      >
        <div className="overflow-hidden">
          <span className="block text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-2">
            {new Date(chapter.unlockDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <h2 className="font-serif text-5xl lg:text-7xl text-[var(--background)] font-light leading-tight">{chapter.title}</h2>
        <p className="text-[var(--muted)] font-light max-w-md mx-auto md:mx-0 text-lg leading-relaxed">
          {chapter.description}
        </p>
        
        <div className="mt-8 flex justify-center md:justify-start">
          {isUnlocked ? (
            <MagneticButton className="px-8 py-3 rounded-full border border-[var(--accent-gold)] text-[var(--accent-gold)] flex items-center gap-3 text-xs uppercase tracking-widest hover:bg-[var(--accent-gold)] hover:text-white transition-colors duration-500">
              <span>Read Chapter</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]/50 border border-[var(--muted)]/30 px-8 py-3 rounded-full">
              Sealed
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
