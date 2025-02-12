import React from 'react';
import { Trophy, Tv, Camera } from 'lucide-react';
import { ChapterHeading } from './ChapterHeading';
import { StatsCard } from './StatsCard';
import { ImageCard } from './ImageCard';

const awards = [
  { value: '15+', label: 'Industry Awards', icon: Trophy },
  { value: '100+', label: 'Media Features', icon: Tv },
  { value: '25+', label: 'Fashion Shows', icon: Camera }
];

export function AwardsSection() {
  return (
    <section className="relative py-20" id="awards">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#2D00F710_0%,transparent_65%)]" />
      <div className="container mx-auto px-4">
        <ChapterHeading
          title="Awards & Recognition"
          subtitle="INDUSTRY EXCELLENCE"
          pattern="adinkra"
          variant="gradient"
          LeftIcon={Trophy}
          RightIcon={Trophy}
        />
        <StatsCard
          title="Industry Recognition"
          subtitle="Our work is celebrated through various accolades, highlighting our influence in the media and entertainment spaces."
          stats={awards}
          className="mb-12"
        />
        <div className="grid gap-8 md:grid-cols-2">
          <ImageCard
            src="/images/projects/Award.jpg"
            alt="Award Ceremony"
            title="Industry Excellence"
            subtitle="Celebrating achievements in entertainment"
            aspectRatio="video"
          />
          <ImageCard
            src="/images/projects/Award Speech .jpg"
            alt="Award Speech"
            title="Leadership Recognition"
            subtitle="Setting industry standards"
            aspectRatio="video"
          />
        </div>
      </div>
    </section>
  );
} 