import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChapterHeadingProps {
  children: ReactNode;
  className?: string;
  subtitle?: string;
}

export function ChapterHeading({ children, className, subtitle }: ChapterHeadingProps) {
  return (
    <motion.div
      className={cn('space-y-2', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{children}</h2>
      {subtitle && (
        <p className="text-lg text-gray-600 dark:text-gray-400">{subtitle}</p>
      )}
    </motion.div>
  );
} 