'use client';

import React, { useEffect, useRef } from 'react';

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
}

export default function CursorConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let motes: Mote[] = [];
    const moteCount = 30; // Fewer particles for a clean, quiet look

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMotes();
    };

    const initMotes = () => {
      motes = [];
      for (let i = 0; i < moteCount; i++) {
        const radius = Math.random() * 2 + 1;
        const alpha = Math.random() * 0.4 + 0.1;
        motes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15, // Drifts very slowly
          vy: (Math.random() - 0.5) * 0.15,
          radius,
          alpha,
          targetAlpha: alpha
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      motes.forEach((mote) => {
        // Slowly drift
        mote.x += mote.vx;
        mote.y += mote.vy;

        // Wrap around bounds
        if (mote.x < -10) mote.x = canvas.width + 10;
        if (mote.x > canvas.width + 10) mote.x = -10;
        if (mote.y < -10) mote.y = canvas.height + 10;
        if (mote.y > canvas.height + 10) mote.y = -10;

        // Gently pulsate opacity
        if (Math.random() < 0.01) {
          mote.targetAlpha = Math.random() * 0.4 + 0.1;
        }
        mote.alpha += (mote.targetAlpha - mote.alpha) * 0.02;

        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2);
        // Soft blush/purple color
        ctx.fillStyle = `rgba(183, 148, 244, ${mote.alpha})`; 
        ctx.shadowBlur = 3;
        ctx.shadowColor = '#b794f4';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }} // blending with cream background
    />
  );
}
