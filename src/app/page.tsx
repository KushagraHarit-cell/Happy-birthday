'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Book3D from '@/components/Book3D';
import MagazineStack from '@/components/MagazineStack';
import { CHAPTERS } from '@/config/content';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Cinematic Intro Animations
  useEffect(() => {
    if (!heroTextRef.current) return;

    // Split text for character stagger
    const splitText = new SplitType(heroTextRef.current, { types: 'chars' });

    gsap.fromTo(
      splitText.chars,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1.5,
        ease: 'power4.out',
        delay: 3 // Wait for preloader
      }
    );

    gsap.fromTo(
      '.hero-fade-in',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 4 }
    );

    // Parallax scroll for hero section
    gsap.to(containerRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-hidden" ref={containerRef}>
      
      {/* Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center pt-20 px-4">
        
        {/* Editorial Heading */}
        <h1 
          ref={heroTextRef}
          className="title-hero text-center mb-8 uppercase tracking-tighter"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          The July Issue
        </h1>
        
        {/* Minimal Subtitles */}
        <div className="hero-fade-in text-center flex flex-col gap-2 mb-16 text-[var(--muted)] text-sm tracking-widest uppercase">
          <span>One story.</span>
          <span>Five chapters.</span>
          <span>One extraordinary person.</span>
        </div>

        {/* Rolling Countdown */}
        <div className="hero-fade-in flex gap-8 md:gap-16 items-center text-center font-serif text-3xl md:text-5xl mb-16">
          <div className="flex flex-col items-center">
            <span className="font-light">{String(countdown.days).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-sans mt-2">Days</span>
          </div>
          <span className="text-[var(--accent-gold)] font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="font-light">{String(countdown.hours).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-sans mt-2">Hours</span>
          </div>
          <span className="text-[var(--accent-gold)] font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="font-light">{String(countdown.minutes).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-sans mt-2">Mins</span>
          </div>
          <span className="text-[var(--accent-gold)] font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="font-light">{String(countdown.seconds).padStart(2, '0')}</span>
            <span className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-sans mt-2">Secs</span>
          </div>
        </div>

        {/* Interactive Book */}
        <div className="hero-fade-in w-full max-w-lg h-[400px]">
          <Book3D unlocked={false} onClick={() => alert('Chapter 1 is locked. Waiting for release date.')} />
        </div>

        <div className="hero-fade-in text-[10px] uppercase tracking-widest text-[var(--muted)] mt-8">
          Scroll to explore chapters
        </div>
      </section>

      {/* Chapters Magazine Stack Placeholder */}
      <section className="min-h-screen w-full bg-[var(--dark-section)] text-[var(--secondary)] py-32 px-4 flex flex-col items-center relative z-20">
        <h2 className="font-serif text-5xl mb-24">The Chapters</h2>
        <MagazineStack />
      </section>

    </div>
  );
}
