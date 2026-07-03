'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CHAPTERS } from '@/config/content';
import { Lock } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
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

function MagazineSpread({ chapter, index, isUnlocked, onClick }: { chapter: typeof CHAPTERS[0], index: number, isUnlocked: boolean, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Parallax setup for a dynamic scroll feel
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const yText = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // 3D physical tilt effect on hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      ref={ref}
      className={`relative flex flex-col lg:flex-row gap-16 lg:gap-32 items-center group cursor-view w-full max-w-7xl mx-auto ${
        index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
      }`}
      onClick={isUnlocked ? onClick : undefined}
    >
      {/* The Magazine/Book Visual (Parallax + 3D Hover) */}
      <motion.div 
        style={{ y: yImage, rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full md:w-[450px] lg:w-[500px] aspect-[3/4] flex-shrink-0 transition-transform duration-700 ease-out overflow-visible cursor-none"
      >
        {isUnlocked ? (
          // Editorial Magazine Cover
          <div className="w-full h-full bg-[var(--background)] paper-shadow relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
            {/* Spine shadow */}
            <div className="absolute top-0 left-0 bottom-0 w-8 bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/5 to-transparent z-10 mix-blend-multiply" />
            
            {/* Paper Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply z-10 pointer-events-none" />
            
            {/* Cover Content */}
            <div className="absolute inset-0 p-10 flex flex-col justify-between items-center text-center z-20">
              <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans border-b border-[var(--muted)]/20 pb-2">Issue 0{chapter.id}</span>
              <div className="flex flex-col items-center gap-6 w-full">
                <span className="text-[var(--foreground)] font-serif italic text-2xl">The</span>
                <h3 className="font-serif text-[clamp(40px,7vw,70px)] text-[var(--foreground)] leading-[0.8] uppercase tracking-[-0.04em]">
                  {chapter.title.split(': ')[1] || chapter.title}
                </h3>
              </div>
              <span className="text-[8px] uppercase tracking-[0.3em] text-[var(--foreground)] opacity-70">A Story of Us &mdash; Vol. I</span>
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30" />
          </div>
        ) : (
          // Locked Hardcover Book
          <div className="w-full h-full relative cinematic-shadow bg-[var(--foreground)]">
            <Book3D unlocked={false} />
            <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 text-[var(--background)] z-20 pointer-events-none">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/5 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                <Lock className="w-6 h-6 opacity-80" strokeWidth={1} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.4em] opacity-60">Sealed</span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans opacity-90">{new Date(chapter.unlockDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</span>
              </div>
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
