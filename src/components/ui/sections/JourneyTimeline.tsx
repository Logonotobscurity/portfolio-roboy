import { motion } from 'framer-motion';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { Star, Award, Trophy, Globe, Users } from 'lucide-react';

interface TimelineEvent {
  title: string;
  description: string;
  icon: any;
  achievements: string[];
  highlight?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    title: 'The RooBoy Xperience',
    description: 'From campus sensation to nationwide phenomenon, pioneering a unique style of entertainment.',
    icon: Star,
    highlight: 'Campus Events',
    achievements: [
      'Signature hosting style development',
      'Built entertainment network',
      'University tour success'
    ]
  },
  {
    title: 'Breaking Through',
    description: 'Major brand collaborations and TV appearances marking the rise of the RooBoy brand.',
    icon: Award,
    highlight: 'Brand Partnerships',
    achievements: [
      'AMC The Hangout TV debut',
      'Smirnoff brand ambassador',
      'MTV Base collaborations'
    ]
  },
  {
    title: 'Festival King',
    description: 'Headlining major festivals and corporate events across Nigeria.',
    icon: Trophy,
    highlight: 'Major Events',
    achievements: [
      'Gidi Culture Festival',
      'Pulse Fiesta',
      'Retro Rave series'
    ]
  },
  {
    title: 'Cultural Impact',
    description: 'Establishing the RooBoy Foundation and expanding community influence.',
    icon: Users,
    highlight: 'Community',
    achievements: [
      'Youth mentorship program',
      'Entertainment workshops',
      'Community outreach'
    ]
  },
  {
    title: 'Global Stage',
    description: 'Taking Nigerian entertainment culture to international platforms.',
    icon: Globe,
    highlight: 'International',
    achievements: [
      'Global brand partnerships',
      'Cross-border events',
      'Digital content expansion'
    ]
  }
];

export function JourneyTimeline() {
  return (
    <div className="relative space-y-8 sm:space-y-12">
      <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-primary/50" />
      
      {timelineEvents.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative flex flex-col ${
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          } items-start md:items-center gap-4 sm:gap-8`}
        >
          <div className="flex-1 pl-8 md:pl-0">
            <RetroCard variant="dark" className="group relative">
              <div className="absolute -left-8 top-4 md:top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary md:left-auto md:right-0 md:translate-x-1/2">
                <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-primary/30" />
              </div>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="relative">
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-lg">
                    <div className="absolute inset-0 animate-pulse bg-primary/20" />
                    <event.icon className="relative h-full w-full p-2 sm:p-2.5 text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  {event.highlight && (
                    <div className="mt-1 sm:mt-2 text-center font-mono text-xs text-primary">
                      {event.highlight}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 font-display text-lg sm:text-xl font-bold">{event.title}</h3>
                  <p className="mb-4 text-sm sm:text-base text-gray-300">{event.description}</p>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                    {event.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary/50" />
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </RetroCard>
          </div>
          <div className="hidden w-1/2 md:block" />
        </motion.div>
      ))}
    </div>
  );
} 