'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Play, Pause, SkipForward, Music, Disc, Volume2, CircleDot } from 'lucide-react';
import { SONGS, Song } from '@/config/content';
import { Howl } from 'howler';

export default function SongsPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  
  const soundRef = useRef<Howl | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong = SONGS[currentSongIndex];

  const initSong = (index: number, shouldPlay: boolean = false) => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [SONGS[index].url],
      html5: true,
      onplay: () => {
        setIsPlaying(true);
        startTracker();
      },
      onpause: () => {
        setIsPlaying(false);
        stopTracker();
      },
      onstop: () => {
        setIsPlaying(false);
        stopTracker();
        setTrackProgress(0);
      },
      onend: () => {
        handleNext();
      }
    });

    soundRef.current = sound;
    
    if (shouldPlay) {
      sound.play();
    }
  };

  const startTracker = () => {
    stopTracker();
    progressIntervalRef.current = setInterval(() => {
      if (soundRef.current && soundRef.current.playing()) {
        const seek = soundRef.current.seek() as number;
        const duration = soundRef.current.duration() as number;
        if (duration > 0) {
          setTrackProgress((seek / duration) * 100);
        }
      }
    }, 250);
  };

  const stopTracker = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handlePlayPause = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % SONGS.length;
    setCurrentSongIndex(nextIndex);
    initSong(nextIndex, true);
  };

  const handleSelectSong = (index: number) => {
    setCurrentSongIndex(index);
    initSong(index, true);
  };

  useEffect(() => {
    initSong(currentSongIndex, false);
    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
      stopTracker();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center">
      
      {/* Page Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-[#d4a373]/10 text-[#d4a373] border border-[#d4a373]/20 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Player</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#3d342d] font-serif mb-4">
          Our Playlist
        </h1>
        <p className="text-[#6d5e53] max-w-md mx-auto text-sm sm:text-base">
          Songs that remind me of us. Spin the vintage cassette tape and enjoy our tunes.
        </p>
      </div>

      {/* CASSETTE TAPE RECORDER INTERFACE */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#fdfbf7] border border-[#d4a373]/30 rounded-3xl p-6 shadow-md relative mb-12"
      >
        {/* Outer Cassette Plastic Body */}
        <div className="bg-[#faf6f0] rounded-2xl p-4 border border-[#d4a373]/15 shadow-inner flex flex-col justify-between relative overflow-hidden">
          {/* Label lines */}
          <div className="absolute top-2 inset-x-4 border-b border-[#d4a373]/10" />

          {/* Tape details & Title */}
          <div className="bg-[#e07a5f] border border-[#cb654b] rounded-lg p-2.5 text-center text-[#2d141c] mb-6 relative">
            <span className="absolute top-1 left-2 font-mono text-[8px] text-[#faf6f0]">A-SIDE</span>
            <span className="absolute top-1 right-2 font-mono text-[8px] text-[#faf6f0]">NR</span>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider truncate px-6">
              {currentSong.title}
            </h3>
            <p className="font-mono text-[9px] text-[#faf6f0] truncate">{currentSong.artist}</p>
          </div>

          {/* Cassette Center Glass Window */}
          <div className="h-24 bg-[#faf6f0] rounded-xl border border-[#d4a373]/20 shadow-inner relative flex justify-around items-center px-8 mb-4">
            
            {/* Left Spinning Reel */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-2 border-[#d4a373]/40 flex items-center justify-center bg-[#fdfbf7] relative"
              >
                {/* Teeth */}
                <div className="w-8 h-8 rounded-full border border-dashed border-[#d4a373]/20" />
                <CircleDot className="w-4 h-4 text-[#d4a373]/50 absolute" />
              </motion.div>
            </div>

            {/* Middle Tape view */}
            <div className="h-6 w-16 bg-[#faf6f0]/60 rounded-md border border-[#d4a373]/20 flex items-center justify-center overflow-hidden">
              <div className="h-0.5 bg-[#e07a5f]/40 w-full animate-pulse" />
            </div>

            {/* Right Spinning Reel */}
            <div className="relative">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-2 border-[#d4a373]/40 flex items-center justify-center bg-[#fdfbf7] relative"
              >
                <div className="w-8 h-8 rounded-full border border-dashed border-[#d4a373]/20" />
                <CircleDot className="w-4 h-4 text-[#d4a373]/50 absolute" />
              </motion.div>
            </div>
            
          </div>

          {/* Progress bar on tape */}
          <div className="w-full h-1.5 bg-[#faf6f0] rounded-full overflow-hidden shadow-inner relative mb-2">
            <div 
              className="h-full bg-gradient-to-r from-[#e07a5f] to-[#d4a373] rounded-full transition-all duration-300"
              style={{ width: `${trackProgress}%` }}
            />
          </div>
          <div className="flex justify-between font-mono text-[9px] text-[#8c7a6b] px-1">
            <span>{isPlaying ? "PLAYING" : "STOPPED"}</span>
            <span>SIDE A</span>
          </div>

        </div>

        {/* Tactical Buttons below tape */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePlayPause}
            className={`p-3.5 rounded-full border cursor-pointer transition-all duration-200 ${
              isPlaying 
                ? 'bg-[#e07a5f] text-[#2d141c] border-[#cb654b] shadow-md' 
                : 'bg-[#faf6f0] text-[#e07a5f] border-[#d4a373]/20 hover:bg-[#e07a5f]/5'
            }`}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
          </button>
          
          <button
            onClick={handleNext}
            className="p-3.5 rounded-full bg-[#faf6f0] text-[#e07a5f] border border-[#d4a373]/20 hover:bg-[#e07a5f]/5 transition-colors cursor-pointer"
            aria-label="Skip track"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>
      </motion.div>

      {/* SONGS PLAYLIST LIST */}
      <div className="w-full max-w-lg glass-panel border-[#d4a373]/25 rounded-2xl p-6 shadow-md bg-[#fdfbf7]">
        <h3 className="text-sm font-bold text-[#3d342d] mb-4 flex items-center gap-2 border-b border-[#d4a373]/15 pb-2">
          <Music className="w-4 h-4 text-[#e07a5f]" />
          <span>Track Selection</span>
        </h3>
        
        <div className="flex flex-col gap-2">
          {SONGS.map((song, idx) => {
            const isActive = currentSongIndex === idx;
            return (
              <button
                key={song.id}
                onClick={() => handleSelectSong(idx)}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#e07a5f]/10 border-[#e07a5f]/30 text-[#e07a5f] font-semibold' 
                    : 'bg-transparent border-transparent text-[#6d5e53] hover:bg-[#e07a5f]/5 hover:text-[#3d342d]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#8c7a6b]">{String(idx + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="text-xs">{song.title}</p>
                    <p className="text-[10px] text-[#8c7a6b] font-normal">{song.artist}</p>
                  </div>
                </div>
                
                <span className="text-[10px] font-mono font-semibold">{song.duration}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
