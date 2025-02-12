import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogImage,
} from './Dialog';

const portfolioItems = [
  {
    title: "Event Hosting",
    description: "Creating unforgettable moments and electric atmospheres",
    image: "/images/projects/momentsonstage.jpg",
    details: "Specializing in high-energy event hosting that keeps the crowd engaged and entertained throughout the experience.",
    bookingUrl: "https://book.rooboy.live/event-hosting"
  },
  {
    title: "Brand Activations",
    description: "Bringing brands to life through authentic connections",
    image: "/images/projects/rooboy foundation3.jpg",
    details: "Strategic brand activations that create meaningful connections between brands and their target audience.",
    bookingUrl: "https://book.rooboy.live/brand-activations"
  },
  {
    title: "Community Impact",
    description: "Making a difference in lives through entertainment",
    image: "/images/projects/Philantophy.jpg",
    details: "Using entertainment as a platform to create positive change and inspire the next generation.",
    bookingUrl: "https://book.rooboy.live/community-events"
  }
];

export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
          <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display">
            Portfolio
            </h2>
          <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
          </div>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Showcasing moments that define the RooBoy experience
        </p>
        </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioItems.map((item, index) => (
          <Dialog key={item.title}>
            <DialogTrigger>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <DialogImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <DialogTitle className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </DialogTitle>
                    <p className="text-gray-300 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </DialogTrigger>

            <DialogContainer>
              <DialogContent className="bg-black/95 text-white rounded-xl overflow-hidden max-w-4xl w-[95vw] relative">
                <DialogClose className="absolute right-4 top-4 z-10" />
                <div className="grid md:grid-cols-2 gap-8">
                  <DialogImage
                    src={item.image}
                    alt={item.title}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <div className="p-6">
                    <DialogTitle className="text-2xl font-bold mb-4">
                      {item.title}
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 space-y-4">
                      <p>{item.description}</p>
                      <p>{item.details}</p>
                      <div className="mt-6">
                        <a
                          href={item.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border-2 border-primary bg-black/50 px-8 py-3 font-mono text-sm text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(45,0,247,0.5)]"
                        >
                          Book Now
                        </a>
                      </div>
                    </DialogDescription>
                  </div>
        </div>
              </DialogContent>
            </DialogContainer>
          </Dialog>
        ))}
      </div>
    </div>
  );
} 