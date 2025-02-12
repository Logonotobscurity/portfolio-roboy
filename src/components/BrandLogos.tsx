import { motion } from 'framer-motion';
import { RetroCard } from './RetroCard';

interface Brand {
  name: string;
  description: string;
}

const brands: Brand[] = [
  {
    name: 'Smirnoff',
    description: 'Global beverage brand collaborations',
  },
  {
    name: 'Lagos Fashion Week',
    description: 'Premier fashion event hosting',
  },
  {
    name: 'MTV Base',
    description: 'Entertainment industry partnerships',
  },
  {
    name: 'Corporate Events',
    description: 'Leading corporate event hosting',
  },
];

export function BrandLogos() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          className="mb-12 text-center font-display text-3xl font-bold text-retro-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Trusted by Leading Brands
        </motion.h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <RetroCard
                variant="dark"
                className="group h-full"
                hover={true}
              >
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="relative mb-4 h-16 w-16">
                    <div className="h-full w-full rounded-full bg-primary/10 p-4">
                      <div className="h-full w-full animate-pulse rounded-full bg-primary/20" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-display text-lg font-medium text-retro-white">
                    {brand.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {brand.description}
                  </p>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 