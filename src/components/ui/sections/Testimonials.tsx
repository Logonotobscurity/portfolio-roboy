import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { RetroCard } from '@/components/ui/interactive/RetroCard';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "RooBoy is the life of every event. He doesn't just host; he creates magic!",
    author: "Event Organizer",
    role: "Major Festival",
    company: "Gidi Culture Festival"
  },
  {
    quote: "The RooBoy Xperience was nothing short of phenomenal.",
    author: "Brand Manager",
    role: "Brand Partner",
    company: "Smirnoff Nigeria"
  },
  {
    quote: "His energy is contagious! RooBoy brought our event to life.",
    author: "Marketing Director",
    role: "Corporate Client",
    company: "Stanbic IBTC"
  },
  {
    quote: "The perfect blend of professionalism and entertainment.",
    author: "Creative Director",
    role: "Fashion Show",
    company: "Gabriel Tosh Luxury"
  },
  {
    quote: "RooBoy's presence elevated our brand activation to new heights.",
    author: "Events Lead",
    role: "Brand Activation",
    company: "Pulse.ng"
  },
  {
    quote: "A true master of ceremonies who understands the audience.",
    author: "Production Manager",
    role: "TV Production",
    company: "MTV Base"
  }
];

export function Testimonials() {
  return (
    <div className="relative">
      {/* First Row - Left to Right */}
      <div className="relative mb-4 sm:mb-8 overflow-hidden">
        <div className="animate-marquee-slow flex gap-4 sm:gap-8">
          {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.author}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-[280px] sm:w-[400px]"
            >
              <RetroCard className="group h-full hover:shadow-[0_0_15px_rgba(45,0,247,0.2)]">
                <div className="flex h-full flex-col gap-3 sm:gap-4 p-4 sm:p-6">
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-sm sm:text-lg italic text-gray-300 transition-colors duration-300 group-hover:text-white line-clamp-4 sm:line-clamp-none">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-primary/10">
                    <div className="font-display text-base sm:text-lg font-bold text-white">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-primary">{testimonial.role}</div>
                    {testimonial.company && (
                      <div className="text-xs sm:text-sm text-gray-400">{testimonial.company}</div>
                    )}
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Second Row - Right to Left */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee-slow-reverse flex gap-4 sm:gap-8">
          {[...testimonials.slice(3), ...testimonials.slice(3)].map((testimonial, index) => (
            <motion.div
              key={`${testimonial.author}-reverse-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="shrink-0 w-[280px] sm:w-[400px]"
            >
              <RetroCard className="group h-full hover:shadow-[0_0_15px_rgba(45,0,247,0.2)]">
                <div className="flex h-full flex-col gap-3 sm:gap-4 p-4 sm:p-6">
                  <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                  <p className="text-sm sm:text-lg italic text-gray-300 transition-colors duration-300 group-hover:text-white line-clamp-4 sm:line-clamp-none">
                    {testimonial.quote}
                  </p>
                  <div className="mt-auto pt-3 sm:pt-4 border-t border-primary/10">
                    <div className="font-display text-base sm:text-lg font-bold text-white">{testimonial.author}</div>
                    <div className="text-xs sm:text-sm text-primary">{testimonial.role}</div>
                    {testimonial.company && (
                      <div className="text-xs sm:text-sm text-gray-400">{testimonial.company}</div>
                    )}
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-retro-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-retro-black to-transparent pointer-events-none" />
    </div>
  );
} 