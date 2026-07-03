'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, ArrowLeft, ArrowRight, Play, Pause, X, Music, Volume2 } from 'lucide-react';
import { MEMORIES, Memory } from '@/config/content';
import { Howl } from 'howler';

export default function Chapter3() {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [storyProgress, setStoryProgress] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const voiceSoundRef = useRef<Howl | null>(null);
  const storyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const storyProgressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll controls for the horizontal timeline
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.6 : clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const openStory = (index: number) => {
    setSelectedMemoryIndex(index);
    setStoryProgress(0);
    setIsPlayingVoice(false);
  };

  const closeStory = () => {
    if (voiceSoundRef.current) {
      voiceSoundRef.current.stop();
    }
    setSelectedMemoryIndex(null);
    setIsPlayingVoice(false);
    clearStoryTimers();
  };

  const clearStoryTimers = () => {
    if (storyTimerRef.current) clearInterval(storyTimerRef.current);
    if (storyProgressIntervalRef.current) clearInterval(storyProgressIntervalRef.current);
  };

  const handleNextStory = () => {
    if (selectedMemoryIndex === null) return;
    if (selectedMemoryIndex < MEMORIES.length - 1) {
      openStory(selectedMemoryIndex + 1);
    } else {
      closeStory();
    }
  };

  const handlePrevStory = () => {
    if (selectedMemoryIndex === null) return;
    if (selectedMemoryIndex > 0) {
      openStory(selectedMemoryIndex - 1);
    }
  };

  // Handle story automatic progression & voice notes
  useEffect(() => {
    if (selectedMemoryIndex === null) return;

    clearStoryTimers();
    setStoryProgress(0);

    const activeMemory = MEMORIES[selectedMemoryIndex];

    // If it's a voice note, we play the audio
    if (activeMemory.mediaType === 'voice') {
      voiceSoundRef.current = new Howl({
        src: [activeMemory.mediaUrl],
        html5: true,
        onplay: () => setIsPlayingVoice(true),
        onpause: () => setIsPlayingVoice(false),
        onend: () => {
          setIsPlayingVoice(false);
          handleNextStory();
        }
      });
      voiceSoundRef.current.play();

      // Tick progress based on voice length or fallback
      const trackVoiceProgress = () => {
        storyProgressIntervalRef.current = setInterval(() => {
          if (voiceSoundRef.current) {
            const seek = voiceSoundRef.current.seek() as number;
            const duration = voiceSoundRef.current.duration() as number;
            if (duration > 0) {
              setStoryProgress((seek / duration) * 100);
            }
          }
        }, 100);
      };
      trackVoiceProgress();
    } else {
      // For images, set a 6-second timer for story slide
      const duration = 6000;
      let elapsed = 0;
      
      storyProgressIntervalRef.current = setInterval(() => {
        elapsed += 100;
        setStoryProgress((elapsed / duration) * 100);
      }, 100);

      storyTimerRef.current = setTimeout(() => {
        handleNextStory();
      }, duration);
    }

    return () => {
      clearStoryTimers();
      if (voiceSoundRef.current) {
        voiceSoundRef.current.unload();
      }
    };
  }, [selectedMemoryIndex]);

  const toggleVoicePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!voiceSoundRef.current) return;
    if (isPlayingVoice) {
      voiceSoundRef.current.pause();
    } else {
      voiceSoundRef.current.play();
    }
  };

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 relative z-10">
      
      {/* Chapter Header */}
      <div className="text-center mb-12 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#b794f4]/15 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#b794f4]/10 text-[#b794f4] border border-[#b794f4]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter Three</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2d141c] font-serif mb-4 relative z-10">
          Walk Down Memory Lane
        </h1>
        <p className="text-[#5e3e47] max-w-md mx-auto text-sm sm:text-base font-light relative z-10">
          Scroll through our shared history. Click any memory card to view it in full screen story-style mode.
        </p>
      </div>

      {/* Navigation Buttons for horizontal scroll */}
      <div className="flex justify-end gap-3 mb-6 relative z-10">
        <button 
          onClick={() => scroll('left')}
          className="p-3 rounded-full bg-[#f0eaf5]lack/40 border border-black/10 text-[#b794f4] hover:bg-white/5 hover:text-[#ffd1dc] transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Scroll left"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="p-3 rounded-full bg-[#f0eaf5]lack/40 border border-black/10 text-[#b794f4] hover:bg-white/5 hover:text-[#ffd1dc] transition-all cursor-pointer backdrop-blur-sm"
          aria-label="Scroll right"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Horizontal Memory Scroll Container */}
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-10 scrollbar-thin select-none snap-x custom-scrollbar relative z-10"
      >
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => openStory(index)}
            className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center glass-panel border-black/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#b794f4]/40 hover:shadow-[0_0_20px_rgba(183,148,244,0.15)] bg-white/80 group"
          >
            {/* Card Media Preview */}
            <div className="h-[200px] w-full relative bg-[#f0eaf5]lack/40 overflow-hidden">
              {memory.mediaType === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={memory.mediaUrl} 
                  alt={memory.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" 
                />
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-tr from-[#1f1b2c] to-[#0a0a0f] text-[#b794f4]">
                  <Music className="w-10 h-10 mb-3 animate-bounce drop-shadow-[0_0_8px_rgba(183,148,244,0.5)]" />
                  <span className="text-xs text-[#b794f4] uppercase tracking-widest font-semibold">Voice Recording</span>
                </div>
              )}
              
              {/* Date Badge */}
              <div className="absolute top-3 left-3 bg-[#b794f4]/90 text-[#2d141c] text-[9px] uppercase font-bold tracking-[0.1em] px-2.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg backdrop-blur-sm border border-black/10">
                <Calendar className="w-3 h-3" />
                {memory.date}
              </div>
            </div>

            {/* Card Info */}
            <div className="p-6 bg-gradient-to-b from-transparent to-black/20">
              <h3 className="text-lg font-bold text-[#2d141c] mb-2 font-serif tracking-wide">{memory.title}</h3>
              <p className="text-xs text-[#5e3e47]/70 line-clamp-3 leading-relaxed font-light">
                {memory.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Story-Style Modal Viewer */}
      <AnimatePresence>
        {selectedMemoryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#f0eaf5]lack/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[420px] aspect-[9/16] bg-white rounded-3xl overflow-hidden relative flex flex-col justify-between shadow-2xl border border-black/10">
              
              {/* Top Progress Bar */}
              <div className="absolute top-4 left-4 right-4 flex gap-1.5 z-30">
                {MEMORIES.map((_, idx) => (
                  <div key={idx} className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ffd1dc] transition-all duration-100 ease-linear shadow-[0_0_5px_rgba(255,209,220,0.8)]"
                      style={{ 
                        width: idx === selectedMemoryIndex 
                          ? `${storyProgress}%` 
                          : idx < selectedMemoryIndex ? '100%' : '0%' 
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Story Header (Close button & Info) */}
              <div className="absolute top-8 left-4 right-4 flex justify-between items-center z-30 bg-[#f0eaf5]lack/40 backdrop-blur-md p-3.5 rounded-2xl border border-black/10 shadow-lg">
                <div>
                  <h4 className="text-sm font-bold text-[#2d141c] drop-shadow-md tracking-wide">{MEMORIES[selectedMemoryIndex].title}</h4>
                  <span className="text-[10px] text-[#b794f4] font-medium uppercase tracking-widest">{MEMORIES[selectedMemoryIndex].date}</span>
                </div>
                <button 
                  onClick={closeStory}
                  className="p-1.5 rounded-full bg-white/5 text-[#2d141c] hover:bg-white/10 border border-black/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Side Tapping Areas for Next/Prev */}
              <div className="absolute inset-y-0 left-0 w-1/4 z-20 cursor-w-resize" onClick={handlePrevStory} />
              <div className="absolute inset-y-0 right-0 w-1/4 z-20 cursor-e-resize" onClick={handleNextStory} />

              {/* Story Content Area */}
              <div className="flex-1 w-full relative flex items-center justify-center bg-[#f0eaf5]lack/60">
                {MEMORIES[selectedMemoryIndex].mediaType === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={MEMORIES[selectedMemoryIndex].mediaUrl} 
                    alt={MEMORIES[selectedMemoryIndex].title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-gradient-to-b from-[#111417] to-[#0a0a0f] text-[#ffd1dc] p-8 text-center relative overflow-hidden">
                    {/* Audio visualizer rings */}
                    {isPlayingVoice && (
                      <>
                        <div className="absolute w-40 h-40 border border-[#b794f4]/20 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                        <div className="absolute w-60 h-60 border border-[#ffd1dc]/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      </>
                    )}
                    
                    <div className="w-24 h-24 rounded-full bg-[#b794f4]/10 border border-[#b794f4]/30 flex items-center justify-center mb-6 relative z-10 backdrop-blur-sm shadow-[0_0_20px_rgba(183,148,244,0.15)]">
                      <Music className="w-10 h-10 text-[#b794f4]" />
                    </div>
                    <h5 className="text-lg font-bold text-[#2d141c] mb-2 font-serif relative z-10">Voice Note Playback</h5>
                    <p className="text-xs text-[#5e3e47]/70 mb-8 font-light relative z-10">Listen to a personal voice message.</p>
                    
                    <button
                      onClick={toggleVoicePlay}
                      className="relative z-10 flex items-center gap-2.5 py-3 px-6 rounded-full bg-white/5 hover:bg-white/10 text-[#2d141c] transition-all shadow-lg cursor-pointer border border-black/10 backdrop-blur-md"
                    >
                      {isPlayingVoice ? (
                        <>
                          <Pause className="w-4 h-4 text-[#ffd1dc]" />
                          <span className="font-semibold uppercase tracking-wider text-[10px]">Pause Message</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 text-[#ffd1dc] fill-[#ffd1dc]" />
                          <span className="font-semibold uppercase tracking-wider text-[10px]">Play Message</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Story Footer (Caption) */}
              <div className="bg-gradient-to-t from-black via-black/80 to-transparent p-8 pt-16 text-center relative z-30 absolute bottom-0 left-0 right-0">
                <p className="text-sm text-[#2d141c] leading-relaxed font-light drop-shadow-md">
                  {MEMORIES[selectedMemoryIndex].caption}
                </p>
                <p className="text-[9px] text-[#2d141c]/50 mt-4 uppercase tracking-[0.2em] font-medium">
                  {selectedMemoryIndex + 1} of {MEMORIES.length} • Tap edges to navigate
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
