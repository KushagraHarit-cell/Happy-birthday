'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function PremiumCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverText, setHoverText] = useState('');

  // Spring animations for ultra-smooth trailing
  const cursorX = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if we're hovering over an interactive element
      const interactiveEl = target.closest('button, a, .interactive');
      if (interactiveEl) {
        setIsHovering(true);
        // Custom text for specific elements
        if (interactiveEl.classList.contains('cursor-view')) {
          setHoverText('VIEW');
        } else if (interactiveEl.classList.contains('cursor-play')) {
          setHoverText('PLAY');
        } else {
          setHoverText('');
        }
      } else {
        setIsHovering(false);
        setHoverText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Small dot that perfectly tracks cursor
  const dotSize = isHovering ? 0 : 6;
  
  // Large circle that springs behind
  const circleSize = isHovering ? 64 : 32;

  return (
    <>
      {/* Outer Spring Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: circleSize,
          height: circleSize,
          border: isHovering ? '1px solid #C2A578' : '1px solid transparent',
          backgroundColor: isHovering ? 'transparent' : 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <AnimatePresence>
          {isHovering && hoverText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-sans tracking-widest text-[#C2A578] uppercase"
            >
              {hoverText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Exact Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference bg-white rounded-full"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          translateX: '-50%',
          translateY: '-50%',
          width: dotSize,
          height: dotSize,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0 }}
      />
    </>
  );
}
