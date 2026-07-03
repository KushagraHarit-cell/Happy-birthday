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
        className="relative w-16 h-16 rounded-full bg-[#111111] border border-white/10 cinematic-shadow flex items-center justify-center cursor-pointer overflow-hidden z-20 group"
        onClick={togglePlay}
        style={{
          animation: isPlaying ? 'spin 4s linear infinite' : 'none'
        }}
      >
        {/* Record Grooves */}
        <div className="absolute inset-1 rounded-full border border-white/5" />
        <div className="absolute inset-2 rounded-full border border-white/5" />
        <div className="absolute inset-[10px] rounded-full border border-white/5" />
        <div className="absolute inset-3 rounded-full border border-[var(--accent-gold)]/20" />
        
        {/* Light Reflection (Vinyl Sheen) */}
        <div className="absolute top-0 left-1/2 w-[200%] h-[200%] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity" />

        {/* Record Label (Album Art representation) */}
        <div className="w-5 h-5 rounded-full bg-[var(--accent-gold)] flex items-center justify-center z-10 border border-[#111111]">
          <div className="w-1 h-1 rounded-full bg-[var(--background)]" /> {/* Spindle hole */}
        </div>
      </div>

      {/* Controls Panel (Expands on hover) */}
      <div 
        className={`bg-[var(--background)] paper-shadow border border-[var(--muted)]/20 rounded-full py-2.5 px-6 flex items-center gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left -ml-6 pl-10 ${
          isHovered || isPlaying ? 'opacity-100 scale-x-100 translate-x-0' : 'opacity-0 scale-x-50 -translate-x-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col min-w-[140px]">
          <div className="flex items-center gap-2 mb-0.5">
            {isPlaying && (
              <div className="flex gap-0.5 items-center h-2">
                <span className="w-0.5 h-full bg-[var(--accent-gold)] animate-[eq_1s_ease-in-out_infinite]" />
                <span className="w-0.5 h-1/2 bg-[var(--accent-gold)] animate-[eq_1.2s_ease-in-out_infinite_0.2s]" />
                <span className="w-0.5 h-3/4 bg-[var(--accent-gold)] animate-[eq_0.8s_ease-in-out_infinite_0.4s]" />
              </div>
            )}
            <span className="text-xs font-serif font-medium text-[var(--foreground)] truncate">{SONGS[currentSongIndex].title}</span>
          </div>
          <span className="text-[8px] uppercase tracking-[0.3em] text-[var(--muted)] truncate font-sans">{SONGS[currentSongIndex].artist}</span>
        </div>

        <div className="flex items-center gap-4 border-l border-[var(--muted)]/20 pl-6">
          <button onClick={handlePrev} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300">
            <SkipBack className="w-4 h-4" strokeWidth={1.5} />
          </button>
          
          <button onClick={togglePlay} className="text-[var(--foreground)] hover:text-[var(--accent-gold)] transition-colors duration-300">
            {isPlaying ? <Pause className="w-5 h-5 fill-current" strokeWidth={1} /> : <Play className="w-5 h-5 fill-current" strokeWidth={1} />}
          </button>
          
          <button onClick={handleNext} className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-300">
            <SkipForward className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes eq {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
