'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { EASTER_EGG_KEYBOARD } from '@/config/content';

export default function KeyboardShortcutListener() {
  const router = useRouter();
  const typedSequenceRef = useRef<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const targetSequence = EASTER_EGG_KEYBOARD.toLowerCase();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input fields
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      // Add to buffer
      const key = e.key.toLowerCase();
      if (key.length === 1 && /[a-z]/.test(key)) {
        typedSequenceRef.current.push(key);
        
        // Truncate buffer if too long
        if (typedSequenceRef.current.length > targetSequence.length) {
          typedSequenceRef.current.shift();
        }

        const currentTypedString = typedSequenceRef.current.join('');
        
        if (currentTypedString === targetSequence) {
          typedSequenceRef.current = []; // Clear
          router.push('/easter-egg');
        }

        // Reset buffer after 2 seconds of inactivity
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          typedSequenceRef.current = [];
        }, 2000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return null;
}
