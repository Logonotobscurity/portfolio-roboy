import { motion } from 'framer-motion';

const brands = [
  'Nike',
  'Adidas',
  'Puma',
  'Coca-Cola',
  'Pepsi',
  'Mercedes-Benz',
  'BMW',
  'Apple',
  'Samsung',
  'Sony',
  // Add more brands as needed
];

export function BrandCarousel() {
  return (
    <div className="relative overflow-hidden bg-retro-black py-20">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-retro-black via-transparent to-retro-black" />
      
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: [0, -1920], // Adjust based on content width
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="flex items-center justify-center"
          >
            <span className="font-display text-4xl font-bold tracking-wider text-gray-700/50 transition-colors duration-300 hover:text-primary">
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
      
      <motion.div
        className="mt-8 flex gap-8 whitespace-nowrap"
        animate={{
          x: [-1920, 0], // Adjust based on content width
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand}-${index}-reverse`}
            className="flex items-center justify-center"
          >
            <span className="font-display text-4xl font-bold tracking-wider text-gray-700/50 transition-colors duration-300 hover:text-primary">
              {brand}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
} 