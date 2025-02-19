import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { HeroTitle } from '@/components/ui/typography/HeroTitle';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage: string;
  pattern?: 'grid' | 'kente' | 'dots';
  height?: 'full' | 'large' | 'medium';
  withGlitch?: boolean;
  align?: 'left' | 'center';
  contentWidth?: 'normal' | 'wide' | 'full';
}

const heightClasses = {
  full: 'min-h-screen',
  large: 'min-h-[80vh]',
  medium: 'min-h-[50vh]'
};

const containerWidthClasses = {
  normal: 'max-w-4xl',
  wide: 'max-w-6xl',
  full: 'max-w-full'
};

const containerAlignClasses = {
  left: 'items-start text-left',
  center: 'items-center text-center'
};

export function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  backgroundImage,
  pattern = 'grid',
  height = 'large',
  withGlitch = true,
  align = 'left',
  contentWidth = 'normal'
}: HeroSectionProps) {
  return (
    <section className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden pt-16 sm:pt-24`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt="Hero Background"
          className="h-full w-full object-cover opacity-50"
          loading="eager"
        />
        <PatternOverlay variant={pattern} className="opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-black/90 via-retro-black/50 to-retro-black" />
      </div>

      {/* Content */}
      <div className={`container mx-auto px-4 sm:px-6 relative z-10 flex ${containerAlignClasses[align]}`}>
        <div className={`${containerWidthClasses[contentWidth]} w-full`}>
          <HeroTitle
            title={title}
            subtitle={subtitle}
            description={description}
            withGlitch={withGlitch}
            align={align}
          />

          {ctaText && ctaLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`flex flex-col sm:flex-row gap-4 mt-8 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to={ctaLink}
                  className="inline-flex w-full sm:w-auto justify-center items-center rounded-full border-2 border-primary bg-black/60 px-8 sm:px-12 py-3 sm:py-4 font-mono text-base sm:text-lg text-primary-text backdrop-blur-sm transition-all duration-300 hover:bg-primary/90 hover:text-white hover:border-primary-light hover:shadow-[0_0_20px_rgba(107,76,245,0.6)] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-black"
                >
                  {ctaText}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
} 