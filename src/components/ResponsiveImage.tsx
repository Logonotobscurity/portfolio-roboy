import { CSSProperties, useEffect, useState } from 'react';
import { getImageMetadata } from '../utils/image-metadata';

type ImageSize = 'thumbnail' | 'small' | 'medium' | 'large';

interface ResponsiveImageProps {
  src: string;
  alt?: string; // Make alt optional since we'll get it from metadata
  title?: string;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

export function ResponsiveImage({
  src,
  alt,
  title,
  className,
  style,
  sizes = '(max-width: 300px) 150px, (max-width: 800px) 300px, (max-width: 1920px) 800px, 1920px',
  loading = 'lazy',
  priority = false,
  objectFit = 'cover'
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Get metadata for the image
  const metadata = getImageMetadata(src);
  const finalAlt = alt || metadata.alt;
  const finalTitle = title || metadata.title || metadata.alt;
  const finalPriority = priority || metadata.priority || false;

  // Remove file extension from src
  const basePath = src.replace(/\.[^/.]+$/, '');
  
  // Generate srcset for each format and size
  const formats = {
    avif: 'image/avif',
    webp: 'image/webp',
    jpg: 'image/jpeg'
  };

  const imageSizes: ImageSize[] = ['thumbnail', 'small', 'medium', 'large'];
  const dimensions: Record<ImageSize, number> = {
    thumbnail: 150,
    small: 300,
    medium: 800,
    large: 1920
  };

  // Preload high-priority images
  useEffect(() => {
    if (finalPriority && !isLoaded && !error) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = `${basePath}-large.webp`;
      document.head.appendChild(preloadLink);

      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [finalPriority, basePath, isLoaded, error]);

  const combinedStyle: CSSProperties = {
    ...style,
    objectFit,
    aspectRatio: '16/9',
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out',
  };

  const combinedClassName = `${className || ''} ${isLoaded ? 'loaded' : 'loading'}`.trim();

  return (
    <picture className={combinedClassName}>
      {Object.entries(formats).map(([format, mimeType]) => (
        <source
          key={format}
          type={mimeType}
          sizes={sizes}
          srcSet={imageSizes
            .map(size => `${basePath}-${size}.${format} ${dimensions[size]}w`)
            .join(', ')}
        />
      ))}
      
      <img
        src={`${basePath}-large.jpg`}
        alt={finalAlt}
        title={finalTitle}
        style={combinedStyle}
        loading={finalPriority ? 'eager' : loading}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          const img = e.currentTarget;
          img.onerror = null;
          setError(true);
          img.src = `${basePath}-medium.jpg`;
          console.error(`Failed to load image: ${src}`);
        }}
        fetchPriority={finalPriority ? 'high' : 'auto'}
      />
    </picture>
  );
} 