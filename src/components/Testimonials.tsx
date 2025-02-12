import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { RetroCard } from './RetroCard';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "RooBoy is the life of every event. He doesn't just host; he creates magic!",
    author: "Event Organizer",
    role: "Major Festival",
    company: "Gidi Culture Festival",
    avatarUrl: "/assets/testimonials/organizer.jpg"
  },
  {
    quote: "The RooBoy Xperience was nothing short of phenomenal.",
    author: "Brand Manager",
    role: "Brand Partner",
    company: "Smirnoff Nigeria",
    avatarUrl: "/assets/testimonials/smirnoff.jpg"
  },
  {
    quote: "His energy is contagious! RooBoy brought our event to life.",
    author: "Marketing Director",
    role: "Corporate Client",
    company: "Stanbic IBTC",
    avatarUrl: "/assets/testimonials/stanbic.jpg"
  },
  {
    quote: "The perfect blend of professionalism and entertainment.",
    author: "Creative Director",
    role: "Fashion Show",
    company: "Gabriel Tosh Luxury",
    avatarUrl: "/assets/testimonials/gabriel.jpg"
  },
  {
    quote: "RooBoy's presence elevated our brand activation to new heights.",
    author: "Events Lead",
    role: "Brand Activation",
    company: "Pulse.ng",
    avatarUrl: "/assets/testimonials/pulse.jpg"
  },
  {
    quote: "A true master of ceremonies who understands the audience.",
    author: "Production Manager",
    role: "TV Production",
    company: "MTV Base",
    avatarUrl: "/assets/testimonials/mtv.jpg"
  }
];

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <RetroCard className="group h-full hover:shadow-[0_0_15px_rgba(45,0,247,0.2)]">
            <div className="flex h-full flex-col gap-4">
              <Quote className="h-8 w-8 text-primary opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="text-lg italic text-gray-300 transition-colors duration-300 group-hover:text-white">
                {testimonial.quote}
              </p>
              <div className="mt-auto flex items-center gap-4">
                {testimonial.avatarUrl && (
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <div className="absolute inset-0 animate-pulse bg-primary/20" />
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.author}
                      className="relative h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-display font-bold">{testimonial.author}</div>
                  <div className="text-sm text-primary">{testimonial.role}</div>
                  {testimonial.company && (
                    <div className="text-sm text-gray-400">{testimonial.company}</div>
                  )}
                </div>
              </div>
            </div>
          </RetroCard>
        </motion.div>
      ))}
    </div>
  );
} 