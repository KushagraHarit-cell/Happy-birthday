'use client';

import React, { useState, useEffect } from 'react';

import { CHAPTERS } from '@/config/content';
import { isDatePassed } from '@/utils/date';
import ChapterLock from './ChapterLock';

// Import all chapter components
import Chapter1 from './chapters/Chapter1';
import Chapter2 from './chapters/Chapter2';
import Chapter3 from './chapters/Chapter3';
import Chapter4 from './chapters/Chapter4';
import Chapter5 from './chapters/Chapter5';

interface ChapterContainerProps {
  id: number;
}

export default function ChapterContainer({ id }: ChapterContainerProps) {
  const [mounted, setMounted] = useState(false);
  const [bypass, setBypass] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const chapter = CHAPTERS.find(c => c.id === id);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_bypass');
    }

    if (!chapter) return;

    // Check sessionStorage bypass & query params
    const hasSessionBypass = sessionStorage.getItem('dev_bypass') === 'true';
    const hasQueryBypass = window.location.search.includes('dev=true');
    
    if (hasQueryBypass) {
      sessionStorage.setItem('dev_bypass', 'true');
    }

    const checkUnlocked = isDatePassed(chapter.unlockDate) || hasSessionBypass || hasQueryBypass;
    setIsUnlocked(checkUnlocked);
    setBypass(hasSessionBypass || hasQueryBypass);
  }, [chapter, id]);

  const handleUnlockTrigger = () => {
    setIsUnlocked(true);
  };

  const handleBypassToggle = () => {
    const nextBypass = !bypass;
    setBypass(nextBypass);
    sessionStorage.setItem('dev_bypass', nextBypass ? 'true' : 'false');
    setIsUnlocked(nextBypass || (chapter ? isDatePassed(chapter.unlockDate) : false));
  };

  if (!mounted || !chapter) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#ffd1dc] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Only show the bypass button if dev=true is in the query params or bypass is active
  const showBypassButton = typeof window !== 'undefined' && (window.location.search.includes('dev=true') || bypass);

  return (
    <div className="relative">
      
      {showBypassButton && (
        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={handleBypassToggle}
            className="text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-md glass-panel border-[#b794f4]/30 text-[#b794f4] hover:text-[#ffd1dc] transition-all cursor-pointer hover:bg-[#b794f4]/10 bg-[#f0eaf5]lack/40"
          >
            {bypass ? "🔒 Enable Lock Rules" : "🔓 Developer Bypass"}
          </button>
        </div>
      )}

      {isUnlocked ? (
        <div>
          {id === 1 && <Chapter1 />}
          {id === 2 && <Chapter2 />}
          {id === 3 && <Chapter3 />}
          {id === 4 && <Chapter4 />}
          {id === 5 && <Chapter5 />}
        </div>
      ) : (
        <ChapterLock 
          chapterId={chapter.id}
          title={chapter.title}
          unlockDate={chapter.unlockDate}
          onUnlock={handleUnlockTrigger}
        />
      )}
    </div>
  );
}
