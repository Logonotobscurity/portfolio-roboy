import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchText } from '@/components/ui/typography/GlitchText';
import { X, Camera, Award, Heart, Mic, Star, Users, Sparkles } from 'lucide-react';
import { MasonryGrid } from '@/components/ui/data-display/MasonryGrid';
import { SECTION_IDS, SECTION_NAMES } from '@/config/sections';
import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import { HeroSection } from '@/components/ui/sections/HeroSection';
import {
  DialogProvider,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogImage,
  DialogTitle,
  DialogDescription
} from '@/components/ui/interactive/Dialog';

// Featured images that will have grayscale effect
const GRAYSCALE_IMAGES = [
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

const galleryImages: ImageData[] = [
  {
    src: '/images/gallery/1.jpg',
    alt: 'Performance at Madison Square Garden',
    category: 'Performances',
    featured: true
  },
  // Hero Images
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
  // Events Category
  {
    src: '/images/projects/lovethestage.jpg',
    alt: 'Stage Energy',
    category: 'Events',
    description: 'Bringing electric vibes to every performance'
  },
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
    src: '/images/projects/welovefashion.jpg',
    alt: 'Fashion Love',
    category: 'Fashion'
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
    src: '/images/projects/energy.jpg',
    alt: 'Pure Energy',
    category: 'Entertainment'
  },
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
  }
] as const;

type GalleryImage = (typeof galleryImages)[0];

const categories = [
  { value: 'all', label: 'All' },
  { value: 'Events', label: 'Events' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Brands', label: 'Brands' },
  { value: 'MC', label: 'MC Services' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Awards', label: 'Awards' },
  { value: 'Philanthropy', label: 'Philanthropy' }
];

interface LightboxProps {
  image: ImageData | null;
  onClose: () => void;
}

function Lightbox({ image, onClose }: LightboxProps) {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      >
        <motion.button
          onClick={onClose}
          className="absolute right-4 top-4 text-white hover:text-primary"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={24} />
        </motion.button>
        <motion.img
          src={image.src}
          alt={image.alt}
          className="max-h-[90vh] max-w-[90vw] object-contain"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold">{image.alt}</h3>
          <p className="text-retro-gray">{image.category}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  
  const filteredImages = useMemo(() => {
    return selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);
  }, [selectedCategory]);

  const handleImageClick = useCallback((image: ImageData) => {
    setSelectedImage(image);
  }, []);

  return (
    <div className="min-h-screen bg-retro-black text-retro-white">
      <HeroSection
        title="VISUAL JOURNEY"
        subtitle="| CAPTURING MOMENTS & CREATING MEMORIES |"
        description="Explore the moments that define RooBoy's presence in events, fashion, and entertainment"
        backgroundImage="/images/hero/hero-beast.jpg"
        pattern="kente"
        height="large"
        align="left"
        contentWidth="normal"
        withGlitch={true}
      />
      
      {/* Categories */}
      <SectionContainer id={SECTION_IDS.CATEGORIES} pattern="grid">
        <SectionHeader
          title={SECTION_NAMES[SECTION_IDS.CATEGORIES]}
          subtitle="Browse through different aspects of my work"
        />
        <div className="scrollbar-none -mx-4 px-4 pb-4 flex overflow-x-auto sm:overflow-x-visible sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:justify-center gap-3 sm:gap-4">
          {categories.map(category => (
            <motion.button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`shrink-0 px-4 sm:px-6 py-2 rounded-full border-2 font-mono text-sm sm:text-base transition-all duration-300 ${
                selectedCategory === category.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-primary/30 text-white hover:border-primary'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </SectionContainer>

      {/* Gallery Grid */}
      <SectionContainer id={SECTION_IDS.GALLERY_GRID} pattern="grid" className="mt-8 sm:mt-12">
        <div className="px-2 sm:px-4">
          <MasonryGrid
            images={filteredImages}
            onImageClick={handleImageClick}
            grayscaleImages={GRAYSCALE_IMAGES}
          />
        </div>
      </SectionContainer>

      {/* Lightbox */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}