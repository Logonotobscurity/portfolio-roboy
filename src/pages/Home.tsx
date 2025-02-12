import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mic, Music, Sparkles, Users } from 'lucide-react';
import { VideoHero } from '../components/VideoHero';
import { RetroCard } from '../components/RetroCard';
import { BrandCarousel } from '../components/BrandCarousel';
import { PatternOverlay } from '../components/PatternOverlay';
import { JourneyTimeline } from '../components/JourneyTimeline';
import { Testimonials } from '../components/Testimonials';
import { SocialMediaSection } from '../components/SocialMediaSection';
import { Footer } from '../components/Footer';

const services = [
  {
    icon: Mic,
    title: 'Event Hosting',
    description: 'Dynamic event hosting that brings energy and excitement to any occasion.',
  },
  {
    icon: Music,
    title: 'Brand Activation',
    description: 'Creative brand activations that connect with your target audience.',
  },
  {
    icon: Users,
    title: 'MC Services',
    description: 'Professional MC services for corporate events, weddings, and social gatherings.',
  },
  {
    icon: Sparkles,
    title: 'Entertainment',
    description: 'Full-spectrum entertainment solutions for unforgettable experiences.',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-retro-black text-retro-white">
      <VideoHero
        title="ROOBOY: THE STREET CAPTAIN"
        subtitle="| MASTER OF VIBES AND MOMENTS |"
        description="Where culture meets energy, and moments become memories."
        videoUrl="/videos/hero-intro.mp4"
        fallbackImageUrl="/assets/brand/base.jpg"
      />

      {/* About Section */}
      <section className="relative py-20">
        <PatternOverlay variant="kente" className="opacity-20" />
        <div className="container mx-auto px-4">
          <RetroCard variant="highlight" className="mx-auto max-w-6xl overflow-hidden">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="w-full md:w-1/3">
                <motion.div
                  className="group relative aspect-square overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src="/assets/brand/base.jpg"
                    alt="RooBoy"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <PatternOverlay variant="kente" className="opacity-30 transition-opacity duration-300 group-hover:opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              </div>
              <div className="w-full md:w-2/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="mb-4 font-display text-3xl font-bold">About RooBoy</h2>
                  <p className="text-lg leading-relaxed text-gray-300">
                    I'm RooBoy, straight out of the vibrant streets of Lagos, Nigeria, where culture and energy collide.
                    With years of experience in entertainment and event hosting, I've mastered the art of creating
                    unforgettable moments that resonate with audiences across Africa.
                  </p>
                  <motion.div
                    className="mt-8 inline-block"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link
                      to="/about"
                      className="group flex items-center gap-2 font-mono text-primary transition-colors duration-300 hover:text-primary-light"
                    >
                      <span>Learn more about my journey</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </RetroCard>
        </div>
      </section>

      {/* Building a Legacy Section */}
      <section className="relative py-20 overflow-hidden">
        <PatternOverlay variant="kente" className="opacity-20" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Building a Legacy
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Impact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative"
            >
              <RetroCard className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <motion.img
                    src="/images/projects/Rooboy foundation.jpg"
                    alt="Community Impact"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-0">
                      Community Impact
                    </h3>
                    <p className="mt-2 text-gray-200 transform transition-all duration-300 opacity-0 group-hover:opacity-100">
                      Empowering the next generation through mentorship and support
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>

            {/* Youth Empowerment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative"
            >
              <RetroCard className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <motion.img
                    src="/images/projects/rooboy foundation3.jpg"
                    alt="Youth Empowerment"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-0">
                      Youth Empowerment
                    </h3>
                    <p className="mt-2 text-gray-200 transform transition-all duration-300 opacity-0 group-hover:opacity-100">
                      Creating opportunities for young talents to shine
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>

            {/* Philanthropy Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative"
            >
              <RetroCard className="h-full overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <motion.img
                    src="/images/projects/Philantophy.jpg"
                    alt="Philanthropy"
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="font-display text-2xl font-bold text-white mb-3 transform transition-transform duration-300 group-hover:translate-y-0">
                      Philanthropy
                    </h3>
                    <p className="mt-2 text-gray-200 transform transition-all duration-300 opacity-0 group-hover:opacity-100">
                      Giving back to society through meaningful initiatives
                    </p>
                  </div>
                </div>
              </RetroCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cultural Heritage & Impact Section */}
      <section className="relative py-20 overflow-hidden">
        <PatternOverlay variant="kente" className="opacity-10" />
        <div className="container mx-auto px-4">
          <motion.div
            className="mx-auto max-w-6xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <div className="mb-12 text-center">
              <motion.h2
                className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Cultural Heritage & Impact
              </motion.h2>
              <motion.p
                className="text-lg text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                As a proud Nigerian entertainer, I carry our vibrant culture in everything I do. My mission extends beyond entertainment – it's about creating lasting impact and nurturing the next generation of talent.
              </motion.p>
            </div>

            {/* Main Grid */}
            <div className="grid gap-8 lg:grid-cols-2 mb-12">
              {/* Left Column - Cultural Innovation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid gap-8"
              >
                <RetroCard className="group h-full overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <motion.img
                      src="/images/projects/cultralswag.jpg"
                      alt="Cultural Innovation"
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-4 font-display text-2xl font-bold text-white">Cultural Innovation</h3>
                    <p className="text-lg text-gray-300">
                      Blending traditional Nigerian entertainment with modern global trends to create unique experiences that resonate across borders.
                    </p>
                  </div>
                </RetroCard>

                <div className="grid grid-cols-2 gap-8">
                  <RetroCard className="group overflow-hidden">
                    <div className="p-6">
                      <h4 className="font-display text-xl font-bold mb-3">Community Outreach</h4>
                      <p className="text-gray-300">Supporting local talent through mentorship programs.</p>
                    </div>
                  </RetroCard>
                  <RetroCard className="group overflow-hidden">
                    <div className="p-6">
                      <h4 className="font-display text-xl font-bold mb-3">Youth Development</h4>
                      <p className="text-gray-300">Empowering the next generation through workshops and training.</p>
                    </div>
                  </RetroCard>
                </div>
              </motion.div>

              {/* Right Column - Global Impact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid gap-8"
              >
                <RetroCard className="group h-full overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <motion.img
                      src="/images/projects/Recognition.jpg"
                      alt="Global Impact"
                      className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
                  </div>
                  <div className="p-8">
                    <h3 className="mb-4 font-display text-2xl font-bold text-white">Global Representation</h3>
                    <p className="text-lg text-gray-300">
                      Showcasing Nigerian culture and talent on international platforms, bridging cultures through entertainment.
                    </p>
                  </div>
                </RetroCard>

                <RetroCard className="group overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
                  <div className="p-8">
                    <h3 className="mb-4 font-display text-2xl font-bold text-white">Building a Legacy</h3>
                    <p className="text-lg text-gray-300 mb-6">
                      Beyond the lights and cameras, I'm focused on creating something that lasts. Through the RooBoy Foundation, we're not just entertaining – we're transforming lives.
                    </p>
                    <motion.div
                      className="inline-block"
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        to="/impact"
                        className="group flex items-center gap-2 font-mono text-primary transition-colors duration-300 hover:text-primary-light"
                      >
                        <span>Learn more about our initiatives</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </motion.div>
                  </div>
                </RetroCard>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 overflow-hidden">
        <PatternOverlay variant="grid" className="opacity-15" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center font-display text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Services
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <RetroCard className="group h-full transition-transform duration-300 hover:scale-105">
                  <div className="flex flex-col items-center p-6 text-center">
                    <div className="mb-6 rounded-full bg-primary/10 p-4 transition-all duration-300 group-hover:bg-primary/20">
                      <service.icon className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-bold transition-colors duration-300 group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 transition-colors duration-300 group-hover:text-gray-100">
                      {service.description}
                    </p>
                    <div className="mt-4 h-1 w-12 bg-primary/30 transition-all duration-300 group-hover:w-24 group-hover:bg-primary" />
                  </div>
                </RetroCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative py-20 overflow-hidden">
        <PatternOverlay variant="grid" className="opacity-10" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-light to-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The RooBoy Xperience
          </motion.h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <JourneyTimeline />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20">
        <PatternOverlay variant="grid" className="opacity-10" />
        <div className="container mx-auto px-4">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What People Say
          </motion.h2>
          <Testimonials />
        </div>
      </section>

      {/* Social Media Section */}
      <SocialMediaSection />

      {/* Brand Carousel */}
      <BrandCarousel />

      {/* Footer */}
      <Footer />
    </div>
  );
}