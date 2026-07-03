'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SECRET_PASSWORD } from '@/config/content';
import MagneticButton from '../ui/MagneticButton';

export default function Chapter5() {
  const [stage, setStage] = useState(-1);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Authentication for this final chapter
  const handleUnlock = () => {
    if (password.toLowerCase().replace(/\s/g, '') === SECRET_PASSWORD) {
      setError(false);
      setUnlocked(true);
      setStage(0);
      
      // Start hidden background ambiance
      if (bgAudioRef.current) {
        bgAudioRef.current.volume = 0;
        bgAudioRef.current.play().catch(e => console.log('Audio blocked', e));
        
        // Fade in audio
        let vol = 0;
        const fadeAudio = setInterval(() => {
          if (vol < 0.4) {
            vol += 0.05;
            if(bgAudioRef.current) bgAudioRef.current.volume = vol;
          } else {
            clearInterval(fadeAudio);
          }
        }, 500);
      }
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  function fireworks() {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#B89C76', '#ffffff', '#FAF9F6']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#B89C76', '#ffffff', '#FAF9F6']
      });
    }, 250);
  }

  // Cinematic Sequence
  useEffect(() => {
    if (!unlocked || stage < 0) return;

    const sequence = [
      { delay: 4000, nextStage: 1 }, // 0: "Today is your day." -> 1: Stars appear
      { delay: 5000, nextStage: 2 }, // 1 -> 2: Photo fades in
      { delay: 5000, nextStage: 3 }, // 2 -> 3: Fireflies & Letter
      { delay: 6000, nextStage: 4 }, // 3 -> 4: Confetti & Fireworks
      { delay: 8000, nextStage: 5 }  // 4 -> 5: Final gift reveal
    ];

    if (stage < sequence.length) {
      const timer = setTimeout(() => {
        setStage(sequence[stage].nextStage);
        
        // Trigger high-quality fireworks on stage 4
        if (sequence[stage].nextStage === 4) {
          fireworks();
        }
      }, sequence[stage].delay);
      return () => clearTimeout(timer);
    }
  }, [stage, unlocked]);

  if (!unlocked) {
    return (
      <div className="w-full min-h-screen bg-[var(--background)] flex items-center justify-center relative overflow-hidden">
        {/* Subtle animated background lines */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--foreground)]" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[var(--foreground)]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg w-full px-6 flex flex-col items-center text-center relative z-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">Final Chapter</span>
            <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
          </div>
          
          <h2 className="font-serif text-[clamp(40px,6vw,70px)] font-light text-[var(--foreground)] leading-[1.1] tracking-tight mb-8">
            The July Issue<br/>Finale
          </h2>
          
          <p className="text-[var(--muted)] font-sans font-light leading-[1.8] text-lg mb-16 max-w-sm">
            Please enter the secret password to unlock your final surprise.
          </p>
          
          <div className="relative w-full max-w-sm mb-12">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border-b ${error ? 'border-red-400 text-red-500' : 'border-[var(--muted)]/30 text-[var(--foreground)]'} text-center font-serif text-3xl outline-none focus:border-[var(--accent-gold)] transition-colors pb-4 placeholder:text-[var(--muted)]/20 tracking-[0.5em]`}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  className="absolute -bottom-8 left-0 right-0 text-red-400 text-[10px] uppercase tracking-widest font-sans"
                >
                  Incorrect. Hint: forever and always.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MagneticButton 
            onClick={handleUnlock}
            className="px-12 py-4 border border-[var(--foreground)]/10 text-[var(--foreground)] text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-all duration-500"
          >
            Unlock Finale
          </MagneticButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#FAF9F6] relative overflow-hidden flex items-center justify-center cursor-default">
      
      <audio ref={bgAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-ambient-ethereal-atmosphere-2947.mp3" loop />

      <AnimatePresence mode="wait">
        
        {/* Stage 0: Black Screen, one sentence */}
        {stage === 0 && (
          <motion.div
            key="stage0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-[#050505]"
          >
            <h1 className="font-serif text-[clamp(40px,5vw,70px)] font-light tracking-wide text-center text-[#F3F0E6]">
              Today is your day.
            </h1>
          </motion.div>
        )}

        {/* Stage 1: Stars appear */}
        {stage >= 1 && (
          <motion.div
            key="stars"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </motion.div>
        )}

        {/* Stage 2: Photo fades in */}
        {stage >= 2 && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-[80vw] md:w-[450px] aspect-[4/5] bg-white p-4 pb-16 cinematic-shadow relative border border-white/10 group">
              {/* Paper Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-md shadow-sm border border-white/20 z-20" />
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" alt="Us" className="w-full h-full object-cover grayscale opacity-90 transition-all duration-1000" />
            </div>
          </motion.div>
        )}

        {/* Stage 3: Letter appears over photo */}
        {stage >= 3 && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
          >
            <div className="bg-black/30 backdrop-blur-2xl p-12 md:p-24 border border-white/10 cinematic-shadow max-w-3xl">
              <h2 className="font-serif text-[clamp(50px,8vw,90px)] mb-12 text-[#B89C76] font-light leading-none">
                Happy Birthday.
              </h2>
              <p className="font-handwritten text-[clamp(30px,4vw,50px)] leading-[1.6] text-[#FAF9F6]">
                Thank you for letting me be part of your story. Every moment with you is a gift I never knew I needed. Here is to a million more memories.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stage 5: Final Reveal & Ending */}
        {stage >= 5 && (
          <motion.div
            key="ending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="font-serif text-[clamp(40px,6vw,70px)] text-[#FAF9F6] mb-24 font-light leading-[1.3] tracking-wide">
              Thank you for letting me <br className="hidden md:block"/> be part of your story.
            </h1>
            <div className="flex flex-col gap-6 text-[9px] uppercase tracking-[0.4em] text-[#B89C76] font-sans">
              <span className="w-1 h-1 rounded-full bg-[#B89C76] mx-auto" />
              <span>Volume I</span>
              <span>The Story of Us</span>
              <span>First Edition</span>
              <span>Only One Copy Exists</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
