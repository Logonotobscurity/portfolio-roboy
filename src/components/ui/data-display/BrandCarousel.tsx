import { motion } from 'framer-motion';
import { RetroCard } from '@/components/ui/interactive/RetroCard';

const brands = [
  {
    name: 'Smirnoff Nigeria',
    logo: '/brands/smirnoff.svg',
    category: 'Brand Partner'
  },
  {
    name: 'Stanbic IBTC',
    logo: '/brands/stanbic.svg',
    category: 'Corporate Client'
  },
  {
    name: 'MTV Base',
    logo: '/brands/mtv.svg',
    category: 'Media Partner'
  },
  {
    name: 'Gidi Culture Festival',
    logo: '/brands/gidi.svg',
    category: 'Festival Partner'
  },
  {
    name: 'Pulse Nigeria',
    logo: '/brands/pulse.svg',
    category: 'Media Partner'
  },
  {
    name: 'Gabriel Tosh Luxury',
    logo: '/brands/gabriel-tosh.svg',
    category: 'Fashion Partner'
  },
  {
    name: 'Gulder',
    logo: '/brands/gulder.svg',
    category: 'Brand Partner'
  },
  {
    name: 'Gordons',
    logo: '/brands/gordons.svg',
    category: 'Brand Partner'
  }
];

export function BrandCarousel() {
  return (
    <section className="relative py-12 sm:py-20 overflow-hidden bg-retro-black/50">
      <div className="absolute inset-0 bg-gradient-to-b from-retro-black via-transparent to-retro-black" />
      
      {/* First Row - Left to Right */}
      <div className="relative mb-4 sm:mb-8">
        <div className="animate-marquee-slow flex gap-4 sm:gap-8">
          {[...brands, ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-48 sm:w-64"
            >
              <RetroCard className="group hover:bg-primary/5 transition-all duration-300">
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="font-display text-sm sm:text-xl font-bold text-white mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-primary line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">{brand.category}</p>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative">
        <div className="animate-marquee-slow-reverse flex gap-4 sm:gap-8">
          {[...brands.reverse(), ...brands].map((brand, index) => (
            <motion.div
              key={`${brand.name}-reverse-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-48 sm:w-64"
            >
              <RetroCard className="group hover:bg-primary/5 transition-all duration-300">
                <div className="p-4 sm:p-6 text-center">
                  <h3 className="font-display text-sm sm:text-xl font-bold text-white mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-primary line-clamp-1">
                    {brand.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400">{brand.category}</p>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-retro-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-retro-black to-transparent pointer-events-none" />
    </section>
  );
} 