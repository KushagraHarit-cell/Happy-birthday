'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  magneticStrength?: number;
}

export default function MagneticButton({ 
  children, 
  onClick, 
  className = '', 
  magneticStrength = 0.2 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    setPosition({ x: middleX * magneticStrength, y: middleY * magneticStrength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    controls.start({
      x: position.x,
      y: position.y,
      transition: { type: "spring", stiffness: 200, damping: 20, mass: 0.2 }
    });
  }, [position, controls]);

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={controls}
      whileTap={{ scale: 0.98 }}
      className={`relative flex items-center justify-center interactive no-cursor overflow-hidden group ${className}`}
      style={{ willChange: 'transform' }}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Refined Light Reflection Hover Effect */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
    </motion.button>
  );
}
