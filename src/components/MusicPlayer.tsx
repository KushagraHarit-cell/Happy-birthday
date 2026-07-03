'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { Howl } from 'howler';
import { SONGS } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const soundRef = useRef<Howl | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    // Only load audio after user interaction
    if (!hasInteracted) return;

    if (soundRef.current) {
      soundRef.current.unload();
    }

    soundRef.current = new Howl({
      src: [SONGS[currentSongIndex].url],
      html5: true,
      volume: 0.5,
      onplay: () => setIsPlaying(true),
      onpause: () => setIsPlaying(false),
      onend: () => handleNext()
    });

    if (isPlaying) {
      soundRef.current.play();
    }

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSongIndex, hasInteracted]);

  const togglePlay = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsPlaying(true);
      return;
    }

    if (isPlaying) {
      soundRef.current?.pause();
    } else {
      soundRef.current?.play();
    }
  };

  return (
    <div 
      className="fixed bottom-8 left-8 z-[100] flex items-center gap-4 transition-transform duration-500 hover:translate-x-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Vinyl Record */}
      <div 
        className="relative w-16 h-16 rounded-full bg-[#111111] border-[3px] border-[#222222] shadow-xl flex items-center justify-center cursor-pointer overflow-hidden z-20"
        onClick={togglePlay}
        style={{
          animation: isPlaying ? 'spin 4s linear infinite' : 'none'
        }}
      >
        {/* Record Grooves */}
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div className="absolute inset-3 rounded-full border border-white/5" />
        
        {/* Record Label (Album Art representation) */}
        <div className="w-6 h-6 rounded-full bg-[var(--accent-gold)] flex items-center justify-center z-10 border border-[#111111]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#f6f3ee]" /> {/* Spindle hole */}
        </div>
      </div>

      {/* Controls Panel (Expands on hover) */}
      <div 
        className={`bg-white shadow-lg border border-[var(--secondary)] rounded-full py-2 px-4 flex items-center gap-4 transition-all duration-500 origin-left ${
          isHovered || isPlaying ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col min-w-[120px]">
          <span className="text-xs font-serif truncate font-bold text-[var(--foreground)]">{SONGS[currentSongIndex].title}</span>
          <span className="text-[9px] uppercase tracking-widest text-[var(--muted)] truncate">{SONGS[currentSongIndex].artist}</span>
        </div>

        <div className="flex items-center gap-3 border-l border-[var(--secondary)] pl-4">
          <button onClick={handlePrev} className="text-[var(--muted)] hover:text-[var(--accent-gold)] transition-colors">
            <SkipBack className="w-4 h-4" />
          </button>
          
          <button onClick={togglePlay} className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors">
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          
          <button onClick={handleNext} className="text-[var(--muted)] hover:text-[var(--accent-gold)] transition-colors">
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
