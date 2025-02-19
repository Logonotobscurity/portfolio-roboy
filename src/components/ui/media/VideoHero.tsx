import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { GlitchText } from '@/components/ui/typography/GlitchText';
import { useEffect, useRef, useState } from 'react';

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  videoUrl: string;
  fallbackImageUrl?: string;
}

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay }
  })
};

export function VideoHero({
  title,
  subtitle,
  description,
  ctaText = 'BOOK ME NOW',
  ctaLink = '/contact',
  videoUrl,
  fallbackImageUrl,
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-retro-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster={fallbackImageUrl}
          preload="metadata"
        >
          <source src={videoUrl} type="video/mp4" />
          {fallbackImageUrl && (
            <img
              src={fallbackImageUrl}
              alt="Background"
              className="h-full w-full object-cover"
              loading="eager"
            />
          )}
        </video>
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-retro-black via-retro-black/90 to-transparent transition-opacity duration-500 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </div>

      {/* Enhanced Pattern Overlays */}
      <PatternOverlay variant="dots" className="opacity-30" />
      <PatternOverlay variant="lines" className="opacity-40" />
      <PatternOverlay variant="grid" className="opacity-[0.12]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />

      {/* Content */}
      <div className="relative flex min-h-[80vh] items-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            custom={0.2}
          >
            <GlitchText
              text={title}
              className="font-display text-4xl font-bold leading-tight text-retro-white md:text-6xl lg:text-7xl [text-shadow:_0_0_15px_rgba(45,0,247,0.3)]"
            />

            {subtitle && (
              <motion.p
                className="mt-4 font-mono text-lg text-primary-text md:text-xl lg:text-2xl [text-shadow:_0_0_10px_rgba(139,127,255,0.4)]"
                variants={fadeInUpVariants}
                custom={0.7}
              >
                {subtitle}
              </motion.p>
            )}

            {description && (
              <motion.p
                className="mt-6 max-w-2xl text-lg text-gray-200 lg:text-xl [text-shadow:_0_0_8px_rgba(240,240,240,0.2)]"
                variants={fadeInUpVariants}
                custom={0.9}
              >
                {description}
              </motion.p>
            )}

            {ctaText && (
              <motion.div
                variants={fadeInUpVariants}
                custom={1.1}
                className="mt-8"
              >
                <Link
                  to={ctaLink}
                  className="
                    group relative inline-block overflow-hidden rounded-full border-2 border-primary
                    bg-black/60 px-8 py-3 font-mono text-lg text-primary-text backdrop-blur-sm
                    transition-all duration-300 hover:bg-primary/90 hover:text-white hover:border-primary-light 
                    hover:shadow-[0_0_20px_rgba(107,76,245,0.6)] focus:outline-none focus:ring-2 
                    focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-black lg:text-xl
                  "
                >
                  <span className="relative z-10">{ctaText}</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-primary/90 to-primary-light opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 