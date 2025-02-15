import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-16 ${className}`}
    >
      <div className="flex items-center gap-4 justify-center">
        <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
        <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display">
          {title}
        </h2>
        <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
      </div>
      {subtitle && (
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
} 