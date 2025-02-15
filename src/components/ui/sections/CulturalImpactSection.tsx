import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Lightbulb, Globe } from 'lucide-react';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { ChapterHeading } from '@/components/ui/typography/ChapterHeading';
import { CTACard } from '@/components/ui/interactive/CTACard';
import { ImageCard } from '@/components/ui/cards/ImageCard';
import { cn } from '@/lib/utils';

interface Initiative {
  icon: any;
  title: string;
  description: string;
}

const initiatives: Initiative[] = [
  {
    icon: Heart,
    title: 'Community Outreach',
    description: 'Supporting local talent and creating opportunities for aspiring entertainers through mentorship programs.',
  },
  {
    icon: Users,
    title: 'Youth Development',
    description: 'Empowering the next generation through workshops, training sessions, and hands-on experience.',
  },
  {
    icon: Lightbulb,
    title: 'Cultural Innovation',
    description: 'Blending traditional Nigerian entertainment with modern global trends to create unique experiences.',
  },
  {
    icon: Globe,
    title: 'Global Representation',
    description: 'Showcasing Nigerian culture and talent on international platforms and events.',
  },
];

const culturalImpactCTA = {
  title: "Cultural Heritage",
  description: "As a proud Nigerian entertainer, every performance celebrates the beauty and energy of our culture, bringing it to the world stage.",
  buttonText: "Explore Our Work",
  buttonHref: "#portfolio",
  Icon: Heart,
  pattern: "kente" as const
};

export function CulturalImpactSection() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-black/50 p-8 backdrop-blur-sm">
      <PatternOverlay variant="kente" className="opacity-[0.03]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.05]" />
      
      <div className="relative space-y-12">
        <div className="text-center">
          <ChapterHeading subtitle="Making a Difference">
            Cultural Heritage & Impact
          </ChapterHeading>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            As a proud Nigerian entertainer, I carry our vibrant culture in everything I do.
            My mission extends beyond entertainment – it's about creating lasting impact
            and nurturing the next generation of talent.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={initiative.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <RetroCard
                variant="secondary"
                className="group h-full transition-all duration-500 hover:bg-black/60"
              >
                <div className="flex gap-4">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-black/40">
                    <div className="absolute inset-0 animate-pulse bg-primary/10" />
                    <initiative.icon className="relative h-full w-full p-2.5 text-primary opacity-70 transition-all duration-300 group-hover:opacity-100" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-display text-lg font-bold text-white/90 group-hover:text-white">
                      {initiative.title}
                    </h4>
                    <p className="text-sm text-gray-400 transition-colors group-hover:text-gray-300">
                      {initiative.description}
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <RetroCard
            variant="highlight"
            className="overflow-hidden hover:bg-black/40"
          >
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg md:w-1/3">
                <img
                  src="/assets/impact/community.jpg"
                  alt="Community Impact"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="flex-1 space-y-4">
                <h4 className="font-display text-xl font-bold text-white/90">Building a Legacy</h4>
                <p className="text-gray-300">
                  Beyond the lights and cameras, I'm focused on creating something that lasts.
                  Through the RooBoy Foundation, we're not just entertaining – we're transforming
                  lives and creating opportunities for the next generation of African talent.
                </p>
                <motion.div
                  className="inline-flex items-center gap-2 text-primary/90 transition-colors hover:text-primary"
                  whileHover={{ x: 5 }}
                >
                  Learn more about our initiatives →
                </motion.div>
              </div>
            </div>
          </RetroCard>
        </div>
      </div>
    </div>
  );
} 