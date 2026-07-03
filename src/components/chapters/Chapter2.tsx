'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEMORIES } from '@/config/content';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter2() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current || !containerRef.current) return;

    const sections = gsap.utils.toArray('.timeline-item');
    const scrollWidth = containerRef.current.offsetWidth - window.innerWidth;
    
    // Pin and scroll horizontally
    gsap.to(sections, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        pin: true,
        scrub: 1,
        end: () => "+=" + scrollWidth
      }
    });

    // Animate connecting line exactly matching scroll
    gsap.fromTo(lineRef.current, 
      { scaleX: 0 },
      { 
        scaleX: 1, 
        ease: "none", 
        scrollTrigger: {
          trigger: timelineRef.current,
          scrub: 1,
          start: "top top",
          end: () => "+=" + scrollWidth
        }
      }
    );
    
    // Image Parallax within horizontal scroll
    sections.forEach((section: HTMLElement) => {
      const img = section.querySelector('.parallax-img');
      const textBlock = section.querySelector('.parallax-text');
      
      if (img) {
        gsap.to(img, {
          x: 100, // Move image opposite to scroll direction
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            scrub: 1,
            start: "top top",
            end: () => "+=" + scrollWidth
          }
        });
      }
      
      if (textBlock) {
        gsap.to(textBlock, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            scrub: 1,
            start: "top top",
            end: () => "+=" + scrollWidth
          }
        });
      }
    });

  }, []);

  return (
    <div className="w-full bg-[var(--tertiary)] relative text-[var(--foreground)] overflow-hidden" ref={timelineRef}>
      
      {/* Chapter 2 Header - Pinned on the left */}
      <div className="absolute top-12 left-8 md:left-24 z-30 pointer-events-none mix-blend-multiply text-[var(--foreground)]">
        <span className="text-[9px] uppercase tracking-[0.4em] font-sans">Chapter 02</span>
        <h2 className="font-serif text-[clamp(40px,6vw,80px)] mt-4 font-light tracking-tight">Memories</h2>
      </div>

      {/* The Animated Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--foreground)]/10 z-0" />
      <div 
        ref={lineRef}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--accent-gold)] z-10 origin-left" 
      />

      {/* Horizontal Scroll Container */}
      <div className="h-screen flex items-center relative z-10" ref={containerRef} style={{ width: `${MEMORIES.length * 80 + 20}vw` }}>
        
        {MEMORIES.map((memory, index) => {
          const isImage = memory.mediaType === 'image';
          
          return (
            <div 
              key={memory.id} 
              className="timeline-item w-[80vw] h-full flex flex-col items-center justify-center relative flex-shrink-0 px-4 md:px-0"
            >
              
              {/* Massive Year/Date Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-serif text-[var(--background)] opacity-50 whitespace-nowrap -z-10 select-none tracking-tighter mix-blend-overlay">
                {memory.date.split(' ')[1] || memory.date}
              </div>

              {/* Memory Content Spread */}
              <div className={`flex w-full max-w-5xl ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} items-center justify-between gap-16 lg:gap-24 relative`}>
                
                {/* Visual */}
                <div className="w-full md:w-[45vw] lg:w-[400px] aspect-[4/5] bg-[var(--background)] p-4 shadow-2xl relative group overflow-hidden cursor-view z-10">
                  <div className="w-full h-full overflow-hidden bg-[var(--foreground)] relative">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={memory.mediaUrl} 
                        alt={memory.title} 
                        className="parallax-img absolute top-0 -left-[10%] w-[120%] h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[var(--accent-gold)] font-serif italic text-3xl">Voice Note</span>
                      </div>
                    )}
                  </div>
                  {/* Tape */}
                  <div className={`absolute -top-3 ${index % 2 === 0 ? 'left-8' : 'right-8'} w-20 h-8 bg-white/40 backdrop-blur-md rotate-[-3deg] shadow-sm border border-white/50 z-20`} />
                </div>

                {/* Text Node */}
                <div className="parallax-text w-full md:w-1/2 max-w-md relative z-20 p-8 md:p-0">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="w-8 h-[1px] bg-[var(--accent-gold)]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] font-sans">{memory.date}</span>
                  </div>
                  <h3 className="font-serif text-[clamp(40px,5vw,60px)] mb-6 leading-[1.1] text-[var(--foreground)] tracking-tight">
                    {memory.title}
                  </h3>
                  <p className="text-lg font-light text-[var(--muted)] leading-[1.8] tracking-wide font-sans mb-8">
                    {memory.description}
                  </p>
                  
                  {/* Annotation */}
                  <div className="font-handwritten text-3xl text-[var(--foreground)] opacity-70 rotate-[-2deg] bg-white/40 backdrop-blur-sm p-4 inline-block shadow-sm">
                    {memory.caption.split(' ').slice(0, 6).join(' ')}...
                  </div>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
