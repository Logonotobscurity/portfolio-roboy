import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChapterHeading } from '@/components/ui/typography/ChapterHeading';
import { cn } from '@/lib/utils';

interface ContentSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  gradient?: 'top' | 'center' | 'bottom' | 'none';
  className?: string;
  children: ReactNode;
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
  gradient = 'none',
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
    <section id={id} className={cn('relative py-16 md:py-20', className)}>
      <div className={`absolute inset-0 ${gradientPatterns[gradient]}`} />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <ChapterHeading subtitle={subtitle}>
            {title}
          </ChapterHeading>
          <div className="mt-8 md:mt-12">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 