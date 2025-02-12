import React from 'react';
import { Zap } from 'lucide-react';
import { ChapterHeading } from './ChapterHeading';
import { CTACard } from './CTACard';
import { ImageCard } from './ImageCard';

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
    <section className="relative py-20" id="next-chapter">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#2D00F710_0%,transparent_60%)]" />
      <div className="container mx-auto px-4">
        <ChapterHeading
          title="The Next Chapter"
          subtitle="FUTURE VISION"
          pattern="gye-nyame"
          variant="gradient"
          LeftIcon={Zap}
          RightIcon={Zap}
        />
        <div className="grid gap-8 md:grid-cols-2">
          <CTACard {...nextChapterCTA} />
          <div className="space-y-8">
            <ImageCard
              src="/images/projects/RooKingdom.jpg"
              alt="Future Vision"
              title="Building the Future"
              subtitle="Creating new possibilities"
              aspectRatio="video"
            />
            <ImageCard
              src="/images/projects/Sharingmonemnts.jpg"
              alt="Shared Moments"
              title="Creating Memories"
              subtitle="Every moment counts"
              aspectRatio="video"
            />
          </div>
        </div>
      </div>
    </section>
  );
} 