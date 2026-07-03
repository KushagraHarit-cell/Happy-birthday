'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import dynamic from 'next/dynamic';
import RollingDigits from '@/components/ui/RollingDigits';
import MagazineStack from '@/components/MagazineStack';
import { motion, useScroll, useTransform } from 'framer-motion';

// Dynamically import Book3D for performance
const Book3D = dynamic(() => import('@/components/Book3D'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookContainerRef = useRef<HTMLDivElement>(null);
  
  const [targetDate] = useState(new Date("2026-07-29T00:00:00").getTime());
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Update countdown
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
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
  }, [targetDate]);

  // Cinematic Intro & Mouse Parallax
  useEffect(() => {
    if (!heroTextRef.current || !containerRef.current || !bookContainerRef.current) return;

    // Wait slightly longer to ensure the font is loaded before splitting
    const timer = setTimeout(() => {
      if (!heroTextRef.current) return;
      
      const splitText = new SplitType(heroTextRef.current, { types: 'chars,words' });

      // Title Animation
      gsap.fromTo(
        splitText.chars,
        { y: 120, opacity: 0, rotateZ: 5 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          stagger: 0.04,
          duration: 2.2,
          ease: 'power4.out',
          delay: 3.5 // Wait for preloader
        }
      );

      // Fade in subtitles and elements
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.5, stagger: 0.4, ease: 'power3.out', delay: 4.8 }
      );
    }, 100);

    // Subtle Mouse parallax for the book
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      gsap.to(bookContainerRef.current, {
        x: x,
        y: y,
        rotationY: x * 0.5,
        rotationX: -y * 0.5,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Scale/Fade out hero on scroll down
    gsap.to(containerRef.current, {
      scale: 0.95,
      yPercent: 15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Parallax for the bottom section
  const { scrollYProgress } = useScroll();
  const yBook = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="w-full flex flex-col relative overflow-hidden bg-[var(--background)] min-h-screen">
      
      {/* Editorial Hero Section */}
      <section 
        ref={containerRef}
        className="h-screen w-full flex flex-col items-center justify-center pt-[15vh] px-4 relative z-10"
      >
        
        {/* Subtle top branding */}
        <div className="hero-fade-in absolute top-10 w-full flex justify-between px-12 text-[9px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">
          <span>Vol. I</span>
          <span>A Story of Us</span>
        </div>

        {/* Massive Editorial Heading */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-20 pointer-events-none">
          <h1 
            ref={heroTextRef}
            className="font-serif text-[clamp(70px,14vw,180px)] leading-[0.8] tracking-[-0.03em] text-center text-[var(--foreground)] uppercase pb-4"
            style={{ clipPath: 'polygon(0 -20%, 100% -20%, 100% 120%, 0% 120%)' }}
          >
            The July Issue
          </h1>
          
          <div className="hero-fade-in w-[1px] h-24 bg-gradient-to-b from-[var(--foreground)] to-transparent mt-12 mb-8" />
          
          {/* Minimal Subtitles */}
          <div className="hero-fade-in flex flex-col items-center gap-4 text-[var(--muted)] text-[11px] md:text-xs tracking-[0.3em] uppercase font-sans">
            <span>One Extraordinary Person</span>
            <span className="text-[var(--accent-gold)]">&mdash; Five Chapters &mdash;</span>
          </div>
        </div>

        {/* Rolling Luxury Countdown */}
        <div className="hero-fade-in absolute bottom-[20%] w-full flex justify-center z-20">
          <div className="flex gap-8 md:gap-16 items-center px-12 py-6 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-3xl cinematic-shadow">
            <RollingDigits value={countdown.days} label="Days" />
            <span className="text-[var(--muted)] font-serif italic text-2xl md:text-4xl -mt-6">,</span>
            <RollingDigits value={countdown.hours} label="Hours" />
            <span className="text-[var(--muted)] font-serif italic text-2xl md:text-4xl -mt-6">,</span>
            <RollingDigits value={countdown.minutes} label="Mins" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 z-20 cursor-view">
          <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--muted)] opacity-60">Begin</span>
          <div className="w-[1px] h-16 bg-[var(--muted)]/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent-gold)] animate-[scrollDrop_2s_ease-in-out_infinite]" />
          </div>
        </div>
        
        {/* Background Interactive Book with Mouse Parallax */}
        <motion.div 
          ref={bookContainerRef}
          style={{ y: yBook }}
          className="hero-fade-in absolute top-[40%] md:top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.15] mix-blend-multiply pointer-events-none z-0"
        >
          <Book3D unlocked={false} />
        </motion.div>
        
      </section>

      <style jsx>{`
        @keyframes scrollDrop {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>

      {/* Chapters Magazine Stack Placeholder */}
      <section className="w-full bg-[var(--foreground)] relative z-20 pt-[15vh]">
        {/* Soft gradient transition */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[var(--background)] to-transparent -translate-y-full z-30" />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="text-center mb-40">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent-gold)] block mb-6">The Collection</span>
            <h2 className="font-serif text-[clamp(40px,10vw,120px)] font-light text-[var(--secondary)] leading-none tracking-tight">Chapters</h2>
          </div>
          <MagazineStack />
        </div>
      </section>

    </div>
  );
}
