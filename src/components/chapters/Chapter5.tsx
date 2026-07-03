'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SECRET_PASSWORD } from '@/config/content';

export default function Chapter5() {
  const [stage, setStage] = useState(-1);
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  // Authentication for this final chapter
  const handleUnlock = () => {
    if (password.toLowerCase().replace(/\s/g, '') === SECRET_PASSWORD) {
      setUnlocked(true);
      setStage(0);
    } else {
      alert("Incorrect password. Hint: It's how long I'll love you.");
    }
  };

  // Cinematic Sequence
  useEffect(() => {
    if (!unlocked || stage < 0) return;

    const sequence = [
      { delay: 3000, nextStage: 1 }, // 0: "Today is your day." -> 1: Stars appear
      { delay: 4000, nextStage: 2 }, // 1 -> 2: Photo fades in
      { delay: 4000, nextStage: 3 }, // 2 -> 3: Fireflies & Letter
      { delay: 5000, nextStage: 4 }, // 3 -> 4: Confetti & Fireworks
      { delay: 5000, nextStage: 5 }  // 4 -> 5: Final gift reveal
    ];

    if (stage < sequence.length) {
      const timer = setTimeout(() => {
        setStage(sequence[stage].nextStage);
        
        // Trigger confetti on stage 4
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
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#b8925e', '#ffffff', '#ffd1dc']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#b8925e', '#ffffff', '#ffd1dc']
      });
    }, 250);
  };

  if (!unlocked) {
    return (
      <div className="w-full min-h-screen bg-[var(--background)] py-32 px-4 flex flex-col items-center justify-center">
        <div className="max-w-md w-full bg-white p-12 shadow-2xl border border-[var(--secondary)] text-center">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Final Chapter</span>
          <h2 className="font-serif text-4xl mt-4 mb-8">The July Issue Finale</h2>
          <p className="text-[var(--muted)] font-light mb-8">Please enter the secret password to unlock your final surprise.</p>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-[var(--muted)]/30 bg-transparent text-center font-serif text-2xl outline-none focus:border-[var(--accent-gold)] transition-colors mb-8 pb-2"
            placeholder="Password..."
            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
          />
          <button 
            onClick={handleUnlock}
            className="w-full py-4 bg-[var(--foreground)] text-[var(--background)] uppercase tracking-widest text-xs hover:bg-[var(--accent-gold)] transition-colors"
          >
            Unlock
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      
      <AnimatePresence mode="wait">
        
        {/* Stage 0: Black Screen, one sentence */}
        {stage === 0 && (
          <motion.div
            key="stage0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-light tracking-wide text-center">
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
            transition={{ duration: 3 }}
            className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        )}

        {/* Stage 2: Photo fades in */}
        {stage >= 2 && (
          <motion.div
            key="photo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          >
            <div className="w-[300px] md:w-[500px] aspect-[4/5] bg-white p-4 shadow-2xl rotate-2">
              <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800" alt="Us" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}

        {/* Stage 3: Letter appears over photo */}
        {stage >= 3 && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="absolute z-20 flex flex-col items-center justify-center text-center max-w-2xl px-6"
          >
            <div className="bg-white/10 backdrop-blur-md p-12 border border-white/20 shadow-2xl">
              <h2 className="font-serif text-5xl mb-6 text-[#F6F3EE]">Happy Birthday.</h2>
              <p className="font-handwritten text-3xl leading-relaxed text-[#ECE7DF]">
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
            transition={{ duration: 3 }}
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center text-center px-4"
          >
            <h1 className="font-serif text-3xl md:text-5xl text-[#F6F3EE] mb-16 font-light">
              Thank you for letting me be part of your story.
            </h1>
            <div className="flex flex-col gap-2 text-xs uppercase tracking-widest text-[#B8925E]">
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
