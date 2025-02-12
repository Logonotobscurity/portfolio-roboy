import React from 'react';
import { motion } from 'framer-motion';

interface StorySectionProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

export function StorySection({
  title,
  className = '',
  children
}: StorySectionProps) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-px flex-1 bg-primary/30" />
            <h2 className="text-2xl font-bold text-primary uppercase tracking-wider">
              {title}
            </h2>
            <div className="h-px flex-1 bg-primary/30" />
          </div>
        </motion.div>

        <div className="grid gap-20 md:gap-24">
          {children}
        </div>
      </div>
    </section>
  );
} 