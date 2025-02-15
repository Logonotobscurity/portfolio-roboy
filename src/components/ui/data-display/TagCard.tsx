import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { RetroCard } from '@/components/ui/interactive/RetroCard';

interface TagCardProps {
  icon: LucideIcon;
  title: string;
  content: string;
  description?: string;
  href?: string;
  className?: string;
}

export function TagCard({
  icon: Icon,
  title,
  content,
  description,
  href,
  className = ''
}: TagCardProps) {
  const CardContent = () => (
    <div className="flex items-start gap-6">
      <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-white mb-1">
          {title}
        </h3>
        {href ? (
          <>
            <a 
              href={href}
              className="text-gray-300 hover:text-primary transition-colors duration-300 block"
            >
              {content}
            </a>
            {description && (
              <p className="text-sm text-gray-400 mt-1">{description}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-gray-300">{content}</p>
            {description && (
              <p className="text-sm text-primary mt-1">{description}</p>
            )}
          </>
        )}
      </div>
      {href && (
        <motion.div
          className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          →
        </motion.div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group ${className}`}
    >
      <RetroCard className="p-6 hover:bg-primary/5 transition-all duration-300 border border-primary/10 hover:border-primary/30">
        <CardContent />
      </RetroCard>
    </motion.div>
  );
} 