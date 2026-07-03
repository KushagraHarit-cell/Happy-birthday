'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Gift, Award, Check } from 'lucide-react';
import { COUPONS } from '@/config/content';

export default function Chapter4() {
  const [foundHearts, setFoundHearts] = useState<number[]>([]);
  const [redeemedCoupons, setRedeemedCoupons] = useState<number[]>([]);

  // 10 Hidden hearts locations (absolute coordinates)
  const hearts = [
    { id: 1, top: '15%', left: '5%', size: 'w-4 h-4', hint: "In the top-left sky" },
    { id: 2, top: '85%', left: '12%', size: 'w-5 h-5', hint: "Near the bottom boundary" },
    { id: 3, top: '28%', left: '89%', size: 'w-3 h-3', hint: "Tucked into the far right" },
    { id: 4, top: '65%', left: '72%', size: 'w-4.5 h-4.5', hint: "Hiding near the rewards center" },
    { id: 5, top: '42%', left: '25%', size: 'w-5 h-5', hint: "Resting on the left side" },
    { id: 6, top: '78%', left: '42%', size: 'w-3.5 h-3.5', hint: "Down in the middle grass" },
    { id: 7, top: '20%', left: '60%', size: 'w-4 h-4', hint: "Floating in the upper clouds" },
    { id: 8, top: '50%', left: '50%', size: 'w-3 h-3', hint: "Exactly in the center" },
    { id: 9, top: '92%', left: '80%', size: 'w-4 h-4', hint: "Way down at the bottom right" },
    { id: 10, top: '10%', left: '35%', size: 'w-5 h-5', hint: "In the high stars" },
  ];

  const handleHeartClick = (id: number) => {
    if (!foundHearts.includes(id)) {
      setFoundHearts([...foundHearts, id]);
    }
  };

  const redeemCoupon = (id: number) => {
    if (!redeemedCoupons.includes(id)) {
      setRedeemedCoupons([...redeemedCoupons, id]);
    }
  };

  const progressPercentage = (foundHearts.length / hearts.length) * 100;
  const gameCompleted = foundHearts.length === hearts.length;

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 relative z-10">
      
      {/* Chapter Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ffd1dc]/10 rounded-full blur-[80px] pointer-events-none" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#ffd1dc]/10 text-[#ffd1dc] border border-[#ffd1dc]/30 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.2em] mb-4 relative z-10"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Chapter Four</span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#2d141c] font-serif mb-4 relative z-10">
          A Playful Spark
        </h1>
        <p className="text-[#5e3e47] max-w-md mx-auto text-sm sm:text-base font-light relative z-10">
          Find all <strong className="text-[#ffd1dc]">10 hidden hearts</strong> floating in the dark space card below to unlock your special reward.
        </p>

        {/* Progress Tracker */}
        <div className="mt-8 max-w-md mx-auto relative z-10 glass-panel p-4 rounded-2xl border border-black/10 bg-[#f0eaf5]lack/20 backdrop-blur-md">
          <div className="flex justify-between items-center text-xs text-[#ffd1dc] font-bold tracking-wider uppercase mb-3">
            <span>Hearts Recovered: {foundHearts.length} / 10</span>
            <span>{Math.round(progressPercentage)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#b794f4] to-[#ffd1dc] shadow-[0_0_10px_rgba(255,209,220,0.5)]"
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Game Board Container */}
      {!gameCompleted ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[480px] w-full bg-white/80 border border-black/10 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center backdrop-blur-sm"
        >
          {/* Subtle star instructions */}
          <p className="text-xs text-[#9b8d90] absolute top-5 left-6 select-none pointer-events-none uppercase tracking-widest font-semibold bg-[#f0eaf5]lack/40 px-3 py-1.5 rounded-lg border border-black/5 backdrop-blur-md">
            ⭐ Hunt closely! Hearts can be tiny or light.
          </p>

          {/* Interactive target board for search */}
          <div className="w-48 h-48 rounded-full border border-[#ffd1dc]/10 animate-pulse absolute flex items-center justify-center pointer-events-none">
            <Heart className="w-10 h-10 text-[#ffd1dc]/5" />
          </div>

          {/* Render 10 Hidden Hearts */}
          {hearts.map((heart) => {
            const isFound = foundHearts.includes(heart.id);
            return (
              <motion.button
                key={heart.id}
                onClick={() => handleHeartClick(heart.id)}
                whileHover={{ scale: isFound ? 1 : 1.3 }}
                className={`absolute p-2 rounded-full cursor-pointer z-20 ${
                  isFound ? 'pointer-events-none' : 'bg-transparent'
                }`}
                style={{ top: heart.top, left: heart.left }}
              >
                <Heart 
                  className={`${heart.size} transition-all duration-300 ${
                    isFound 
                      ? 'fill-[#ffd1dc] text-[#ffd1dc] scale-125 opacity-100 filter drop-shadow-[0_0_10px_rgba(255,209,220,0.8)]' 
                      : 'text-[#ffd1dc]/20 hover:text-[#ffd1dc]/60 hover:scale-110 drop-shadow-[0_0_5px_rgba(255,209,220,0.2)]'
                  }`} 
                />
              </motion.button>
            );
          })}
        </motion.div>
      ) : (
        /* Reward: Coupon Book reveal! */
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.8 }}
          className="glass-panel border-[#ffd1dc]/30 bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-[0_0_40px_rgba(255,209,220,0.1)] relative overflow-hidden text-center"
        >
          {/* Ribbon Glows */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#b794f4] via-[#ffd1dc] to-[#b794f4] shadow-[0_0_10px_rgba(255,209,220,0.5)]" />
          
          <div className="inline-flex p-4 bg-[#ffd1dc]/10 border border-[#ffd1dc]/30 rounded-2xl text-[#ffd1dc] mb-6 animate-bounce shadow-[0_0_15px_rgba(255,209,220,0.2)]">
            <Gift className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2d141c] font-serif mb-3">
            Love Coupons Unlocked!
          </h2>
          <p className="text-[#5e3e47]/90 text-sm sm:text-base max-w-md mx-auto mb-12 font-light">
            Congratulations! You found all hidden hearts. To thank you, here is your personal Love Coupon Book. Click any coupon to claim it!
          </p>

          {/* Grid of Coupons */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {COUPONS.map((coupon) => {
              const isRedeemed = redeemedCoupons.includes(coupon.id);
              return (
                <motion.div
                  key={coupon.id}
                  whileHover={{ y: isRedeemed ? 0 : -5, scale: isRedeemed ? 1 : 1.02 }}
                  onClick={() => redeemCoupon(coupon.id)}
                  className={`glass-panel border-black/10 rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 ${
                    isRedeemed 
                      ? 'border-[#b794f4]/30 bg-[#b794f4]/5 opacity-60' 
                      : 'hover:border-[#ffd1dc]/40 hover:bg-white/5 bg-[#f0eaf5]lack/20 hover:shadow-[0_0_20px_rgba(255,209,220,0.1)]'
                  }`}
                >
                  {/* Emoji Indicator */}
                  <span className="text-4xl block mb-4 filter drop-shadow-md">{coupon.emoji}</span>
                  
                  <h3 className="text-lg font-bold text-[#2d141c] mb-2 tracking-wide">{coupon.title}</h3>
                  <p className="text-xs text-[#5e3e47]/70 leading-relaxed mb-6 font-light">
                    {coupon.description}
                  </p>

                  {/* Redeem Button / Status */}
                  <div className="flex justify-center mt-auto">
                    {isRedeemed ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-[#b794f4] bg-[#b794f4]/10 px-3 py-1.5 rounded-lg border border-[#b794f4]/20">
                        <Check className="w-4 h-4" /> Redeemed
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffd1dc] bg-[#ffd1dc]/10 px-4 py-2 rounded-lg border border-[#ffd1dc]/20 shadow-md">
                        Claim Coupon
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Reset Game trigger */}
          <button 
            onClick={() => setFoundHearts([])}
            className="mt-14 text-xs font-semibold uppercase tracking-[0.2em] text-[#9b8d90] hover:text-[#ffd1dc] transition-colors cursor-pointer border border-transparent hover:border-[#ffd1dc]/30 bg-white/5 hover:bg-white/5 px-6 py-2.5 rounded-full"
          >
            Reset Game and Play Again
          </button>
        </motion.div>
      )}

    </div>
  );
}
