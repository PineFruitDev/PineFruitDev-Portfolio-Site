'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SectionProps } from '@/types';

interface SectionComponent extends React.FC<SectionProps> {
  Header: React.FC<SectionHeaderProps>;
}

const Section: SectionComponent = ({
  children,
  className,
  id,
  fullHeight = false,
  background = 'default',
}) => {
  const backgroundClasses = {
    default: '',
    gradient: 'bg-gradient-to-br from-background via-purple-950/10 to-background',
    transparent: 'bg-transparent',
  };

  return (
    <motion.section
      id={id}
      className={cn(
        'relative section-spacing',
        fullHeight && 'min-h-screen flex items-center',
        backgroundClasses[background],
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <div className="consistent-container w-full">
        {children}
      </div>
    </motion.section>
  );
};

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  className,
}) => (
  <motion.div
    className={cn(
      'mb-16',
      centered && 'text-center',
      className
    )}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {subtitle && (
      <motion.p
        className="text-sm uppercase tracking-widest text-purple-400 font-medium mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
    )}
    
    <motion.h2
      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text pb-4"
      style={{ lineHeight: '1.1' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {title}
    </motion.h2>
    
    {description && (
      <motion.p
        className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {description}
      </motion.p>
    )}
  </motion.div>
);

Section.Header = SectionHeader;

export default Section;
