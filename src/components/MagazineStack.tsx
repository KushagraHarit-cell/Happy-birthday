'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CHAPTERS } from '@/config/content';
import { Lock } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import dynamic from 'next/dynamic';

const Book3D = dynamic(() => import('@/components/Book3D'), { ssr: false });

export default function MagazineStack() {
  const router = useRouter();

  const handleNavigate = (chapterId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      router.push(`/chapter/${chapterId}`);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[25vh] pb-40">
      {CHAPTERS.map((chapter, index) => {
        const unlockDate = new Date(chapter.unlockDate).getTime();
        const isUnlocked = new Date().getTime() >= unlockDate;
        
        return (
          <MagazineSpread 
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

function MagazineSpread({ chapter, index, isUnlocked, onClick }: { chapter: any, index: number, isUnlocked: boolean, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax setup for a dynamic scroll feel
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col lg:flex-row gap-16 lg:gap-32 items-center group cursor-view w-full max-w-7xl mx-auto ${
        index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
      }`}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* The Magazine/Book Visual (Parallax) */}
      <motion.div 
        style={{ y: yImage }}
        className="relative w-full md:w-[500px] lg:w-[600px] aspect-[4/5] flex-shrink-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03] overflow-visible"
      >
        {isUnlocked ? (
          // Editorial Magazine Cover
          <div className="w-full h-full bg-[var(--tertiary)] cinematic-shadow relative overflow-hidden">
            {/* Spine shadow */}
            <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10 mix-blend-multiply" />
            
            {/* Cover Content */}
            <div className="absolute inset-0 p-12 flex flex-col justify-between items-center text-center">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">Issue 0{chapter.id}</span>
              <div className="flex flex-col items-center">
                <span className="text-[var(--accent-gold)] font-handwritten text-4xl mb-4 rotate-[-5deg]">The</span>
                <h3 className="font-serif text-[clamp(60px,8vw,90px)] text-[var(--foreground)] leading-[0.8] uppercase tracking-tighter mix-blend-multiply">
                  {chapter.title.split(': ')[1]}
                </h3>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--foreground)]">A Story of Us &middot; Vol. I</span>
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        ) : (
          // Locked Hardcover Book
          <div className="w-full h-full relative cinematic-shadow">
            <Book3D unlocked={false} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 text-white z-20 mix-blend-difference pointer-events-none">
              <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md">
                <Lock className="w-5 h-5 opacity-70" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.4em] opacity-70">Sealed</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Typography / Info Side (Parallax Text) */}
      <motion.div 
        style={{ y: yText }}
        className="flex-1 flex flex-col gap-8 text-center lg:text-left z-10 px-4 md:px-0"
      >
        <div className="overflow-hidden flex items-center gap-4 justify-center lg:justify-start">
          <span className="block w-8 h-[1px] bg-[var(--accent-gold)]" />
          <span className="block text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] font-sans font-medium">
            {new Date(chapter.unlockDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        
        <h2 className="font-serif text-[clamp(50px,6vw,80px)] text-[var(--foreground)] font-light leading-[1.1] tracking-tight">
          {chapter.title}
        </h2>
        
        <p className="text-[var(--muted)] font-light max-w-md mx-auto lg:mx-0 text-lg md:text-xl leading-[1.8] tracking-wide">
          {chapter.description}
        </p>
        
        <div className="mt-6 flex justify-center lg:justify-start">
          {isUnlocked ? (
            <MagneticButton className="px-8 py-4 border border-[var(--foreground)]/10 text-[var(--foreground)] flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-500 rounded-none">
              <span>Read Chapter</span>
              <span className="text-[var(--accent-gold)]">&rarr;</span>
            </MagneticButton>
          ) : (
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] opacity-60">
              <span className="w-2 h-2 rounded-full bg-[var(--muted)] animate-pulse" />
              Available Soon
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
