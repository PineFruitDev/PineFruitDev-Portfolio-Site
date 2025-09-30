'use client';

import React, { type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BaseComponentProps } from '@/types';

interface CardProps extends BaseComponentProps {
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<BaseComponentProps>;
  Title: React.FC<CardTitleProps>;
  Description: React.FC<BaseComponentProps>;
  Content: React.FC<BaseComponentProps>;
  Footer: React.FC<BaseComponentProps>;
}

const CardBase: React.FC<CardProps> = ({
  children,
  className,
  hover = true,
  glow = false,
  glass = true,
  padding = 'md',
  as: _Component = 'div',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverProps = hover ? {
    whileHover: {
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" as const }
    }
  } : {};

  return (
    <motion.div
      className={cn(
        'rounded-xl border transition-all duration-300',
        glass && 'glass-card',
        !glass && 'bg-card border-border',
        glow && 'hover:shadow-neon-purple',
        paddingClasses[padding],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" as const }
      }}
      viewport={{ once: true, margin: '-50px' }}
      {...hoverProps}
    >
      {children}
    </motion.div>
  );
};

const CardHeader: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <div className={cn('space-y-1.5 mb-6', className)}>
    {children}
  </div>
);

interface CardTitleProps extends BaseComponentProps {
  gradient?: boolean;
  glow?: boolean;
}

const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  gradient = false,
  glow = false,
}) => (
  <h3 className={cn(
    'text-2xl font-semibold leading-none tracking-tight',
    gradient && 'gradient-text',
    glow && 'text-glow',
    className
  )}>
    {children}
  </h3>
);

const CardDescription: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <p className={cn('text-sm text-muted-foreground', className)}>
    {children}
  </p>
);

const CardContent: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <div className={cn('text-gray-300 leading-relaxed', className)}>
    {children}
  </div>
);

const CardFooter: React.FC<BaseComponentProps> = ({
  children,
  className,
}) => (
  <div className={cn('flex items-center justify-between mt-6 pt-6 border-t border-border', className)}>
    {children}
  </div>
);

// Compound component pattern
const Card = CardBase as CardComponent;
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
