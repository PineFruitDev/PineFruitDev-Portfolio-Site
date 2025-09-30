'use client';

import { useEffect, useRef, useCallback } from 'react';

interface UseCascadeScrollOptions {
  enabled?: boolean;
  sensitivity?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  threshold?: number;
  allowPageScrollPassthrough?: boolean;
}

export const useCascadeScroll = (options: UseCascadeScrollOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const scrollableContentRef = useRef<HTMLDivElement>(null);
  const {
    enabled = true,
    sensitivity = 1,
    onNext,
    onPrevious,
    threshold = 10,
    allowPageScrollPassthrough = false
  } = options;

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!enabled) return;

    const container = elementRef.current;
    const scrollableContent = scrollableContentRef.current;
    
    if (!container) return;

    // If there's scrollable content, handle internal scrolling with boundary detection
    if (scrollableContent) {
      const { scrollTop, scrollHeight, clientHeight } = scrollableContent;
      const isAtTop = scrollTop <= threshold;
      const isAtBottom = scrollTop >= scrollHeight - clientHeight - threshold;
      const hasScrollableContent = scrollHeight > clientHeight;
      
      const isScrollingUp = e.deltaY < 0;
      const isScrollingDown = e.deltaY > 0;

      // Check if we should pass through to page scroll
      const shouldPassthrough = allowPageScrollPassthrough && (
        !hasScrollableContent || // No scrollable content at all
        (isAtTop && isScrollingUp) || // At top and scrolling up
        (isAtBottom && isScrollingDown) // At bottom and scrolling down
      );

      if (shouldPassthrough) {
        // Let the page handle this scroll event
        return;
      }

      // Prevent page scroll and handle internal scrolling
      e.preventDefault();
      e.stopPropagation();
      
      const delta = e.deltaY * sensitivity;

      if (delta > 0) {
        // Scrolling down
        if (isAtBottom && onNext) {
          // At bottom of content, advance to next item
          onNext();
        } else {
          // Still content to scroll, scroll within container
          scrollableContent.scrollTop += delta;
        }
      } else {
        // Scrolling up
        if (isAtTop && onPrevious) {
          // At top of content, go to previous item
          onPrevious();
        } else {
          // Still content to scroll, scroll within container
          scrollableContent.scrollTop += delta;
        }
      }
    } else {
      // No scrollable content - decide whether to prevent page scroll
      if (!allowPageScrollPassthrough) {
        e.preventDefault();
        e.stopPropagation();
        
        // Just advance carousel
        const delta = e.deltaY;
        if (delta > 0 && onNext) {
          onNext();
        } else if (delta < 0 && onPrevious) {
          onPrevious();
        }
      }
      // If passthrough is allowed and no scrollable content, let page scroll
    }
  }, [enabled, sensitivity, onNext, onPrevious, threshold, allowPageScrollPassthrough]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    element.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel, enabled]);

  return {
    containerRef: elementRef,
    scrollableRef: scrollableContentRef,
  };
};
