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
        { y: '100%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          stagger: 0.05,
          duration: 1.5,
          ease: 'power4.out',
          delay: 3.5 // Wait for preloader
        }
      );

      // Fade in subtitles and elements
      gsap.fromTo(
        '.hero-fade-in',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2, stagger: 0.2, ease: 'power3.out', delay: 4.5 }
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
        className="h-[100svh] w-full relative z-10 grid grid-cols-12 grid-rows-[auto_1fr_auto] p-6 md:p-12 overflow-hidden"
      >
        
        {/* Subtle top branding */}
        <div className="hero-fade-in col-span-12 flex justify-between text-[9px] uppercase tracking-[0.4em] text-[var(--muted)] font-sans">
          <span>Vol. I</span>
          <span>A Story of Us</span>
        </div>

        {/* Massive Editorial Heading */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center relative z-20 pointer-events-none mt-12 md:mt-0">
          <div className="overflow-hidden">
            <h1 
              ref={heroTextRef}
              className="font-serif text-[clamp(60px,12vw,200px)] leading-[0.85] tracking-[-0.04em] text-[var(--foreground)] uppercase"
            >
              The July<br />Issue
            </h1>
          </div>
          
          {/* Minimal Subtitles */}
          <div className="hero-fade-in flex flex-col gap-2 text-[var(--muted)] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-sans mt-12 pl-2">
            <span>One Extraordinary Person</span>
            <span className="text-[var(--accent-gold)]">&mdash; Five Chapters &mdash;</span>
          </div>
        </div>

        {/* Background Interactive Book with Mouse Parallax - Moved to the right */}
        <motion.div 
          ref={bookContainerRef}
          style={{ y: yBook }}
          className="hero-fade-in absolute right-[-20%] top-[50%] md:top-[40%] -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-20 md:opacity-40 mix-blend-multiply pointer-events-none z-0"
        >
          <Book3D unlocked={false} />
        </motion.div>

        {/* Rolling Luxury Countdown */}
        <div className="hero-fade-in col-span-12 md:col-span-4 flex md:flex-col justify-end md:justify-center items-end md:items-end gap-6 md:gap-12 z-20 pb-8 md:pb-0">
          <div className="flex gap-6 md:gap-10">
            <RollingDigits value={countdown.days} label="Days" />
            <RollingDigits value={countdown.hours} label="Hours" />
            <RollingDigits value={countdown.minutes} label="Mins" />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-fade-in col-span-12 flex justify-between items-end z-20 cursor-view">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--foreground)]">Begin Reading</span>
          <div className="w-[1px] h-12 bg-[var(--muted)]/20 relative overflow-hidden hidden md:block">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent-gold)] animate-[scrollDrop_2s_ease-in-out_infinite]" />
          </div>
        </div>
        
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
