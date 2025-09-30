'use client';

import { useEffect, useRef } from 'react';

interface UseScrollWheelOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  sensitivity?: number;
}

export const useScrollWheel = (
  callback: (delta: number) => void,
  options: UseScrollWheelOptions = {}
) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const {
    enabled = true,
    preventDefault = true,
    sensitivity = 1
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    const handleWheel = (e: WheelEvent) => {
      if (preventDefault) {
        e.preventDefault();
      }
      
      // Normalize wheel delta across browsers
      const delta = e.deltaY * sensitivity;
      callback(delta);
    };

    element.addEventListener('wheel', handleWheel, { passive: !preventDefault });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [callback, enabled, preventDefault, sensitivity]);

  return elementRef;
};

