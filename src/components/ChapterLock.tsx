'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, Calendar } from 'lucide-react';
import { getTimeRemaining, TimeRemaining } from '@/utils/date';

interface ChapterLockProps {
  chapterId: number;
  title: string;
  unlockDate: string;
  onUnlock?: () => void;
}

export default function ChapterLock({ chapterId, title, unlockDate, onUnlock }: ChapterLockProps) {
  const [countdown, setCountdown] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });
  
  const formattedDate = new Date(unlockDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  useEffect(() => {
    // Initial calculation
    const currentStatus = getTimeRemaining(unlockDate);
    setCountdown(currentStatus);
    
    if (currentStatus.isCompleted && onUnlock) {
      onUnlock();
      return;
    }

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(unlockDate);
      setCountdown(remaining);
      
      if (remaining.isCompleted) {
        clearInterval(interval);
        if (onUnlock) onUnlock();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [unlockDate, onUnlock]);

  const countdownUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hours', value: countdown.hours },
    { label: 'Mins', value: countdown.minutes },
    { label: 'Secs', value: countdown.seconds },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="glass-panel w-full max-w-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden bg-white/80"
      >
        {/* Soft Cozy Glows */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#b794f4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#ffd1dc]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Locked Padlock Animation */}
        <div className="relative inline-flex justify-center items-center mb-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.03, 1],
              boxShadow: [
                '0 4px 10px rgba(183,148,244,0.1)',
                '0 8px 30px rgba(183,148,244,0.3)',
                '0 4px 10px rgba(183,148,244,0.1)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full bg-[#f0eaf5]lack/40 border border-[#b794f4]/40 flex items-center justify-center text-[#b794f4]"
          >
            <Lock className="w-10 h-10 drop-shadow-[0_0_10px_rgba(183,148,244,0.6)]" />
          </motion.div>
          
          <div className="absolute inset-0 w-32 h-32 border border-[#b794f4]/20 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
        </div>

        {/* Title & Info */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#2d141c] font-serif">
          {title}
        </h2>
        <p className="text-[#5e3e47]/80 text-sm sm:text-base max-w-md mx-auto mb-10 font-sans font-light">
          This secret chapter is currently locked in time, waiting for its moment to reveal itself to you.
        </p>

        {/* Countdown Board */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 max-w-lg mx-auto mb-10">
          {countdownUnits.map((unit, idx) => (
            <div key={idx} className="glass-panel border-black/5 rounded-xl p-3 sm:p-5 bg-[#f0eaf5]lack/20">
              <motion.span 
                key={unit.value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="block text-3xl sm:text-5xl font-serif text-[#ffd1dc] mb-2 drop-shadow-[0_0_15px_rgba(255,209,220,0.3)]"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#9b8d90] font-sans">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Unlock Info */}
        <div className="flex items-center justify-center gap-3 text-[#5e3e47]/80 text-xs sm:text-sm mb-10 bg-white/5 rounded-xl p-3 border border-black/10 max-w-md mx-auto uppercase tracking-wide">
          <Calendar className="w-4 h-4 text-[#b794f4]" />
          <span>Unlocks on <strong className="text-[#ffd1dc] font-semibold">{formattedDate}</strong></span>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="flex items-center gap-2 text-sm text-[#b794f4] hover:text-[#ffd1dc] transition-colors py-3 px-6 rounded-xl border border-[#b794f4]/30 bg-transparent hover:bg-white/5 cursor-pointer uppercase tracking-[0.1em] font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Timeline</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
