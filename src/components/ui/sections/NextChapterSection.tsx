import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { ChapterHeading } from '@/components/ui/typography/ChapterHeading';
import { CTACard } from '@/components/ui/interactive/CTACard';
import { ImageCard } from '@/components/ui/cards/ImageCard';
import { cn } from '@/lib/utils';

const nextChapterCTA = {
  title: "Join Us on Our Journey",
  description: "The journey has been amazing, but we're just getting started! We're excited to continue pushing the limits of entertainment and creating unforgettable experiences.",
  buttonText: "Work with Us",
  buttonHref: "#contact",
  Icon: Zap,
  pattern: "sankofa" as const
};

export function NextChapterSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <ChapterHeading subtitle="Looking Forward">
          The Next Chapter
        </ChapterHeading>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <ImageCard
            src="/images/next-chapter/future.jpg"
            alt="Building the Future"
            aspectRatio="video"
          >
            <h3 className="text-xl font-bold text-white">Building the Future</h3>
            <p className="mt-2 text-gray-200">Innovating entertainment experiences</p>
          </ImageCard>

          <ImageCard
            src="/images/next-chapter/memories.jpg"
            alt="Creating Memories"
            aspectRatio="video"
          >
            <h3 className="text-xl font-bold text-white">Creating Memories</h3>
            <p className="mt-2 text-gray-200">Crafting unforgettable moments</p>
          </ImageCard>
        </div>
      </div>
    </section>
  );
} 