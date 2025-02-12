import React from 'react';
import { motion } from 'framer-motion';

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
  overlay?: boolean;
}

export function ImageCard({
  src,
  alt,
  title,
  subtitle,
  className = '',
  aspectRatio = 'square',
  overlay = true
}: ImageCardProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`group relative overflow-hidden rounded-lg ${className}`}
    >
      <div className={`relative ${aspectRatioClasses[aspectRatio]}`}>
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
        )}
      </div>
      {(title || subtitle) && (
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {title && (
            <h3 className="text-lg font-bold leading-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-300">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="absolute inset-0 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-white/30" />
    </motion.div>
  );
} 