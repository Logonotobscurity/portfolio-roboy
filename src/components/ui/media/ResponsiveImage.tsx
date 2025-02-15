import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
}

export function ResponsiveImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy'
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate paths for different formats
  const basePath = src.replace(/\.[^/.]+$/, '');
  const avifSrc = `${basePath}.avif`;
  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = src;

  useEffect(() => {
    // Reset states when src changes
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <motion.picture
      animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`block ${className}`}
    >
      {!error && (
        <>
          <source
            type="image/avif"
            srcSet={avifSrc}
            onError={() => setError(true)}
          />
          <source
            type="image/webp"
            srcSet={webpSrc}
            onError={() => setError(true)}
          />
        </>
      )}
      <img
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      />
    </motion.picture>
  );
} 