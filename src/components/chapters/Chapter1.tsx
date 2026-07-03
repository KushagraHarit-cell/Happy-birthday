'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { MEMORIES } from '@/config/content';

export default function Chapter1() {
  const [foundHearts, setFoundHearts] = useState<number[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Hidden hearts positions on the page (percentage based)
  const hiddenHearts = [
    { id: 1, top: '22%', left: '8%', message: "You are the key to my heart! 🗝️" },
    { id: 2, top: '48%', left: '88%', message: "I love the way you laugh! 😄" },
    { id: 3, top: '82%', left: '15%', message: "Every moment with you is magic! 🪄" },
    { id: 4, top: '75%', left: '78%', message: "You are my favorite place! 🏡" },
  ];

  const handleHeartClick = (id: number, message: string) => {
    if (!foundHearts.includes(id)) {
      setFoundHearts([...foundHearts, id]);
      alert(`💖 Easter Egg Found! \n"${message}"`);
    }
  };

  // Filter memories with images for Chapter 1 polaroids
  const polaroids = MEMORIES.filter(m => m.mediaType === 'image').slice(0, 3);

  const cards = [
    {
      id: 1,
      title: "Our Sparks",
      description: "How it all began. In a universe of billions, my world gravitated towards yours.",
      color: "from-[#ffd1dc]/20 to-[#b794f4]/20"
    },
    {
      id: 2,
      title: "The Little Things",
      description: "It's the way you smile, the jokes you share, and how you make me feel safe.",
      color: "from-[#b794f4]/20 to-[#ffd1dc]/20"
    },
    {
      id: 3,
      title: "Our Promise",
      description: "No matter where the stars take us, my heart will always trace back to you.",
      color: "from-[#ffd1dc]/20 to-[#e7bbc6]/20"
    }
  ];

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 relative z-10">
      
      {/* Chapter Header */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#b794f4]/10 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#b794f4]/10 text-[#b794f4] border border-[#b794f4]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter One</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2d141c] font-serif mb-4 relative z-10">
          The Spark of Us
        </h1>
        <p className="text-[#5e3e47] max-w-md mx-auto text-sm sm:text-base font-light relative z-10">
          Drag the photos, explore the story cards, and find the <strong className="text-[#ffd1dc]">4 hidden hearts</strong> scattered around this chapter.
        </p>
        
        {/* Heart hunt indicator */}
        <div className="mt-6 inline-flex items-center gap-2 bg-[#f0eaf5]lack/40 border border-black/10 px-4 py-2.5 rounded-xl text-xs text-[#ffd1dc] relative z-10 backdrop-blur-md shadow-lg">
          <Heart className={`w-4 h-4 fill-[#ffd1dc] ${foundHearts.length === hiddenHearts.length ? 'animate-bounce' : 'animate-pulse'}`} />
          <span className="font-semibold tracking-wide">Found {foundHearts.length} of {hiddenHearts.length} Secret Hearts</span>
        </div>
      </div>

      {/* Scattered Draggable Polaroids */}
      <div className="relative h-[400px] mb-20 w-full overflow-hidden bg-[#f0eaf5]lack/20 border border-black/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
        <p className="text-[10px] sm:text-xs text-[#9b8d90] absolute top-4 left-4 z-20 select-none uppercase tracking-widest font-semibold">
          ✨ Hold and drag polaroids to rearrange them!
        </p>
        
        {polaroids.map((polaroid, index) => {
          const rotation = index === 0 ? -6 : index === 1 ? 5 : -2;
          const leftOffset = index === 0 ? '10%' : index === 1 ? '40%' : '70%';
          const topOffset = index === 0 ? '40px' : index === 1 ? '80px' : '30px';

          return (
            <motion.div
              key={polaroid.id}
              drag
              dragConstraints={{ left: 10, right: 300, top: 10, bottom: 150 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.08, zIndex: 100, rotate: 0 }}
              className="polaroid-card absolute w-[200px] cursor-grab active:cursor-grabbing select-none"
              style={{ 
                left: `calc(${leftOffset} - 50px)`, 
                top: topOffset,
                '--rotate': `${rotation}deg` 
              } as React.CSSProperties}
            >
              <div className="w-full h-[160px] relative bg-gray-900 overflow-hidden mb-3 border border-black/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={polaroid.mediaUrl} 
                  alt={polaroid.title} 
                  className="w-full h-full object-cover pointer-events-none opacity-90"
                />
              </div>
              <p className="text-xs font-semibold text-[#2d141c] text-center tracking-wide truncate">{polaroid.title}</p>
              <p className="text-[9px] text-[#b794f4] text-center mt-1.5 font-mono uppercase tracking-widest">{polaroid.date}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Animated Story Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
            className="glass-panel p-6 cursor-pointer relative overflow-hidden transition-all duration-300 bg-white/60 hover:bg-white/80 group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#b794f4]/10 rounded-full blur-xl pointer-events-none" />
            
            <h3 className="text-xl font-bold text-[#ffd1dc] font-serif mb-3 flex items-center gap-2 relative z-10">
              <Sparkles className="w-4 h-4 text-[#b794f4]" />
              {card.title}
            </h3>
            
            <p className="text-[#5e3e47]/80 text-sm leading-relaxed mb-4 relative z-10 font-light">
              {card.description}
            </p>

            <span className="text-[9px] text-[#b794f4] uppercase tracking-[0.2em] block mt-4 font-semibold relative z-10">
              {activeCard === card.id ? "Click to close" : "Click to read promise"}
            </span>

            {/* Expanded Content Drawer */}
            <AnimatePresence>
              {activeCard === card.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-black/10 text-xs text-[#5e3e47] leading-relaxed relative z-10 font-light"
                >
                  {card.id === 1 && "I remember the first spark clearly. It felt like walking into a warm room after being out in the cold. Every word from you felt like it was meant just for me."}
                  {card.id === 2 && "It's not just the grand moments; it's the sleepy voice notes, the random texts at noon, the way we laugh at things nobody else understands."}
                  {card.id === 3 && "I promise to be your anchor in the storm, your cheerleader in success, and your partner in everything. My heart is yours, always and forever."}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Hidden Easter Egg Hearts */}
      {hiddenHearts.map((heart) => (
        <button
          key={heart.id}
          onClick={() => handleHeartClick(heart.id, heart.message)}
          className="absolute z-30 p-2 rounded-full bg-transparent hover:bg-[#b794f4]/20 cursor-pointer transition-colors duration-200"
          style={{ top: heart.top, left: heart.left }}
        >
          <Heart 
            className={`w-4 h-4 ${
              foundHearts.includes(heart.id) 
                ? 'fill-[#ffd1dc] text-[#ffd1dc] filter drop-shadow-[0_0_8px_rgba(255,209,220,0.8)]' 
                : 'text-[#b794f4]/30 hover:text-[#b794f4]/80'
            }`} 
          />
        </button>
      ))}

      {/* Completion Banner */}
      <AnimatePresence>
        {foundHearts.length === hiddenHearts.length && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="glass-panel p-8 text-center max-w-lg mx-auto bg-white/90 mt-12 border border-[#b794f4]/30 shadow-[0_0_30px_rgba(183,148,244,0.15)]"
          >
            <div className="inline-flex p-3 bg-[#ffd1dc]/10 rounded-full text-[#ffd1dc] mb-4 shadow-[0_0_15px_rgba(255,209,220,0.2)]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-[#2d141c] font-serif mb-2">Chapter 1 Hearts Completed!</h4>
            <p className="text-sm text-[#5e3e47]/80 font-light leading-relaxed">
              You found all the secret hearts! Your love and attention to detail is beautiful. You're ready for the next chapter when it opens.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
