import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Tv, Camera } from 'lucide-react';
import { ChapterHeading } from '@/components/ui/typography/ChapterHeading';
import { StatsCard } from '@/components/ui/cards/StatsCard';
import { ImageCard } from '@/components/ui/cards/ImageCard';
import { cn } from '@/lib/utils';

const awards = [
  { value: '15+', label: 'Industry Awards', icon: Trophy },
  { value: '100+', label: 'Media Features', icon: Tv },
  { value: '25+', label: 'Fashion Shows', icon: Camera }
];

export function AwardsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ChapterHeading subtitle="Celebrating Excellence">
          Awards & Recognition
        </ChapterHeading>

        {/* Awards Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ImageCard
            src="/images/awards/award1.jpg"
            alt="Industry Excellence Award"
            aspectRatio="video"
          >
            <h3 className="text-xl font-bold text-white">Industry Excellence</h3>
            <p className="mt-2 text-gray-200">Recognition for outstanding contributions</p>
          </ImageCard>

          <ImageCard
            src="/images/awards/award2.jpg"
            alt="Leadership Recognition Award"
            aspectRatio="video"
          >
            <h3 className="text-xl font-bold text-white">Leadership Recognition</h3>
            <p className="mt-2 text-gray-200">Acknowledged for industry leadership</p>
          </ImageCard>
        </div>
      </div>
    </section>
  );
} 