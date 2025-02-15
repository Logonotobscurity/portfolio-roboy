import React from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { cn } from '@/lib/utils';

export interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'default' | 'highlight' | 'dark';
  hover?: boolean;
}

export function RetroCard({
  children,
  className = '',
  variant = 'primary',
  hover = true,
}: RetroCardProps): React.ReactElement {
  const baseStyles = 'relative overflow-hidden rounded-lg border-2 p-6 backdrop-blur-sm transition-all duration-300';
  
  const variantStyles = {
    primary: 'border-primary/20 bg-black/40 text-white hover:border-primary/40 hover:bg-black/60',
    secondary: 'border-white/10 bg-black/30 text-white hover:border-primary/30 hover:bg-black/50',
    default: 'border-white/5 bg-transparent text-white hover:border-white/20 hover:bg-black/20',
    highlight: 'border-primary/30 bg-primary/5 text-white hover:border-primary/50 hover:bg-primary/10',
    dark: 'border-white/10 bg-black/70 text-white hover:border-primary/30 hover:bg-black/80'
  };

  const hoverEffects = hover ? 'hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(45,0,247,0.15)]' : '';

  return (
    <motion.div
      className={cn(
        baseStyles,
        variantStyles[variant],
        hoverEffects,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">
        {children}
      </div>
      <PatternOverlay variant="dots" className="opacity-[0.03]" />
      {variant === 'highlight' && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/10 via-primary/5 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/[0.02] to-primary/[0.05]" />
    </motion.div>
  );
} 