'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { SONGS } from '@/config/content';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  const soundRef = useRef<Howl | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const volumeRef = useRef(volume);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  const currentTrack = SONGS[currentTrackIndex];

  // Initialize howler sound
  const initSound = (index: number, shouldPlay: boolean = false) => {
    if (soundRef.current) {
      soundRef.current.unload();
    }

    const sound = new Howl({
      src: [SONGS[index].url],
      html5: true, // Force HTML5 Audio to support streaming large files without CORS issues
      volume: isMuted ? 0 : volumeRef.current,
      loop: true,
      onplay: () => {
        setIsPlaying(true);
        startProgressTracker();
      },
      onpause: () => {
        setIsPlaying(false);
        stopProgressTracker();
      },
      onstop: () => {
        setIsPlaying(false);
        stopProgressTracker();
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

  const startProgressTracker = () => {
    stopProgressTracker();
    progressIntervalRef.current = setInterval(() => {
      if (soundRef.current && soundRef.current.playing()) {
        const seek = soundRef.current.seek() as number;
        const duration = soundRef.current.duration() as number;
        if (duration > 0) {
          setTrackProgress((seek / duration) * 100);
        }
      }
    }, 500);
  };

  const stopProgressTracker = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  // Autoplay on first user interaction (Run once on mount to avoid loops)
  useEffect(() => {
    let initialized = false;

    const handleFirstInteraction = () => {
      if (!initialized) {
        initialized = true;
        setIsInitialized(true);
        // Play and fade in
        if (soundRef.current) {
          soundRef.current.play();
          soundRef.current.volume(0);
          soundRef.current.fade(0, volumeRef.current, 2500);
        }
        cleanupListeners();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    // Initial setup (unplayed)
    initSound(currentTrackIndex, false);

    return () => {
      cleanupListeners();
      if (soundRef.current) {
        soundRef.current.unload();
      }
      stopProgressTracker();
    };
  }, []); // Run only once to prevent pool exhaustion

  // Adjust volume
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % SONGS.length;
    setCurrentTrackIndex(nextIndex);
    initSound(nextIndex, true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Floating Cassette Widget */}
      <div className="glass-panel rounded-2xl p-3 flex items-center gap-4 shadow-md border border-[#d4a373]/25 bg-[#fdfbf7] max-w-[280px] sm:max-w-xs transition-all duration-300 hover:border-[#e07a5f]/40">
        
        {/* Cassette Spinning Animation */}
        <div className="relative w-12 h-12 rounded-xl bg-[#faf6f0] flex items-center justify-center border border-[#d4a373]/20 overflow-hidden group-hover:scale-105 transition-transform">
          <Music className={`w-6 h-6 text-[#e07a5f] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#d4a373]/10 to-transparent" />
        </div>

        {/* Track Title and Controls */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[#e07a5f] truncate">
            {currentTrack.title}
          </p>
          <p className="text-[10px] text-[#8c7a6b] truncate">
            {currentTrack.artist}
          </p>
          
          <div className="flex items-center gap-3 mt-1.5">
            <button 
              onClick={handlePlayPause}
              className="p-1 rounded-full bg-[#e07a5f] hover:bg-[#cb654b] text-[#2d141c] transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
            </button>
            
            <button 
              onClick={handleNext}
              className="p-1 rounded-full text-[#e07a5f] hover:text-[#3d342d] transition-colors cursor-pointer"
              aria-label="Next track"
            >
              <SkipForward className="w-3 h-3 fill-current" />
            </button>

            <button 
              onClick={toggleMute}
              className="p-1 rounded-full text-[#e07a5f] hover:text-[#3d342d] transition-colors ml-auto cursor-pointer"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Tiny progress line on the widget bottom */}
      <div className="absolute bottom-6 left-12 right-6 h-[2px] bg-[#faf6f0] rounded-full overflow-hidden pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#e07a5f] to-[#d4a373] transition-all duration-500" 
          style={{ width: `${trackProgress}%` }}
        />
      </div>
    </div>
  );
}
