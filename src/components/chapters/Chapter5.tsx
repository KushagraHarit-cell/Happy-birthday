'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Volume2, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Chapter5() {
  const [candleLit, setCandleLit] = useState(true);
  const [showGift, setShowGift] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Trigger continuous confetti when candle is blown
  const triggerConfetti = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#b794f4', '#ffd1dc', '#f8f9fa', '#a855f7']
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#b794f4', '#ffd1dc', '#f8f9fa', '#a855f7']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleBlowCandle = () => {
    if (candleLit) {
      setCandleLit(false);
      triggerConfetti();
    }
  };

  // Canvas Fireworks effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      gravity: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.gravity = 0.05;
      }

      update() {
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.015;
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, 2, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.shadowBlur = 8;
        c.shadowColor = this.color;
        c.fill();
        c.restore();
      }
    }

    class Firework {
      x: number;
      y: number;
      targetY: number;
      vy: number;
      exploded: boolean;
      particles: Particle[];
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height;
        this.targetY = Math.random() * (canvas!.height * 0.5);
        this.vy = -(Math.random() * 5 + 6);
        this.exploded = false;
        this.particles = [];
        const colors = ['#b794f4', '#ffd1dc', '#f8f9fa', '#e1e2e7', '#a17be0'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        if (!this.exploded) {
          this.y += this.vy;
          if (this.y <= this.targetY) {
            this.exploded = true;
            this.explode();
          }
        } else {
          this.particles.forEach(p => p.update());
          this.particles = this.particles.filter(p => p.alpha > 0);
        }
      }

      explode() {
        for (let i = 0; i < 40; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      draw(c: CanvasRenderingContext2D) {
        if (!this.exploded) {
          c.beginPath();
          c.arc(this.x, this.y, 3, 0, Math.PI * 2);
          c.fillStyle = this.color;
          c.fill();
        } else {
          this.particles.forEach(p => p.draw(c));
        }
      }
    }

    let fireworks: Firework[] = [];

    const animate = () => {
      ctx.fillStyle = 'rgba(17, 20, 23, 0.2)'; // trail effect on dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.04) {
        fireworks.push(new Firework());
      }

      fireworks.forEach(f => {
        f.update();
        f.draw(ctx);
      });

      fireworks = fireworks.filter(f => !f.exploded || f.particles.length > 0);
      animId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const galleryImages = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 relative z-10 text-center">
      
      {/* Background Fireworks Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Chapter Header */}
      <div className="mb-12 relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#b794f4]/15 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-[#b794f4]/10 text-[#b794f4] border border-[#b794f4]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>July 29 - Chapter Five</span>
        </motion.div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#2d141c] font-serif mb-4 relative z-10 drop-shadow-lg">
          Happy Birthday, My Love!
        </h1>
        <p className="text-[#5e3e47]/80 max-w-md mx-auto text-sm sm:text-base font-light relative z-10">
          Today, the universe celebrates you. Blow out the candle to unlock your birthday letter.
        </p>
      </div>

      {/* Interactive Cake Section */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-16">
        
        {/* The Candle blowing interactive panel */}
        <div className="h-64 flex flex-col justify-end items-center relative mb-6">
          
          {/* Flame element */}
          <AnimatePresence>
            {candleLit && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  scaleY: [1, 1.15, 0.9, 1.1, 1],
                  rotate: [-1, 2, -2, 1, 0]
                }}
                exit={{ opacity: 0, scale: 0, y: -20 }}
                className="absolute bottom-28 w-4 h-9 bg-gradient-to-t from-[#ffd1dc] via-white to-transparent rounded-full blur-[2px] cursor-pointer shadow-[0_0_20px_rgba(255,209,220,0.8)]"
                style={{ originY: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                onClick={handleBlowCandle}
              />
            )}
          </AnimatePresence>

          {/* Candle stick */}
          <div className="w-2.5 h-12 bg-white/80 rounded-t-sm border border-white/30 shadow-inner z-10 backdrop-blur-sm" />

          {/* Cake Layers (Vector/CSS representation) */}
          <div className="w-48 h-10 bg-[#ffd1dc] rounded-t-xl border border-[#e7bbc6] shadow-[0_0_15px_rgba(255,209,220,0.3)] flex items-center justify-center text-[#111417] text-xs font-bold tracking-widest uppercase">
            💖 Love Layer 💖
          </div>
          <div className="w-56 h-12 bg-[#b794f4] rounded-t-lg border border-[#a17be0] shadow-[0_0_20px_rgba(183,148,244,0.3)] flex items-center justify-center text-[#111417] text-sm font-bold tracking-[0.2em]">
            🍰 HAPPY BIRTHDAY 🍰
          </div>
        </div>

        {/* Blow trigger helper */}
        {candleLit ? (
          <button 
            onClick={handleBlowCandle}
            className="py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 border border-black/20 text-[#2d141c] text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse cursor-pointer backdrop-blur-md transition-all"
          >
            🎂 Click to Blow Candle
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-[#ffd1dc] font-bold uppercase tracking-[0.2em] bg-[#f0eaf5]lack/40 px-4 py-2 rounded-full border border-black/10 backdrop-blur-sm"
          >
            🕯️ Candle blown! Wishing you a magical year ahead.
          </motion.div>
        )}
      </div>

      {/* Birthday Letter Card */}
      <AnimatePresence>
        {!candleLit && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel border-black/10 bg-white/80 backdrop-blur-xl max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative mb-20 text-left"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#ffd1dc] mb-6 text-center drop-shadow-md">
              A Love Letter for Your Birthday
            </h3>
            
            <div className="handwritten text-xl text-[#2d141c] leading-loose space-y-6 opacity-90 tracking-wide">
              <p>To my favorite human in the entire world,</p>
              <p>
                Today is my favorite day of the year, because it is the day you were born. The world became a much sweeter, brighter, and more beautiful place when you entered it.
              </p>
              <p>
                I count myself as the luckiest person alive to be able to share in your life, to hear your laugh, and to love you. You are everything I could have ever dreamed of and so much more.
              </p>
              <p>
                May this year bring you all the happiness, peace, and dreams you deserve. I promise to be right by your side, celebrating your highs and holding you during the lows. 
              </p>
              <p className="text-right mt-8 text-[#b794f4]">Happy Birthday, my whole world. ❤️</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Photo Gallery */}
      <div className="relative z-10 mb-20 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-[#2d141c] mb-8 flex items-center justify-center gap-3 font-serif">
          <Camera className="w-6 h-6 text-[#b794f4]" />
          <span className="tracking-wide">Cinematic Gallery of Us</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2, zIndex: 20 }}
              className="aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Final Gift Reveal Button */}
      <div className="relative z-10 mb-12">
        <button
          onClick={() => setShowGift(true)}
          className="inline-flex items-center gap-3 py-4 px-10 rounded-full bg-gradient-to-r from-[#b794f4] to-[#ffd1dc] hover:opacity-90 text-[#111417] font-bold text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(183,148,244,0.4)] transition-all duration-300 transform hover:scale-105 cursor-pointer uppercase"
        >
          <Gift className="w-5 h-5 fill-current" />
          <span>REVEAL FINAL GIFT</span>
        </button>
      </div>

      {/* Final Gift Reveal Modal */}
      <AnimatePresence>
        {showGift && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f0eaf5]lack/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel border-black/10 max-w-md w-full rounded-3xl p-10 text-center bg-white relative overflow-hidden shadow-[0_0_50px_rgba(183,148,244,0.2)]"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#b794f4]/10 to-transparent pointer-events-none" />
              
              <h4 className="text-2xl sm:text-3xl font-bold font-serif text-[#ffd1dc] mb-4">
                My Promise To You 🎁
              </h4>
              <p className="text-base text-[#5e3e47] leading-relaxed mb-8 font-light italic">
                "My final gift to you is not in code, pixels, or pages. It is my promise to stand by you, to love you unconditionally, and to cherish every single second we get to spend in this life together. You are my home."
              </p>
              
              <button
                onClick={() => setShowGift(false)}
                className="py-3 px-8 rounded-full bg-white/5 hover:bg-white/10 border border-black/20 text-[#2d141c] text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer backdrop-blur-sm"
              >
                Close with Love
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
