'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Lock } from 'lucide-react';
import RollingDigits from './ui/RollingDigits';
import MagneticButton from './ui/MagneticButton';

const Book3D = dynamic(() => import('./Book3D'), { ssr: false });

interface ChapterLockProps {
  chapterId: number;
  title: string;
  unlockDate: string;
  onUnlock: () => void;
}

export default function ChapterLock({ chapterId, title, unlockDate, onUnlock }: ChapterLockProps) {
  const [targetDate] = useState(new Date(unlockDate).getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        onUnlock();
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onUnlock]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[var(--background)] px-4">
      
      {/* 3D Book Background Element */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px]">
          <Book3D unlocked={false} />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl bg-white/70 backdrop-blur-2xl p-16 border border-[var(--secondary)] shadow-2xl">
        <div className="w-16 h-16 bg-[#8B0000] rounded-full flex items-center justify-center shadow-lg mb-8 border-2 border-red-900/40 mx-auto">
          <Lock className="text-[#F6F3EE] w-6 h-6" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] mb-4">Chapter 0{chapterId}</span>
        <h1 className="font-serif text-4xl md:text-6xl text-[var(--foreground)] mb-6 font-light leading-tight">{title}</h1>
        <p className="text-[var(--muted)] font-light leading-relaxed mb-12">
          This chapter is sealed. The story continues when the time is right.
        </p>

        {/* Minimal Rolling Countdown */}
        <div className="flex gap-6 md:gap-10 items-center justify-center">
          <RollingDigits value={countdown.days} label="Days" />
          <span className="text-[var(--accent-gold)] font-light text-2xl -mt-6">:</span>
          <RollingDigits value={countdown.hours} label="Hours" />
          <span className="text-[var(--accent-gold)] font-light text-2xl -mt-6">:</span>
          <RollingDigits value={countdown.minutes} label="Mins" />
          <span className="text-[var(--accent-gold)] font-light text-2xl -mt-6">:</span>
          <RollingDigits value={countdown.seconds} label="Secs" />
        </div>

        {/* Developer Bypass (Visible only in dev mode query) */}
        {typeof window !== 'undefined' && window.location.search.includes('dev=true') && (
          <MagneticButton 
            onClick={onUnlock} 
            className="mt-16 text-[9px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--accent-gold)] border border-[var(--muted)]/20 px-6 py-2 rounded-full"
          >
            Bypass Lock
          </MagneticButton>
        )}
      </div>

    </div>
  );
}
