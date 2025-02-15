import { motion } from "framer-motion";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/data-display/TimelineContent";

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

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8 sm:mb-16"
      >
        <div className="flex items-center gap-3 sm:gap-4 justify-center">
          <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-primary/30" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary uppercase tracking-wider font-display">
            Fashion & Style
          </h2>
          <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-primary/30" />
        </div>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Where street culture meets high fashion
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 translate-y-2 sm:translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
        className="mt-8 sm:mt-16 text-center"
      >
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          Every outfit tells a story, every appearance makes a statement. Fashion isn't just about clothes – it's about expressing personality and creating memorable moments.
        </p>
      </motion.div>
    </div>
  );
} 