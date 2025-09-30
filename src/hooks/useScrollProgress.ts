'use client';

import { useState, useEffect } from 'react';
import { throttle } from '@/lib/utils';
import { ScrollProgress } from '@/types';

export const useScrollProgress = (throttleMs: number = 16): ScrollProgress => {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    direction: 'down',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let lastScrollY = window.pageYOffset;

    const updateScrollProgress = throttle(() => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const progress = Math.min(scrollY / (documentHeight - windowHeight), 1);
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      setScrollData({ progress, direction });
      lastScrollY = scrollY;
    }, throttleMs);

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    
    // Initial call
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [throttleMs]);

  return scrollData;
};
