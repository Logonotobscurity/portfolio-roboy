import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CTACardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function CTACard({
  title,
  description,
  children,
  className,
  variant = 'primary'
}: CTACardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-lg p-6',
        variant === 'primary'
          ? 'bg-primary text-white'
          : 'bg-gray-100 dark:bg-gray-800',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative z-10">
        <h3 className="text-2xl font-bold">{title}</h3>
        {description && (
          <p className={cn(
            'mt-2',
            variant === 'primary'
              ? 'text-white/80'
              : 'text-gray-600 dark:text-gray-400'
          )}>
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
    </motion.div>
  );
} 