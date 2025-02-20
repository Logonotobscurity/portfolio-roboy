import { useState, useEffect } from 'react';
import { getCloudinaryUrl, getResponsiveImageSources, getPublicUrl } from '@/utils/assetUtils';
import { getImageMetadata } from '@/utils/image-metadata';

interface ResponsiveImageProps {
  src: string;
  alt?: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function ResponsiveImage({
  src,
  alt,
  title,
  className = '',
  width,
  height,
  priority = false,
  loading = 'lazy',
  objectFit = 'cover'
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Get metadata for the image
  const metadata = getImageMetadata(src);
  const finalAlt = alt || metadata.alt;
  const finalTitle = title || metadata.title || metadata.alt;

  // Get responsive image sources
  const { srcSet, sizes } = getResponsiveImageSources(src);

  // Get optimized fallback URL
  const fallbackUrl = getCloudinaryUrl(src, {
    width: width || 800,
    height: height,
    quality: 'auto',
    format: 'auto',
    crop: 'fill',
    gravity: 'auto'
  });

  // Handle image loading error
  const handleError = () => {
    console.error(`Failed to load image: ${currentSrc}`);
    setError(true);

    // If we're already using a local URL, don't try again
    if (currentSrc.startsWith('http://localhost:3000') || currentSrc.includes(getPublicUrl())) {
      return;
    }

    // Try loading from local development server or public path
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : '';
    const publicPath = getPublicUrl();
    const localUrl = `${baseUrl}${publicPath}${src}`;
    setCurrentSrc(localUrl);
  };

  // Preload high-priority images
  useEffect(() => {
    if (priority && !isLoaded && !error) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = fallbackUrl;
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [priority, fallbackUrl, isLoaded, error]);

  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={error ? currentSrc : fallbackUrl}
        srcSet={error ? undefined : srcSet}
        sizes={error ? undefined : sizes}
        alt={finalAlt}
        title={finalTitle}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
      />
    </div>
  );
} 