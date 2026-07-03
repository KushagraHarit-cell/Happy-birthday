'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import dynamic from 'next/dynamic';
import RollingDigits from '@/components/ui/RollingDigits';
import MagazineStack from '@/components/MagazineStack';

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

    // Split text for character stagger
    const splitText = new SplitType(heroTextRef.current, { types: 'chars' });

    gsap.fromTo(
      splitText.chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1.8,
        ease: 'power4.out',
        delay: 3.2 // Wait for preloader
      }
    );

    gsap.fromTo(
      '.hero-fade-in',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 2, stagger: 0.3, ease: 'power3.out', delay: 4.5 }
    );

    // Mouse parallax for the book
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to(bookContainerRef.current, {
        x: x,
        y: y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Parallax scroll for hero section
    gsap.to(containerRef.current, {
      yPercent: 20,
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
    };
  }, []);

  return (
    <div className="w-full flex flex-col relative overflow-hidden bg-[var(--background)]">
      
      {/* Hero Section */}
      <section 
        ref={containerRef}
        className="h-screen w-full flex flex-col items-center justify-center pt-24 px-4 relative"
      >
        
        {/* Editorial Heading */}
        <h1 
          ref={heroTextRef}
          className="font-serif text-[clamp(60px,12vw,140px)] leading-[0.85] tracking-tighter text-center mb-10 text-[var(--foreground)] uppercase"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 120%, 0% 120%)' }}
        >
          The July Issue
        </h1>
        
        {/* Minimal Subtitles */}
        <div className="hero-fade-in flex flex-col items-center gap-3 mb-20 text-[var(--muted)] text-xs md:text-sm tracking-[0.2em] uppercase font-sans">
          <span>One Story.</span>
          <span>Five Chapters.</span>
          <span>One Extraordinary Person.</span>
        </div>

        {/* Rolling Luxury Countdown */}
        <div className="hero-fade-in flex gap-6 md:gap-12 items-center justify-center mb-20">
          <RollingDigits value={countdown.days} label="Days" />
          <span className="text-[var(--accent-gold)] font-light text-3xl md:text-5xl -mt-6">:</span>
          <RollingDigits value={countdown.hours} label="Hours" />
          <span className="text-[var(--accent-gold)] font-light text-3xl md:text-5xl -mt-6">:</span>
          <RollingDigits value={countdown.minutes} label="Mins" />
          <span className="text-[var(--accent-gold)] font-light text-3xl md:text-5xl -mt-6">:</span>
          <RollingDigits value={countdown.seconds} label="Secs" />
        </div>

        {/* Interactive Book with Mouse Parallax */}
        <div 
          ref={bookContainerRef}
          className="hero-fade-in absolute top-[10%] md:top-[15%] right-[-10%] md:right-[5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-30 mix-blend-multiply pointer-events-none z-0"
        >
          <Book3D unlocked={false} />
        </div>

        {/* Scroll Indicator */}
        <div className="hero-fade-in absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-[var(--muted)] cursor-pointer">
          <span className="text-[9px] uppercase tracking-widest">Scroll to read</span>
          <div className="w-[1px] h-16 bg-[var(--muted)]/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--accent-gold)] animate-[scrollDrop_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes scrollDrop {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>

      {/* Chapters Magazine Stack Placeholder */}
      <section className="w-full bg-[var(--foreground)] text-[var(--secondary)] py-40 px-4 flex flex-col items-center relative z-20">
        <h2 className="font-serif text-[clamp(40px,8vw,80px)] mb-32 font-light">The Chapters</h2>
        <MagazineStack />
      </section>

    </div>
  );
}
