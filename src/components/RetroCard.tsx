import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { PatternOverlay } from './PatternOverlay';
import { cn } from '../utils/cn';

export interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlight' | 'dark';
  hover?: boolean;
}

export function RetroCard({
  children,
  className = '',
  variant = 'default',
  hover = true,
}: RetroCardProps): React.ReactElement {
  const variants = {
    default: 'border-white/10 bg-black/30',
    highlight: 'border-primary/30 bg-primary/5',
    dark: 'border-white/5 bg-black/50',
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-lg border backdrop-blur-xl',
        variants[variant],
        hover && 'hover:border-primary/30 hover:shadow-[0_0_15px_rgba(45,0,247,0.1)]',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
      <PatternOverlay variant="grain" />
      {variant === 'highlight' && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </motion.div>
  );
} 