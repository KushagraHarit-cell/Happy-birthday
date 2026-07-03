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
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar if scrolling up or at the top
      if (currentScrollY < 100 || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Initial state
    setIsVisible(true);

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
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-1 p-2 bg-white/70 backdrop-blur-xl border border-[var(--secondary)] rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return (
              <Link key={item.label} href={item.href} passHref legacyBehavior>
                <a>
                  <MagneticButton magneticStrength={0.1}>
                    <div className="relative px-6 py-2 rounded-full cursor-pointer">
                      {isActive && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-[var(--accent-gold)] rounded-full z-0"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span 
                        className={`relative z-10 text-xs font-sans tracking-[0.1em] uppercase transition-colors duration-300 ${
                          isActive ? 'text-white font-medium' : 'text-[var(--muted)] hover:text-[var(--foreground)]'
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
