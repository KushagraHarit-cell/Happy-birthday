'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Lock, Unlock, Heart, Quote, ArrowRight } from 'lucide-react';
import { CHAPTERS, DAILY_QUOTES } from '@/config/content';
import { getTimeRemaining, isDatePassed, TimeRemaining } from '@/utils/date';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [unlockedState, setUnlockedState] = useState<boolean[]>([]);
  const [bypass, setBypass] = useState(false);
  
  // Countdown to July 29, 2026 (The Birthday!)
  const birthdayDateStr = "2026-07-29T00:00:00+05:30";
  const [countdown, setCountdown] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  // Quote of the day selection (rotates based on day of month)
  const [quoteOfTheDay, setQuoteOfTheDay] = useState('');

  useEffect(() => {
    setMounted(true);

    // Cleanup legacy localStorage bypasses
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_bypass');
    }

    // Initial check for unlock statuses
    const hasSessionBypass = sessionStorage.getItem('dev_bypass') === 'true';
    const hasQueryBypass = window.location.search.includes('dev=true');
    const isBypassActive = hasSessionBypass || hasQueryBypass;
    
    if (hasQueryBypass) {
      sessionStorage.setItem('dev_bypass', 'true');
    }

    setBypass(isBypassActive);

    const statuses = CHAPTERS.map((ch) => {
      return isDatePassed(ch.unlockDate) || isBypassActive;
    });
    setUnlockedState(statuses);

    // Set Quote of the day
    const day = new Date().getDate();
    setQuoteOfTheDay(DAILY_QUOTES[day % DAILY_QUOTES.length]);

    // Setup birthday countdown timer
    const updateCountdown = () => {
      setCountdown(getTimeRemaining(birthdayDateStr));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#ffd1dc] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 flex flex-col items-center min-h-screen">
      
      {/* Hero Section */}
      <div className="text-center mt-10 sm:mt-20 mb-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#b794f4]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-[#b794f4]/10 text-[#b794f4] border border-[#b794f4]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-8 relative z-10"
        >
          <Sparkles className="w-4 h-4" />
          <span>A Midnight Serenade</span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 font-serif text-[#2d141c] leading-tight relative z-10"
        >
          29 Days Until You
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#5e3e47] max-w-xl mx-auto text-base sm:text-lg leading-relaxed font-sans font-light relative z-10"
        >
          Every week, this digital world unveils a new secret. A cinematic journey of letters, games, and memories leading up to your special day.
        </motion.p>
      </div>

      {/* Cinematic Countdown Clock */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="glass-panel p-8 sm:p-12 text-center w-full max-w-3xl mb-24 relative overflow-hidden"
      >
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#b794f4]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ffd1dc]/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#5e3e47] font-semibold mb-10 opacity-80">
          Countdown to July 29 (The Grand Unveiling)
        </h2>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-xl mx-auto">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds }
          ].map((unit, idx) => (
            <div key={idx} className="glass-panel bg-[#f0eaf5]lack/20 border-black/5 p-4 sm:p-6 flex flex-col items-center justify-center relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffd1dc]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              <span className="block text-3xl sm:text-5xl font-serif text-[#ffd1dc] mb-2 drop-shadow-[0_0_15px_rgba(255,209,220,0.3)]">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9b8d90] font-sans">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Rotating Quote Card */}
      {quoteOfTheDay && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="glass-panel p-8 max-w-2xl w-full text-center relative mb-24"
        >
          <Quote className="w-8 h-8 text-[#b794f4]/40 mx-auto mb-4" />
          <p className="font-serif italic text-lg sm:text-xl text-[#2d141c] font-light leading-relaxed">
            "{quoteOfTheDay}"
          </p>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#b794f4] block mt-6">
            Today's Midnight Note
          </span>
        </motion.div>
      )}

      {/* Chapters Grid Header */}
      <div className="w-full max-w-5xl mb-10 flex justify-between items-end border-b border-black/10 pb-4 px-2">
        <h3 className="text-xl sm:text-2xl font-serif text-[#2d141c] flex items-center gap-3">
          <Heart className="w-5 h-5 text-[#ffd1dc]" />
          <span>Timeline Portals</span>
        </h3>
        <span className="text-xs uppercase tracking-[0.1em] text-[#9b8d90]">5 Portals • Weekly Release</span>
      </div>

      {/* Chapters Portal Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 w-full max-w-6xl mb-24">
        {CHAPTERS.map((ch, index) => {
          const isUnlocked = unlockedState[index];
          const unlockLabel = new Date(ch.unlockDate).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          });

          return (
            <motion.div
              key={ch.id}
              whileHover={{ y: isUnlocked ? -8 : 0 }}
              className={`glass-panel overflow-hidden p-6 flex flex-col justify-between h-[260px] transition-all duration-500 relative group ${
                isUnlocked 
                  ? 'bg-white/60 hover:bg-white/80 hover:border-[#b794f4]/30 hover:shadow-[0_0_25px_rgba(183,148,244,0.15)] cursor-pointer' 
                  : 'opacity-50 border-black/5 bg-white/30'
              }`}
            >
              {isUnlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#b794f4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              
              <div className="relative z-10">
                {/* Status Icon */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] text-[#9b8d90] uppercase tracking-[0.2em] font-sans">
                    July {ch.id === 5 ? '29' : (ch.id - 1) * 7 + 1}
                  </span>
                  
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4 text-[#ffd1dc] group-hover:scale-110 transition-transform" />
                  ) : (
                    <Lock className="w-4 h-4 text-[#9b8d90]" />
                  )}
                </div>

                <h4 className="text-base font-serif text-[#2d141c] mb-3 leading-snug">
                  {ch.title.split(': ')[1]}
                </h4>
                
                <p className="text-xs text-[#5e3e47]/70 line-clamp-3 leading-relaxed font-sans font-light">
                  {ch.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10">
                {isUnlocked ? (
                  <Link 
                    href={`/chapter/${ch.id}`}
                    className="inline-flex items-center gap-2 text-[11px] uppercase font-bold tracking-[0.1em] text-[#b794f4] hover:text-[#ffd1dc] transition-colors"
                  >
                    <span>Enter Portal</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <span className="text-[10px] uppercase font-semibold tracking-[0.1em] text-[#9b8d90]">
                    Unlocks {unlockLabel}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
