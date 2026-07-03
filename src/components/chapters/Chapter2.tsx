'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEMORIES } from '@/config/content';

gsap.registerPlugin(ScrollTrigger);

export default function Chapter2() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;

    // Horizontal Scroll Trigger
    const sections = gsap.utils.toArray('.timeline-item');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: timelineRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + timelineRef.current!.offsetWidth * 2
      }
    });

    // Animate connecting line
    gsap.fromTo(lineRef.current, 
      { scaleX: 0 },
      { 
        scaleX: 1, 
        ease: "none", 
        scrollTrigger: {
          trigger: timelineRef.current,
          scrub: 1,
          start: "top top",
          end: () => "+=" + timelineRef.current!.offsetWidth * 2
        }
      }
    );
  }, []);

  return (
    <div className="w-full bg-[var(--background)] relative text-[var(--foreground)]" ref={timelineRef}>
      
      {/* Chapter 2 Header - Pinned on the left */}
      <div className="absolute top-12 left-12 z-20 pointer-events-none">
        <span className="text-xs uppercase tracking-widest text-[var(--accent-gold)]">Chapter 02</span>
        <h2 className="font-serif text-5xl md:text-7xl mt-4">Memories</h2>
      </div>

      {/* The Connecting Line Background */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--muted)]/20 z-0" />
      {/* The Animated Connecting Line */}
      <div 
        ref={lineRef}
        className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--foreground)] z-0 origin-left" 
      />

      {/* Horizontal Scroll Container */}
      <div className="h-screen flex items-center relative z-10 w-[400vw]">
        
        {MEMORIES.map((memory, index) => {
          const isImage = memory.mediaType === 'image';
          
          return (
            <div 
              key={memory.id} 
              className="timeline-item w-[100vw] h-full flex flex-col items-center justify-center px-12 relative flex-shrink-0"
            >
              
              {/* Massive Year/Date Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif text-[var(--secondary)] opacity-30 whitespace-nowrap -z-10 select-none">
                {memory.date.split(' ')[1] || memory.date}
              </div>

              {/* Memory Content */}
              <div className={`flex ${index % 2 === 0 ? 'flex-col' : 'flex-col-reverse'} items-center gap-12`}>
                
                {/* Visual */}
                <div className="w-[300px] md:w-[450px] aspect-[4/3] bg-white p-4 shadow-xl border border-[var(--secondary)] relative group">
                  <div className="w-full h-full overflow-hidden bg-[var(--dark-section)] flex items-center justify-center">
                    {isImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={memory.mediaUrl} alt={memory.title} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    ) : (
                      <div className="text-[var(--accent-gold)] font-serif italic text-2xl">Voice Note</div>
                    )}
                  </div>
                  {/* Tiny annotation */}
                  <div className="absolute -bottom-6 -right-6 font-handwritten text-xl text-[var(--muted)] -rotate-6">
                    {memory.caption.split(' ').slice(0, 5).join(' ')}...
                  </div>
                </div>

                {/* Text Node */}
                <div className="text-center max-w-sm">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--accent-gold)] mb-4 block">{memory.date}</span>
                  <h3 className="font-serif text-3xl mb-4">{memory.title}</h3>
                  <p className="text-sm font-light text-[var(--muted)] leading-relaxed">
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
