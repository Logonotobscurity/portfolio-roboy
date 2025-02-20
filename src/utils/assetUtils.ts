import { getOptimizedImageUrl, getThumbnailUrl } from './cloudinary';
import cloudinaryAssets from '../config/cloudinaryAssets.json';
import { ImagePaths } from '@/config/imagePaths';

interface CloudinaryAsset {
  url: string;
  optimizedUrl: string;
  thumbnailUrl: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  breakpoints: Array<{
    width: number;
    height: number;
    bytes: number;
    url: string;
    secure_url: string;
  }>;
  eager: Array<{
    width: number;
    height: number;
    url: string;
    secure_url: string;
    status: string;
    batch_id: string;
  }>;
}

const CLOUDINARY_CLOUD_NAME = 'dq33isoi7';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

interface CloudinaryTransformations {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg';
  crop?: 'fill' | 'scale' | 'fit';
  gravity?: 'auto' | 'center';
}

/**
 * Returns the base public URL for assets based on the deployment environment
 */
export const getPublicUrl = (): string => {
  // Check if we're in GitHub Pages environment
  if (import.meta.env.VITE_GITHUB_PAGES === 'true') {
    return '/portfolio-roboy';
  }
  // Check if we're in development
  if (import.meta.env.DEV) {
    return '';
  }
  // Default for other production environments
  return '';
};

/**
 * Gets the asset path with proper Cloudinary URL and optimizations
 * @param path Image path from ImagePaths
 * @returns Optimized asset URL
 */
export const getAssetPath = (path: string): string => {
  try {
    // First try to get the Cloudinary asset
    const asset = getCloudinaryAsset(path);
    if (asset) {
      return asset.optimizedUrl;
    }

    // If not found in Cloudinary assets, generate a new Cloudinary URL
    const defaultTransformations: CloudinaryTransformations = {
      quality: 'auto',
      format: 'auto',
      gravity: 'auto'
    };

    return getCloudinaryUrl(path, defaultTransformations);
  } catch (error) {
    console.warn(`Error getting asset path for ${path}:`, error);
    // Fallback to local development URL if Cloudinary fails
    return `http://localhost:3000${path}`;
  }
};

/**
 * Get a Cloudinary asset by its path
 * @param path - The original path of the asset relative to the public directory
 * @returns The Cloudinary asset information or null if not found
 */
export const getCloudinaryAsset = (path: string): CloudinaryAsset | null => {
  try {
    // Remove leading slash and file extension
    const normalizedPath = path
      .replace(/^\//, '')
      .replace(/\.[^/.]+$/, '')
      .replace(/\\/g, '/');

    // Cast the cloudinaryAssets to unknown first, then to the correct type
    const assets = cloudinaryAssets as unknown as Record<string, CloudinaryAsset>;
    return assets[normalizedPath] || null;
  } catch (error) {
    console.warn(`Error getting Cloudinary asset for ${path}:`, error);
    return null;
  }
};

/**
 * Get an optimized image URL from Cloudinary
 * @param path - The original path of the asset relative to the public directory
 * @param options - Transform options for the image
 * @returns The optimized URL or the original path if the asset is not found in Cloudinary
 */
export const getOptimizedAssetUrl = (path: string, options?: Parameters<typeof getOptimizedImageUrl>[1]): string => {
  const asset = getCloudinaryAsset(path);
  if (!asset) {
    console.warn(`Asset not found in Cloudinary: ${path}`);
    return path;
  }

  // If no options are provided, return the pre-optimized URL
  if (!options) {
    return asset.optimizedUrl;
  }

  // Otherwise, generate a new URL with the specified options
  return getOptimizedImageUrl(asset.url, options);
};

/**
 * Get a thumbnail URL for an asset
 * @param path - The original path of the asset relative to the public directory
 * @param size - The size of the thumbnail
 * @returns The thumbnail URL or the original path if the asset is not found in Cloudinary
 */
export const getAssetThumbnail = (path: string, size?: number): string => {
  const asset = getCloudinaryAsset(path);
  if (!asset) {
    console.warn(`Asset not found in Cloudinary: ${path}`);
    return path;
  }

  // If no size is specified, return the pre-generated thumbnail
  if (!size) {
    return asset.thumbnailUrl;
  }

  // Otherwise, generate a new thumbnail with the specified size
  return getThumbnailUrl(asset.url, size);
};

/**
 * Get the most appropriate breakpoint URL for a given width
 * @param path - The original path of the asset relative to the public directory
 * @param targetWidth - The desired width of the image
 * @returns The URL of the closest breakpoint or the original optimized URL
 */
export const getResponsiveAssetUrl = (path: string, targetWidth: number): string => {
  const asset = getCloudinaryAsset(path);
  if (!asset) {
    console.warn(`Asset not found in Cloudinary: ${path}`);
    return path;
  }

  // Find the closest breakpoint
  const breakpoint = asset.breakpoints
    .sort((a, b) => Math.abs(a.width - targetWidth) - Math.abs(b.width - targetWidth))
    [0];

  return breakpoint?.url || asset.optimizedUrl;
};

/**
 * Converts a local image path to its Cloudinary URL with optimizations
 * @param path Local image path from ImagePaths
 * @param transformations Optional Cloudinary transformations
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(path: string, transformations: CloudinaryTransformations = {}): string {
  try {
    // Remove leading slash and convert spaces to %20
    const cleanPath = path.slice(1).replace(/ /g, '%20');
    
    // Build transformation string
    const transforms = [
      transformations.width && `w_${transformations.width}`,
      transformations.height && `h_${transformations.height}`,
      transformations.quality || 'q_auto',
      transformations.format || 'f_auto',
      transformations.crop && `c_${transformations.crop}`,
      transformations.gravity && `g_${transformations.gravity}`,
    ].filter(Boolean).join(',');

    return `${CLOUDINARY_BASE_URL}${transforms ? `/${transforms}` : ''}/v1740044458/${cleanPath}`;
  } catch (error) {
    console.warn(`Error generating Cloudinary URL for ${path}:`, error);
    // Fallback to local development URL with proper base path
    const baseUrl = import.meta.env.DEV ? 'http://localhost:3000' : '';
    const publicPath = getPublicUrl();
    return `${baseUrl}${publicPath}${path}`;
  }
}

/**
 * Gets responsive image sources for different screen sizes
 * @param path Image path from ImagePaths
 * @returns Object with srcSet and sizes for responsive images
 */
export function getResponsiveImageSources(path: string) {
  try {
    const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    
    const srcSet = breakpoints
      .map(width => {
        const url = getCloudinaryUrl(path, {
          width,
          quality: 'auto',
          format: 'auto',
          crop: 'fill',
          gravity: 'auto'
        });
        return `${url} ${width}w`;
      })
      .join(', ');

    const sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';

    return { srcSet, sizes };
  } catch (error) {
    console.warn(`Error generating responsive sources for ${path}:`, error);
    // Return empty srcSet and sizes if there's an error
    return { srcSet: '', sizes: '' };
  }
} 