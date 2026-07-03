'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Sparkles, BookOpen, Music, Key, Grid, Image } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Memory Hub', path: '/', icon: Grid },
    { name: 'Open When...', path: '/open-when', icon: BookOpen },
    { name: 'Scrapbook', path: '/scrapbook', icon: Image },
    { name: 'Our Songs', path: '/songs', icon: Music },
    { name: 'Secret Room', path: '/secret', icon: Key },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 py-4">
      <nav className="max-w-6xl mx-auto glass-panel px-4 sm:px-6 py-3 flex items-center justify-between shadow-xl bg-white/60">
        
        {/* Title / Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
          <Heart className="w-5 h-5 text-[#ffd1dc] fill-[#ffd1dc] group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(255,209,220,0.5)]" />
          <span className="font-serif font-bold text-base sm:text-lg tracking-wide text-[#2d141c]">
            29 Days Until You
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-semibold tracking-[0.05em] transition-all duration-300 flex items-center gap-2 cursor-pointer uppercase ${
                  isActive 
                    ? 'text-[#ffd1dc] bg-[#ffd1dc]/10 border border-[#ffd1dc]/20' 
                    : 'text-[#5e3e47]/70 hover:text-[#2d141c] hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute inset-0 border border-[#ffd1dc]/30 rounded-xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-[#5e3e47] hover:text-[#ffd1dc] hover:bg-white/5 cursor-pointer transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-20 left-4 right-4 z-40 glass-panel bg-white/90 rounded-2xl p-4 shadow-2xl border-black/10"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider flex items-center gap-3 transition-colors ${
                      isActive 
                        ? 'text-[#ffd1dc] bg-[#ffd1dc]/10 border border-[#ffd1dc]/20' 
                        : 'text-[#5e3e47]/80 hover:text-[#2d141c] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
