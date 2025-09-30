'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ButtonProps } from '@/types';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-neon-purple hover:scale-105 active:scale-95',
        secondary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-neon-blue hover:scale-105 active:scale-95',
        outline: 'border border-purple-500 text-purple-500 hover:bg-purple-500/10 hover:shadow-neon-purple',
        ghost: 'text-gray-300 hover:text-white hover:bg-white/5',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-6',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface NeonButtonProps extends Omit<ButtonProps, 'variant' | 'size'>, VariantProps<typeof buttonVariants> {}

const Button: React.FC<NeonButtonProps> = ({
  children,
  className,
  variant,
  size,
  loading = false,
  disabled = false,
  onClick,
  href,
  external = false,
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const buttonClasses = cn(buttonVariants({ variant, size, className }));

  const buttonContent = (
    <>
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-purple-600 to-blue-600"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className={cn('flex-shrink-0', loading && 'opacity-0')}>
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={cn('flex-shrink-0', loading && 'opacity-0')}>
            {icon}
          </span>
        )}
      </span>
      
      {/* Loading indicator */}
      {loading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </motion.div>
      )}
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        whileHover={{
          translateX: '200%',
          transition: { duration: 0.6, ease: "easeInOut" as const }
        }}
      />
    </>
  );

  if (href) {
    if (external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <Link href={href} passHref legacyBehavior>
        <motion.a
          className={buttonClasses}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        >
          {buttonContent}
        </motion.a>
      </Link>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;
