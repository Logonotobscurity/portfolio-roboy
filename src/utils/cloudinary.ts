import { Cloudinary } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { scale, fill } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

// Initialize Cloudinary instance
export const cloudinary = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  },
  url: {
    secure: true
  }
});

export interface ImageTransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg';
  crop?: 'scale' | 'fill';
}

/**
 * Get optimized image URL from Cloudinary
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Transform options for the image
 */
export const getOptimizedImageUrl = (publicId: string, options: ImageTransformOptions = {}) => {
  const { 
    width, 
    height, 
    quality: imageQuality = 'auto', 
    format: imageFormat = 'auto',
    crop = 'scale'
  } = options;

  let image = cloudinary.image(publicId);

  // Apply transformations
  if (typeof width === 'number' || typeof height === 'number') {
    if (crop === 'fill' && typeof width === 'number' && typeof height === 'number') {
      image = image.resize(
        fill()
          .width(width)
          .height(height)
          .gravity(autoGravity())
      );
    } else {
      const scaleTransform = scale();
      if (typeof width === 'number') {
        scaleTransform.width(width);
      }
      if (typeof height === 'number') {
        scaleTransform.height(height);
      }
      image = image.resize(scaleTransform);
    }
  }

  // Set quality
  if (imageQuality === 'auto') {
    image = image.delivery(quality('auto'));
  } else {
    image = image.delivery(quality(imageQuality));
  }

  // Set format
  if (imageFormat === 'auto') {
    image = image.delivery(format(auto()));
  } else {
    image = image.delivery(format(imageFormat));
  }

  return image.toURL();
};

/**
 * Get optimized video URL from Cloudinary
 * @param publicId - The public ID of the video in Cloudinary
 * @param options - Transform options for the video
 */
export const getOptimizedVideoUrl = (publicId: string, options: ImageTransformOptions = {}) => {
  const { 
    width, 
    height, 
    quality: videoQuality = 'auto',
    crop = 'scale'
  } = options;

  let video = cloudinary.video(publicId);

  // Apply transformations
  if (typeof width === 'number' || typeof height === 'number') {
    if (crop === 'fill' && typeof width === 'number' && typeof height === 'number') {
      video = video.resize(
        fill()
          .width(width)
          .height(height)
          .gravity(autoGravity())
      );
    } else {
      const scaleTransform = scale();
      if (typeof width === 'number') {
        scaleTransform.width(width);
      }
      if (typeof height === 'number') {
        scaleTransform.height(height);
      }
      video = video.resize(scaleTransform);
    }
  }

  // Set quality
  if (videoQuality === 'auto') {
    video = video.delivery(quality('auto'));
  } else {
    video = video.delivery(quality(videoQuality));
  }

  // Always use auto format for videos
  video = video.delivery(format(auto()));

  return video.toURL();
};

/**
 * Get a thumbnail URL for an image
 * @param publicId - The public ID of the image in Cloudinary
 * @param size - The size of the thumbnail (width and height)
 */
export const getThumbnailUrl = (publicId: string, size: number = 300) => {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'fill'
  });
}; 