import React from 'react';
import { motion } from 'framer-motion';
import { ChapterHeading } from './ChapterHeading';
import { LucideIcon } from 'lucide-react';

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  pattern?: 'dwennimmen' | 'gye-nyame' | 'sankofa' | 'adinkra' | 'kente' | 'geometric' | 'dots' | 'grid-pattern';
  gradient?: 'top' | 'center' | 'bottom' | 'none';
  LeftIcon?: LucideIcon;
  RightIcon?: LucideIcon;
  className?: string;
  children: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function ContentSection({
  id,
  title,
  subtitle,
  pattern = 'adinkra',
  gradient = 'none',
  LeftIcon,
  RightIcon,
  className = '',
  children
}: ContentSectionProps) {
  const gradientPatterns = {
    top: 'bg-[radial-gradient(ellipse_at_top,#2D00F710_0%,transparent_70%)]',
    center: 'bg-[radial-gradient(circle_at_center,#2D00F710_0%,transparent_65%)]',
    bottom: 'bg-[radial-gradient(circle_at_bottom,#2D00F710_0%,transparent_60%)]',
    none: ''
  };

  return (
    <section id={id} className={`relative py-16 md:py-20 ${className}`}>
      <div className={`absolute inset-0 ${gradientPatterns[gradient]}`} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ChapterHeading
            title={title}
            subtitle={subtitle ?? ""}
            pattern={pattern}
            {...(LeftIcon && { LeftIcon })}
            {...(RightIcon && { RightIcon })}
            variant="gradient"
          />
          <div className="mt-8 md:mt-12">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 