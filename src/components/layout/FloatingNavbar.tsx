'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Issue 01', href: '/' },
  { label: 'Story', href: '/chapter/1' },
  { label: 'Timeline', href: '/chapter/2' },
  { label: 'Gallery', href: '/chapter/3' },
  { label: 'Letters', href: '/chapter/4' }
];

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center p-1.5 bg-[var(--background)]/70 backdrop-blur-xl border border-[var(--foreground)]/10 rounded-full paper-shadow"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link key={item.label} href={item.href} passHref legacyBehavior>
                <a>
                  <MagneticButton magneticStrength={0.2}>
                    <div className={`relative px-6 py-2.5 rounded-full group cursor-pointer overflow-hidden transition-colors duration-500 ${isActive ? 'bg-[var(--foreground)]' : 'hover:bg-[var(--foreground)]/5'}`}>
                      <span 
                        className={`relative z-10 text-[9px] font-sans tracking-[0.3em] uppercase transition-colors duration-500 ${
                          isActive ? 'text-[var(--background)] font-medium' : 'text-[var(--muted)] group-hover:text-[var(--foreground)]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </MagneticButton>
                </a>
              </Link>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
