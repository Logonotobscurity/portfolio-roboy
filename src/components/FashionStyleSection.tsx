import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TimelineContent } from './TimelineContent';

const fashionItems = [
  {
    title: "Street Style",
    description: "Blending urban culture with high fashion elements",
    image: "/images/projects/rooboy foundation3.jpg"
  },
  {
    title: "Stage Presence",
    description: "Making statements that command attention",
    image: "/images/projects/momentsonstage.jpg"
  },
  {
    title: "African Fusion",
    description: "Contemporary takes on traditional African aesthetics",
    image: "/images/projects/RooKingdom.jpg"
  }
];

export function FashionStyleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
          <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display">
            Fashion & Style
          </h2>
          <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
        </div>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Where street culture meets high fashion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {fashionItems.map((item, index) => (
          <TimelineContent
            key={item.title}
            animationNum={index}
            className="group"
          >
            <motion.div
              className="relative overflow-hidden rounded-xl aspect-[3/4]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
              <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </TimelineContent>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <p className="text-gray-300 max-w-2xl mx-auto">
          Every outfit tells a story, every appearance makes a statement. Fashion isn't just about clothes – it's about expressing personality and creating memorable moments.
        </p>
      </motion.div>
    </div>
  );
} 