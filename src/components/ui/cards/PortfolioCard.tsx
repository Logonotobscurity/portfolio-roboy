import { motion } from 'framer-motion';

interface Event {
  name: string;
  role: string;
}

interface PortfolioCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  events: Event[];
  className?: string;
}

export function PortfolioCard({
  title,
  subtitle,
  imageUrl,
  events,
  className = ''
}: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-black/20 rounded-lg overflow-hidden border border-primary/10 ${className}`}
    >
      {/* Image Section */}
      <div className="relative aspect-video">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="text-sm text-primary/80 uppercase tracking-wider mb-2">
            {subtitle}
          </div>
          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>
        </div>
      </div>

      {/* Events List */}
      <div className="p-6 space-y-3">
        {events.map((event, index) => (
          <motion.div
            key={event.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between group"
          >
            <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
              {event.name}
            </span>
            <span className="text-sm text-primary/80 uppercase">
              {event.role}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 