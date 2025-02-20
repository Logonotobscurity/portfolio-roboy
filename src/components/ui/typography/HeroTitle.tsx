import { motion } from 'framer-motion';
import { GlitchText } from '@/components/ui/typography/GlitchText';

interface HeroTitleProps {
  title: string;
  subtitle?: string | undefined;
  description?: string | undefined;
  withGlitch?: boolean;
  align?: 'left' | 'center';
}

export function HeroTitle({
  title,
  subtitle,
  description,
  withGlitch = true,
  align = 'left'
}: HeroTitleProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`mb-6 sm:mb-8 md:mb-12 ${alignmentClasses[align]}`}
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 tracking-tight text-white [text-shadow:_0_0_15px_rgba(45,0,247,0.3)]">
          {withGlitch ? (
            <GlitchText text={title} />
          ) : (
            title
          )}
        </h1>
        {subtitle && (
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-primary-text mt-4 sm:mt-6 font-mono [text-shadow:_0_0_10px_rgba(139,127,255,0.4)]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        )}
        {description && (
          <motion.p
            className={`text-base sm:text-lg text-gray-200 mt-3 sm:mt-4 max-w-3xl ${align === 'center' ? 'mx-auto' : ''} [text-shadow:_0_0_8px_rgba(240,240,240,0.2)]`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
} 