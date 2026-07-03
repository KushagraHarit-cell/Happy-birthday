'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CHAPTERS } from '@/config/content';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MagazineStack() {
  const router = useRouter();

  const handleNavigate = (chapterId: number, isUnlocked: boolean) => {
    if (isUnlocked) {
      router.push(`/chapter/${chapterId}`);
    } else {
      alert("This chapter is sealed until its release date.");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 py-16">
      {CHAPTERS.map((chapter, index) => {
        const unlockDate = new Date(chapter.unlockDate).getTime();
        const isUnlocked = new Date().getTime() >= unlockDate;
        
        return (
          <motion.div 
            key={chapter.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`relative flex flex-col md:flex-row gap-12 items-center group cursor-pointer ${
              index % 2 !== 0 ? 'md:flex-row-reverse' : ''
            }`}
            onClick={() => handleNavigate(chapter.id, isUnlocked)}
          >
            {/* The Magazine Cover */}
            <div className="relative w-64 md:w-80 aspect-[3/4] bg-[#F6F3EE] shadow-xl border border-black/5 flex-shrink-0 transition-transform duration-700 ease-out group-hover:-translate-y-4 group-hover:shadow-2xl overflow-hidden">
              
              {/* Spine shadow */}
              <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-black/20 to-transparent z-10" />
              
              {/* Cover Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between items-center text-center">
                <span className="text-[10px] uppercase tracking-widest text-black/40">Issue 0{chapter.id}</span>
                <h3 className="font-serif text-3xl text-[#111111] leading-none uppercase" style={{ WebkitTextStroke: '0.5px #111111' }}>
                  {chapter.title.split(': ')[1]}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#B8925E]">Vol. I</span>
              </div>
              
              {/* Wax Seal (if locked) */}
              {!isUnlocked && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center shadow-lg backdrop-blur-md mix-blend-multiply border-2 border-red-900/50">
                  <Lock className="text-[#F6F3EE] w-6 h-6 opacity-80" />
                </div>
              )}
            </div>

            {/* Typography / Info Side */}
            <div className="flex-1 flex flex-col gap-4 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">
                {new Date(chapter.unlockDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h2 className="font-serif text-4xl text-[var(--secondary)]">{chapter.title}</h2>
              <p className="text-[var(--muted)] font-light max-w-md mx-auto md:mx-0">
                {chapter.description}
              </p>
              
              <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
                <span className={`text-xs uppercase tracking-widest ${isUnlocked ? 'text-[var(--secondary)]' : 'text-[var(--muted)]'}`}>
                  {isUnlocked ? 'Read Chapter' : 'Sealed'}
                </span>
                {isUnlocked && <ArrowRight className="w-4 h-4 text-[var(--accent-gold)] transition-transform duration-300 group-hover:translate-x-2" />}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
