'use client';

import React from 'react';

export default function BackgroundEffects() {
  return (
    <div className="aurora-bg">
      {/* Dynamic drifting colorful glows */}
      <div className="aurora-glow-1" />
      <div className="aurora-glow-2" />
      <div className="aurora-glow-3" />
      
      {/* Radial overlay to make a subtle cozy vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.02)_80%)] pointer-events-none" />
    </div>
  );
}
