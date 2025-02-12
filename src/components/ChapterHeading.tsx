import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ChapterHeadingProps {
  title: string;
  subtitle?: string;
  pattern?: 'dwennimmen' | 'gye-nyame' | 'sankofa' | 'adinkra' | 'kente' | 'geometric' | 'dots' | 'grid-pattern';
  LeftIcon?: LucideIcon;
  RightIcon?: LucideIcon;
  align?: 'left' | 'center' | 'right';
  variant?: 'primary' | 'secondary' | 'gradient';
}

export function ChapterHeading({
  title,
  subtitle,
  pattern = 'adinkra',
  LeftIcon,
  RightIcon,
  align = 'center',
  variant = 'primary'
}: ChapterHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const titleClasses = {
    primary: 'text-primary',
    secondary: 'text-white',
    gradient: 'bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary'
  };

  return (
    <div className="relative mb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <img
          src={`/patterns/${pattern}.svg`}
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative z-10 ${alignmentClasses[align]}`}
      >
        {subtitle && (
          <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider">
            {subtitle}
          </p>
        )}
        
        <div className={`flex items-center justify-${align} gap-4`}>
          {LeftIcon && <LeftIcon className="h-8 w-8 text-primary" />}
          <h2 className={`text-4xl font-black ${titleClasses[variant]}`}>
            {title}
          </h2>
          {RightIcon && <RightIcon className="h-8 w-8 text-primary" />}
        </div>

        {/* Decorative Line */}
        <div className={`mt-4 flex justify-${align} items-center gap-4`}>
          <div className="h-px w-12 bg-primary/30" />
          <img
            src={`/patterns/${pattern}.svg`}
            alt=""
            className="w-6 h-6 opacity-50"
          />
          <div className="h-px w-12 bg-primary/30" />
        </div>
      </motion.div>
    </div>
  );
} 