import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RetroCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function RetroCard({ children, className, variant = 'primary' }: RetroCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-lg border-2 border-black bg-white p-6 shadow-retro',
        variant === 'primary' ? 'bg-white' : 'bg-gray-100',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
} 