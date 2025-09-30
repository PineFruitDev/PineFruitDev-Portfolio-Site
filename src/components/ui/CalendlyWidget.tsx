'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

// Calendly widget interface
interface CalendlyWidget {
  initInlineWidget(config: { url: string; parentElement: HTMLElement }): void;
}

// Extend window interface for Calendly
declare global {
  interface Window {
    Calendly?: CalendlyWidget;
  }
}

interface CalendlyWidgetProps {
  url?: string;
  height?: number;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url = 'https://calendly.com/pinefruitdev',
  height = 700,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const widgetRef = React.useRef<HTMLDivElement>(null);

  // Custom colors for our dark theme: background=#0A0A0B, text=#FAFAFA, primary=#A855F7
  const calendlyUrl = `${url}?background_color=0a0a0b&text_color=fafafa&primary_color=a855f7`;

  useEffect(() => {
    if (typeof window !== 'undefined' && widgetRef.current) {
      // Script is already loaded in layout.tsx, just wait for it to be ready
      const checkCalendly = () => {
        if (window.Calendly && window.Calendly.initInlineWidget && widgetRef.current) {
          setIsLoaded(true);
          try {
            window.Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: widgetRef.current,
            });
          } catch {
            // Silently fail - Calendly widget initialization failed
          }
        } else {
          setTimeout(checkCalendly, 100);
        }
      };

      // Small delay to ensure DOM is ready
      const initTimer = setTimeout(checkCalendly, 500);

      const timer = setTimeout(() => {
        setIsLoaded(true); // Fallback timer
      }, 5000);

      return () => {
        clearTimeout(initTimer);
        clearTimeout(timer);
      };
    }
  }, [calendlyUrl]);

  return (
    <div className="relative">
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg z-10"
          style={{ height: `${height}px` }}
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoaded ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center space-y-4">
            <Clock className="w-12 h-12 text-purple-400 mx-auto animate-pulse" />
            <p className="text-gray-400">Loading Calendly scheduler...</p>
          </div>
        </motion.div>
      )}

      <div
        ref={widgetRef}
        className="calendly-inline-widget rounded-lg overflow-hidden"
        style={{
          minWidth: '320px',
          height: `${height}px`,
          borderRadius: '0.5rem'
        }}
      />
    </div>
  );
};

export default CalendlyWidget;
