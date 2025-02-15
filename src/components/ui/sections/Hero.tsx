import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import AnimatedText from '@/components/ui/typography/AnimatedText';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText = 'BOOK ME NOW',
  ctaLink = '/contact',
  backgroundImage,
}: HeroProps) {
  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-retro-black">
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-retro-black via-retro-black/80 to-transparent" />
        </motion.div>
      )}

      {/* Patterns */}
      <PatternOverlay variant="dots" className="opacity-[0.05]" />
      <PatternOverlay variant="lines" className="opacity-[0.03]" />
      <PatternOverlay variant="grid" className="opacity-[0.02]" />

      {/* Content */}
      <div className="relative flex min-h-[70vh] items-center">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-display text-4xl font-bold leading-tight text-retro-white md:text-6xl">
              <span className="relative">
                {title}
                <motion.span
                  className="absolute -inset-2 -z-10 block rounded bg-primary/10"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>

            {subtitle && (
              <motion.p
                className="mt-4 font-mono text-lg text-primary md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {subtitle}
              </motion.p>
            )}

            {description && (
              <motion.p
                className="mt-6 max-w-2xl text-lg text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {description}
              </motion.p>
            )}

            {ctaText && (
              <Link
                to={ctaLink}
                className="
                  inline-block rounded-full border-2 border-primary bg-black/50
                  px-8 py-3 font-mono text-lg text-primary backdrop-blur-sm
                  transition-all duration-300 hover:bg-primary hover:text-white
                  hover:shadow-[0_0_15px_rgba(45,0,247,0.5)]
                "
              >
                {ctaText}
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
} 