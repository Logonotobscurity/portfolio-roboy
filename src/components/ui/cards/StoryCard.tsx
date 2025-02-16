import { motion } from 'framer-motion';

interface StoryCardProps {
  title: string;
  content: string;
  image: string;
  className?: string;
}

export function StoryCard({
  title,
  content,
  image,
  className
}: StoryCardProps) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {title}
        </h2>
        <div className="space-y-4">
          {content.split('\n').map((paragraph, index) => (
            <p 
              key={index}
              className="text-gray-300 text-lg leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </motion.div>

      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-video overflow-hidden rounded-lg"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>
      )}
    </div>
  );
} 