interface ImageMetadata {
  alt: string;
  title?: string;
  priority?: boolean;
}

type ImageCategory = 'hero' | 'projects' | 'award' | 'philanthropy';

// Centralized image metadata for SEO and accessibility
export const imageMetadata: Record<ImageCategory, Record<string, ImageMetadata>> = {
  hero: {
    'hero-beast': {
      alt: 'Davido performing his hit song at the O2 Arena London, showcasing Nigerian music excellence on the global stage',
      title: 'Davido - Global Nigerian Music Ambassador',
      priority: true
    },
    'hero': {
      alt: 'Burna Boy accepting his Grammy Award, representing a milestone achievement for Nigerian Afrobeats',
      title: 'Burna Boy - Grammy Award Moment',
      priority: true
    }
  },
  projects: {
    'concert-lagos': {
      alt: 'Wizkid Made in Lagos concert at Eko Atlantic City, drawing a record-breaking crowd of over 50,000 fans',
      title: 'Wizkid - Made in Lagos Concert',
      priority: true
    },
    'studio-session': {
      alt: 'Tiwa Savage recording session at Mavin Studios Lagos, collaborating with international producers',
      title: 'Tiwa Savage - Studio Excellence',
      priority: true
    }
  },
  award: {
    'headies-2023': {
      alt: 'Asake and Rema receiving multiple awards at The Headies 2023, celebrating new generation Afrobeats stars',
      title: 'The Headies 2023 - New Generation Excellence',
      priority: true
    },
    'amvca': {
      alt: 'Funke Akindele and Ramsey Nouah at AMVCA 2023, representing the best of Nollywood achievement',
      title: 'AMVCA 2023 - Nollywood Excellence',
      priority: true
    }
  },
  philanthropy: {
    'charity-concert': {
      alt: '2Baba Foundation charity concert featuring Nigerian artists uniting for education, with Don Jazzy and Olamide',
      title: '2Baba Foundation - Music for Education',
      priority: true
    },
    'community-outreach': {
      alt: 'Yemi Alade and Mercy Johnson leading youth empowerment program in Lagos communities',
      title: 'Entertainment Leaders - Community Impact',
      priority: true
    }
  }
};

/**
 * Get metadata for an image by its path
 * @param imagePath Path to the image relative to public/images
 * @returns Image metadata or default metadata if not found
 */
export function getImageMetadata(imagePath: string): ImageMetadata {
  try {
    // Extract category and image name from path
    const pathParts = imagePath.split('/');
    const category = pathParts[pathParts.length - 2] as ImageCategory;
    const imageName = pathParts[pathParts.length - 1].split('.')[0];

    // Return metadata if it exists
    if (imageMetadata[category]?.[imageName]) {
      return imageMetadata[category][imageName];
    }

    // Log warning in development if metadata is missing
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Warning: No metadata found for image "${imagePath}". Please add it to image-metadata.ts`);
    }

    // Return default metadata with Nigerian entertainment context
    return {
      alt: `Nigerian entertainment event featuring ${imageName.split('-').join(' ')}`,
    };
  } catch (error) {
    console.error(`Error getting metadata for image "${imagePath}":`, error);
    return {
      alt: 'Nigerian entertainment event and personalities',
    };
  }
} 