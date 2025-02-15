import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
  overlay?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]'
};

export function ImageCard({
  src,
  alt,
  children,
  className,
  aspectRatio = 'landscape',
  overlay = true
}: ImageCardProps) {
  return (
    <motion.div
      className={cn(
        'relative overflow-hidden rounded-lg',
        aspectRatioClasses[aspectRatio],
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
      )}
      {children && (
        <div className="absolute inset-0 p-4 flex flex-col justify-end">
          {children}
        </div>
      )}
    </motion.div>
  );
} 