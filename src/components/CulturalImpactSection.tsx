import React from 'react';
import { Heart } from 'lucide-react';
import { ChapterHeading } from './ChapterHeading';
import { CTACard } from './CTACard';
import { ImageCard } from './ImageCard';

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
    <section className="relative py-20" id="cultural-impact">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2D00F710_0%,transparent_70%)]" />
      <div className="container mx-auto px-4">
        <ChapterHeading
          title="Cultural Impact"
          subtitle="CELEBRATING OUR HERITAGE"
          pattern="kente"
          variant="gradient"
        />
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <CTACard {...culturalImpactCTA} />
          <ImageCard
            src="/images/projects/cultralswag.jpg"
            alt="Cultural Representation"
            title="Nigerian Pride"
            subtitle="Representing our culture with style"
            aspectRatio="portrait"
          />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <ImageCard
            src="/images/projects/fashionspeaks.jpg"
            alt="Fashion Statement"
            title="Fashion & Culture"
            aspectRatio="video"
          />
          <ImageCard
            src="/images/projects/Momentswithclebrity .jpg"
            alt="Celebrity Moments"
            title="Industry Influence"
            aspectRatio="video"
          />
          <ImageCard
            src="/images/projects/energy.jpg"
            alt="Stage Energy"
            title="Vibrant Performance"
            aspectRatio="video"
          />
        </div>
      </div>
    </section>
  );
} 