import React, { useState, useEffect, useMemo } from 'react';
import { X, Music, Camera, Film } from 'lucide-react';
import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { MasonryGrid } from '@/components/ui/data-display/MasonryGrid';
import { SECTION_IDS } from '@/config/sections';
import { ResponsiveImage } from '@/components/ui/media/ResponsiveImage';

// Featured images that will have grayscale effect
const _GRAYSCALE_IMAGES = [
  '/images/projects/fashionkiller.jpg',
  '/images/projects/energy.jpg',
  '/images/projects/Recognition.jpg',
  '/images/projects/headofstate.jpg',
  '/images/projects/Momentswithclebrity .jpg'
];

interface ImageData {
  src: string;
  alt: string;
  category: string;
  featured?: boolean;
  description?: string;
}

const defaultGalleryImages = [
  // Performance & Entertainment Category
  {
    src: '/images/projects/lovethestage.jpg',
    alt: 'Stage Performance',
    category: 'Performances',
    featured: true,
    description: 'Bringing electric vibes to every performance'
  },
  {
    src: '/images/projects/energy.jpg',
    alt: 'Pure Energy',
    category: 'Performances',
    description: 'Electrifying the stage with pure energy'
  },
  {
    src: '/images/projects/iliveforit.jpg',
    alt: 'Live Performance',
    category: 'Performances',
    description: 'Living for the moment on stage'
  },
  {
    src: '/images/projects/action shoot.jpg',
    alt: 'Action Shot',
    category: 'Performances',
    description: 'Capturing the intensity of live performance'
  },
  {
    src: '/images/projects/actionskool.jpg',
    alt: 'Performance School',
    category: 'Performances',
    description: 'Mastering the art of performance'
  },
  {
    src: '/images/projects/activeandready.jpg',
    alt: 'Ready to Perform',
    category: 'Performances',
    description: 'Always ready to take the stage'
  },
  // Behind the Scenes Category
  {
    src: '/images/projects/ihearsoundanddefinemonemnts.jpg',
    alt: 'Sound Check',
    category: 'Behind the Scenes',
    description: 'Perfecting every detail before the show'
  },
  {
    src: '/images/projects/ihaveallactionon.jpg',
    alt: 'Action Behind the Scenes',
    category: 'Behind the Scenes',
    description: 'Where the magic happens'
  },
  {
    src: '/images/projects/Isharedmoments.jpg',
    alt: 'Shared Moments',
    category: 'Behind the Scenes',
    description: 'Creating memories backstage'
  },
  {
    src: '/images/projects/idefinemoments.jpg',
    alt: 'Defining Moments',
    category: 'Behind the Scenes',
    description: 'The moments that shape the performance'
  },
  // Featured Category
  {
    src: '/images/hero/hero-beast.jpg',
    alt: 'RooBoy Hero',
    category: 'Featured',
    featured: true
  },
  {
    src: '/images/hero/hero-.jpg',
    alt: 'RooBoy Spotlight',
    category: 'Featured',
    featured: true
  },
  {
    src: '/images/projects/kingRoored.jpg',
    alt: 'King RooBoy',
    category: 'Featured',
    featured: true,
    description: 'Ruling the stage with presence'
  },
  {
    src: '/images/projects/declacaredRoo.jpg',
    alt: 'Declared RooBoy',
    category: 'Featured',
    featured: true,
    description: 'Making statements that matter'
  },
  // Events Category
  {
    src: '/images/projects/smirnoffcallings.jpg',
    alt: 'Smirnoff Collaboration',
    category: 'Events',
    description: 'Creating unforgettable brand moments'
  },
  {
    src: '/images/projects/eventkiller.jpg',
    alt: 'Event Mastery',
    category: 'Events'
  },
  {
    src: '/images/projects/momentsonstage.jpg',
    alt: 'Stage Presence',
    category: 'Events'
  },
  {
    src: '/images/projects/event.jpg',
    alt: 'Live Events',
    category: 'Events'
  },
  // Fashion Category
  {
    src: '/images/projects/fashionkiller.jpg',
    alt: 'Fashion Forward',
    category: 'Fashion'
  },
  {
    src: '/images/projects/fashionspeaks.jpg',
    alt: 'Style Statement',
    category: 'Fashion'
  },
  {
    src: '/images/projects/fashionpose.jpg',
    alt: 'Fashion Pose',
    category: 'Fashion',
    description: 'Striking the perfect pose'
  },
  {
    src: '/images/projects/highvogue.jpg',
    alt: 'Vogue Style',
    category: 'Fashion',
    description: 'High fashion moments'
  },
  {
    src: '/images/projects/cultralswag.jpg',
    alt: 'Cultural Swag',
    category: 'Fashion'
  },
  {
    src: '/images/projects/Fashionhost.jpg',
    alt: 'Fashion Host',
    category: 'Fashion'
  },
  {
    src: '/images/projects/fashoionornothing.jpg',
    alt: 'Fashion is Everything',
    category: 'Fashion'
  },
  {
    src: '/images/projects/bluehead.jpg',
    alt: 'Blue Aesthetic',
    category: 'Fashion',
    description: 'Exploring color in fashion'
  },
  // Brand Activations
  {
    src: '/images/projects/rooforsmirnodff.jpg',
    alt: 'Smirnoff Partnership',
    category: 'Brands'
  },
  {
    src: '/images/projects/madesmirnoffamoment.jpg',
    alt: 'Brand Moments',
    category: 'Brands'
  },
  {
    src: '/images/projects/stillonsmirnoff.jpg',
    alt: 'Smirnoff Vibes',
    category: 'Brands'
  },
  {
    src: '/images/projects/madehumanasmirnoff.jpg',
    alt: 'Human Connection',
    category: 'Brands'
  },
  // MC Services
  {
    src: '/images/projects/MChonor.jpg',
    alt: 'MC Excellence',
    category: 'MC'
  },
  {
    src: '/images/projects/headofstate.jpg',
    alt: 'High Profile Events',
    category: 'MC'
  },
  {
    src: '/images/projects/Momentswithclebrity .jpg',
    alt: 'Celebrity Moments',
    category: 'MC'
  },
  // Entertainment & Performance
  {
    src: '/images/projects/RooKingdom.jpg',
    alt: 'RooBoy Kingdom',
    category: 'Entertainment'
  },
  {
    src: '/images/projects/Sharingmonemnts.jpg',
    alt: 'Shared Moments',
    category: 'Entertainment'
  },
  {
    src: '/images/projects/birdsareupforme.jpg',
    alt: 'Birds Eye View',
    category: 'Entertainment'
  },
  // Awards & Recognition
  {
    src: '/images/projects/Recognition.jpg',
    alt: 'Industry Recognition',
    category: 'Awards'
  },
  {
    src: '/images/projects/Awardmoments.jpg',
    alt: 'Award Ceremony',
    category: 'Awards'
  },
  {
    src: '/images/projects/Award Speech .jpg',
    alt: 'Acceptance Speech',
    category: 'Awards'
  },
  // Philanthropy
  {
    src: '/images/philantrophy/rooboy foundation3.jpg',
    alt: 'Foundation Work',
    category: 'Philanthropy',
    description: 'Making a difference in our community'
  },
  {
    src: '/images/philantrophy/Philantophy.jpg',
    alt: 'Community Impact',
    category: 'Philanthropy',
    description: 'Creating positive change through action'
  },
  {
    src: '/images/philantrophy/rooboy foundation 2.jpg',
    alt: 'Youth Empowerment',
    category: 'Philanthropy',
    description: 'Inspiring the next generation'
  },
  {
    src: '/images/philantrophy/Rooboy foundation.jpg',
    alt: 'RooBoy Foundation',
    category: 'Philanthropy',
    description: 'Building a better future together'
  },
  // Additional Performance & Stage images
  {
    src: '/images/projects/Letsdiveintobusiness.jpg',
    alt: 'Business Side',
    category: 'Behind the Scenes',
    description: 'The professional aspect of entertainment'
  },
  {
    src: '/images/projects/ladiesloveRoo.jpg',
    alt: 'Fan Appreciation',
    category: 'Events',
    description: 'Connecting with the audience'
  },
  {
    src: '/images/projects/kngback.jpg',
    alt: 'Return of the King',
    category: 'Featured',
    description: 'Making a grand return'
  },
  {
    src: '/images/projects/forthelove.jpg',
    alt: 'For the Love',
    category: 'Performances',
    description: 'Performing with passion'
  }
] satisfies ImageData[];

