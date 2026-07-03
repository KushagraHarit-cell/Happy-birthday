'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowLeft, Star } from 'lucide-react';

export default function EasterEggPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative z-10 flex flex-col items-center justify-center min-h-[75vh]">
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="glass-panel border-pink-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-xl relative overflow-hidden shadow-2xl bg-gradient-to-br from-pink-950/20 to-purple-950/20"
      >
        {/* Floating glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse" />
        
        {/* Glowing floating hearts/stars in background */}
        <div className="absolute top-12 left-12 text-pink-500/20 animate-bounce" style={{ animationDuration: '4s' }}>
          <Star className="w-5 h-5 fill-current" />
        </div>
        <div className="absolute bottom-16 right-16 text-pink-500/20 animate-bounce" style={{ animationDuration: '6s' }}>
          <Heart className="w-5 h-5 fill-current" />
        </div>

        {/* Easter egg icon */}
        <div className="inline-flex p-3 bg-pink-500/10 border border-pink-500/30 rounded-2xl text-pink-400 mb-6 animate-pulse">
          <Heart className="w-8 h-8 fill-pink-500" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2d141c] font-serif mb-4">
          Secret Room Found!
        </h1>
        
        <p className="text-pink-300 font-semibold text-sm sm:text-base mb-6">
          You typed "L-O-V-E" on your keyboard!
        </p>

        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8 max-w-sm mx-auto">
          You've stumbled upon a hidden portal in this galaxy. It shows that you notice the little details, and that's exactly why you are so special. Thank you for playing along and filling this world with love.
        </p>

        {/* Back button */}
        <div className="flex justify-center">
          <Link 
            href="/"
            className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider py-2.5 px-6 rounded-full bg-pink-500 hover:bg-pink-600 text-[#2d141c] transition-all shadow-md hover:shadow-pink-500/25 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Galaxy Hub</span>
          </Link>
        </div>

      </motion.div>

    </div>
  );
}
