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
    sections.forEach((section: any) => {
      const img = section.querySelector('.parallax-img');
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
    });

  }, []);

  return (
    <div className="w-full bg-[var(--background)] relative text-[var(--foreground)] overflow-hidden" ref={timelineRef}>
      
      {/* Chapter 2 Header - Pinned on the left */}
      <div className="absolute top-12 left-8 md:left-24 z-20 pointer-events-none mix-blend-difference text-white">
        <span className="text-[10px] uppercase tracking-[0.3em]">Chapter 02</span>
        <h2 className="font-serif text-5xl md:text-8xl mt-4 font-light">Memories</h2>
      </div>

      {/* The Connecting Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--muted)]/20 z-0" />
      {/* The Animated Connecting Line */}
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
              className="timeline-item w-[80vw] h-full flex flex-col items-center justify-center relative flex-shrink-0"
            >
              
              {/* Massive Year/Date Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif text-[var(--secondary)] opacity-40 whitespace-nowrap -z-10 select-none tracking-tighter">
                {memory.date.split(' ')[1] || memory.date}
              </div>

              {/* Memory Content */}
              <div className={`flex w-full px-[10vw] ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'} items-center justify-between gap-12 lg:gap-32`}>
                
                {/* Visual */}
                <div className="w-[300px] md:w-[45vw] lg:w-[40vw] aspect-[4/3] bg-white p-4 lg:p-6 shadow-2xl border border-[var(--secondary)] relative group overflow-hidden cursor-view">
                  <div className="w-full h-full overflow-hidden bg-[var(--foreground)] flex items-center justify-center relative">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={memory.mediaUrl} 
                        alt={memory.title} 
                        className="parallax-img absolute top-0 -left-[50px] w-[calc(100%+100px)] h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                      />
                    ) : (
                      <div className="text-[var(--accent-gold)] font-serif italic text-2xl">Voice Note</div>
                    )}
                  </div>
                  {/* Tiny annotation */}
                  <div className="absolute -bottom-8 right-4 font-handwritten text-3xl text-[var(--muted)] -rotate-3 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg">
                    {memory.caption.split(' ').slice(0, 5).join(' ')}...
                  </div>
                </div>

                {/* Text Node */}
                <div className="max-w-md bg-[var(--background)]/80 backdrop-blur-md p-8 border border-[var(--secondary)] shadow-xl relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent-gold)] mb-4 block">{memory.date}</span>
                  <h3 className="font-serif text-4xl mb-6 leading-tight">{memory.title}</h3>
                  <p className="text-base font-light text-[var(--muted)] leading-relaxed">
                    {memory.description}
                  </p>
                </div>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