interface LightboxProps {
  image: ImageData | null;
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps): JSX.Element | null => {
  if (!image) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>
      <div className="max-w-4xl w-full">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-auto max-h-[80vh] object-contain"
        />
        <div className="mt-4 text-white">
          <h2 className="text-xl font-bold">{image.alt}</h2>
          {image.description && <p className="mt-2">{image.description}</p>}
        </div>
      </div>
    </div>
  );
};

const LoadingAnimation = () => (
  <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
    <div className="relative">
      {/* Animated circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 border-4 border-primary rounded-full animate-pulse opacity-20" />
        <div className="absolute w-24 h-24 border-4 border-primary-light rounded-full animate-pulse delay-75 opacity-40" />
        <div className="absolute w-16 h-16 border-4 border-white rounded-full animate-pulse delay-150 opacity-60" />
      </div>
      
      {/* Animated icons */}
      <div className="relative flex gap-6">
        <Music className="w-8 h-8 text-white animate-bounce" />
        <Camera className="w-8 h-8 text-white animate-bounce delay-100" />
        <Film className="w-8 h-8 text-white animate-bounce delay-200" />
      </div>
      
      {/* Loading text */}
      <div className="mt-8 text-center">
        <p className="text-white text-lg font-medium animate-pulse">
          Loading Gallery
        </p>
        <p className="text-white/60 text-sm mt-2">
          Preparing your visual experience
        </p>
      </div>
    </div>
  </div>
);

