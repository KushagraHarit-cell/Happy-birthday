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
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);

  // Authentication for this final chapter
  const handleUnlock = () => {
    if (password.toLowerCase().replace(/\s/g, '') === SECRET_PASSWORD) {
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
      alert("Incorrect password. Hint: It's how long I'll love you.");
    }
  };

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

  const fireworks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 60 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#C2A578', '#ffffff', '#F3F1EC']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#C2A578', '#ffffff', '#F3F1EC']
      });
    }, 250);
  };

  if (!unlocked) {
    return (
      <div className="w-full min-h-screen bg-[var(--background)] py-32 px-4 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-white p-16 shadow-2xl border border-[var(--secondary)] text-center relative overflow-hidden">
          {/* Subtle noise over the lock card */}
          <div className="absolute inset-0 film-grain opacity-20 pointer-events-none" />

          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent-gold)] relative z-10">Final Chapter</span>
          <h2 className="font-serif text-5xl mt-6 mb-8 font-light relative z-10">The July Issue Finale</h2>
          <p className="text-[var(--muted)] font-light mb-12 text-lg relative z-10">Please enter the secret password to unlock your final surprise.</p>
          
          <div className="relative z-10 mb-12">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-[var(--muted)]/30 bg-transparent text-center font-serif text-4xl outline-none focus:border-[var(--accent-gold)] transition-colors pb-4 placeholder:text-[var(--muted)]/20"
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>

          <MagneticButton 
            onClick={handleUnlock}
            className="w-full py-5 bg-[var(--foreground)] text-[var(--background)] uppercase tracking-[0.2em] text-[10px] hover:bg-[var(--accent-gold)] transition-colors duration-500 relative z-10"
          >
            Unlock Finale
          </MagneticButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white relative overflow-hidden flex items-center justify-center">
      
      {/* Hidden audio element for cinematic score */}
      {/* Using a subtle ambient track placeholder, can be replaced by actual track */}
      <audio ref={bgAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-ambient-ethereal-atmosphere-2947.mp3" loop />

      <AnimatePresence mode="wait">
        
        {/* Stage 0: Black Screen, one sentence */}
        {stage === 0 && (
          <motion.div
            key="stage0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 2 } }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex items-center justify-center z-50 bg-[#050505]"
          >
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-wide text-center text-[#F3F1EC]">
              Today is your day.
            </h1>
          </motion.div>
        )}

        {/* Stage 1: Stars appear */}
        {stage >= 1 && (
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
            className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
          </motion.div>
        )}

        {/* Stage 2: Photo fades in */}
        {stage >= 2 && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[300px] md:w-[450px] aspect-[4/5] bg-[#F3F1EC] p-4 shadow-2xl rotate-2 border border-[#EBE8E2]/20">
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" alt="Us" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </motion.div>
        )}

        {/* Stage 3: Letter appears over photo */}
        {stage >= 3 && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 1 }}
            className="absolute z-20 flex flex-col items-center justify-center text-center max-w-2xl px-6"
          >
            <div className="bg-black/40 backdrop-blur-xl p-16 border border-white/10 shadow-2xl">
              <h2 className="font-serif text-6xl md:text-7xl mb-8 text-[#C2A578] font-light">Happy Birthday.</h2>
              <p className="font-handwritten text-3xl md:text-5xl leading-relaxed text-[#F3F1EC]">
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
            transition={{ duration: 4 }}
            className="absolute inset-0 z-[60] bg-[#050505] flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="font-serif text-4xl md:text-6xl text-[#F3F1EC] mb-20 font-light leading-tight">
              Thank you for letting me <br className="hidden md:block"/> be part of your story.
            </h1>
            <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.3em] text-[#C2A578]">
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