const Gallery = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<ImageData[]>([]);

  const categories = [
    'All',
    'Performances',
    'Behind the Scenes',
    'Featured',
    'Events',
    'Fashion',
    'Brands',
    'MC',
    'Awards',
    'Philanthropy'
  ] as const;

  const filteredImages = useMemo(() => {
    return selectedCategory === 'All'
      ? images
      : images.filter(img => img.category === selectedCategory);
  }, [selectedCategory, images]);

  // Preload critical images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        // Preload hero and featured images first
        const criticalImages = defaultGalleryImages
          .filter(img => img.featured)
          .map(img => img.src);

        // Create an array of image loading promises
        const imagePromises = criticalImages.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        // Wait for critical images to load
        await Promise.all(imagePromises);
        
        // Set all images and remove loading state
        setImages(defaultGalleryImages);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        // Still show gallery even if some images fail to preload
        setImages(defaultGalleryImages);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {/* Hero Section */}
      <SectionContainer id={SECTION_IDS.GALLERY_HERO} className="relative min-h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            src="/images/hero/hero-beast.jpg"
            alt="Gallery Hero"
            className="w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 py-20">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Gallery & Portfolio
            </h1>
          </div>
          <div className="animate-fade-in-up delay-200">
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Explore the visual journey of performances, events, and memorable moments
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Gallery Grid Section */}
      <SectionContainer id={SECTION_IDS.GALLERY_GRID} className="bg-gradient-to-b from-black to-gray-900 text-white py-16">
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <MasonryGrid
          images={filteredImages}
          onImageClick={image => setSelectedImage(image)}
        />
      </SectionContainer>

      {selectedImage && (
        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default Gallery;