import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { HeroSection } from '@/components/ui/sections/HeroSection';
import { PageLoading } from '@/components/ui/feedback/PageLoading';
import { socialLinks } from '@/config/social-links';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const journeyContent = [
  "From hosting small campus events to becoming one of Nigeria's most vibrant entertainment personalities, my journey has been nothing short of incredible. Every step of the way has been fueled by my passion for creating vibes and connecting with people.",
  "I've always believed in bringing that extra energy – that special sauce that turns regular moments into unforgettable memories. Whether I'm on stage or behind the scenes, it's all about creating that magic that keeps the crowd buzzing."
];

const excellenceContent = [
  "They call me the vibe curator, and trust me, it's not just a title – it's a lifestyle! My approach to hosting is all about reading the room and delivering that perfect energy that keeps everyone locked in from start to finish.",
  "From corporate events to street parties, I bring that same authentic energy. It's about creating moments that people will be talking about long after the event is over. That's the RooBoy experience!"
];

const legacyContent = [
  "Beyond the lights and cameras, I'm focused on creating something that lasts. It's about inspiring the next generation to dream bigger and showing them that with passion and dedication, anything is possible.",
  "Through my platform, I'm working to create opportunities and open doors for young talents. Because the real measure of success isn't just what you achieve – it's what you inspire others to become."
];

const showCategories = [
  {
    category: "University Shows",
    shows: [
      { name: "Babcock University", role: "Show Host" },
      { name: "Bowen University", role: "Show Host" },
      { name: "ABUAD", role: "Show Host" },
      { name: "Landmark University", role: "Show Host" },
      { name: "Caleb University", role: "Show Host" }
    ],
    image: "/images/projects/lovethestage.jpg"
  },
  {
    category: "Special Events",
    shows: [
      { name: "Firewood Jollof Festival", role: "Festival Host" },
      { name: "Pulse Fiesta", role: "Event Host" },
      { name: "Sunday At Ilashe", role: "Event Host" },
      { name: "Culture FM - Naija to the World", role: "Show Host" },
      { name: "RETRO RAVE", role: "Event Host" }
    ],
    image: "/images/projects/event.jpg"
  },
  {
    category: "Brand Events",
    shows: [
      { name: "Smirnoff - No Known Address", role: "Event Host" },
      { name: "Gulder Ultimate Search", role: "Official Host" },
      { name: "Gordons Moringa Launch", role: "Brand Host" },
      { name: "MTV Base Cypher", role: "Show Host" },
      { name: "Stanbic IBTC Fest", role: "Festival Host" }
    ],
    image: "/images/projects/rooforsmirnodff.jpg"
  }
];

export default function About(): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-retro-black text-retro-white">
      <HeroSection
        title="WHO IS ROOBOY?"
        subtitle="| STREET CAPTAIN • CULTURE CURATOR • VIBE MASTER |"
        description="Join me on a journey through entertainment, culture, and unforgettable moments."
        backgroundImage="/images/projects/hero-beast.jpg"
        pattern="kente"
        height="full"
        align="left"
        contentWidth="normal"
        withGlitch={true}
        ctaText="BOOK ME NOW"
        ctaLink="/contact"
      />

      {/* Introduction Cards */}
      <SectionContainer pattern="grid" className="relative -mt-20 z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RetroCard
              variant="highlight"
              className="md:col-span-2 backdrop-blur-md border-primary/20 hover:border-primary/40"
            >
              <div className="relative p-6 sm:p-8">
                <PatternOverlay variant="dots" className="opacity-[0.03]" />
                <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">The Street Captain's Story</h2>
                <p className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg">
                  {journeyContent[0]}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6 text-base sm:text-lg">
                  {excellenceContent[0]}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-primary">
                  <span>Master of Ceremonies</span>
                  <span>•</span>
                  <span>Culture Curator</span>
                  <span>•</span>
                  <span>Vibe Creator</span>
                </div>
              </div>
            </RetroCard>

            <RetroCard
              variant="secondary"
              className="backdrop-blur-md overflow-hidden group"
            >
              <div className="relative h-full min-h-[500px] sm:min-h-[600px]">
                <img
                  src="/images/projects/eventkiller.jpg"
                  alt="Stage Presence"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">The Energy Master</h3>
                  <p className="text-gray-300 text-base sm:text-lg max-w-prose">
                    Known for bringing unmatched energy and creating electric atmospheres that keep crowds engaged from start to finish.
                  </p>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </SectionContainer>

      {/* Signature Moments */}
      <SectionContainer pattern="kente" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Signature Moments</h2>
                <p className="text-gray-300 text-lg sm:text-xl">{journeyContent[1]}</p>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: 'Events Mastered', image: '/images/projects/event.jpg', description: 'Creating unforgettable experiences' },
                  { value: '50+', label: 'Brand Partnerships', image: '/images/projects/rooforsmirnodff.jpg', description: 'Building lasting connections' },
                  { value: '30+', label: 'University Shows', image: '/images/projects/lovethestage.jpg', description: 'Inspiring young minds' },
                  { value: '20+', label: 'Awards & Recognition', image: '/images/projects/Recognition.jpg', description: 'Excellence in entertainment' }
                ].map((stat, index) => (
                  <RetroCard
                    key={stat.label}
                    variant="secondary"
                    className="group text-center p-6 backdrop-blur-sm overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                        <img src={stat.image} alt={stat.label} className="w-full h-full object-cover" />
                      </div>
                      <div className="relative z-10">
                        <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                        <div className="text-base sm:text-lg text-gray-300 mb-2">{stat.label}</div>
                        <div className="text-sm text-gray-400">{stat.description}</div>
                      </div>
                    </motion.div>
                  </RetroCard>
                ))}
              </div>
            </div>

            <RetroCard variant="highlight" className="overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <img
                  src="/images/projects/smirnoffcallings.jpg"
                  alt="Brand Impact"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Brand Impact</h3>
                  <p className="text-gray-300 text-sm">
                    Transforming brand activations into memorable cultural moments that resonate with audiences.
                  </p>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      </SectionContainer>

      {/* Cultural Impact */}
      <SectionContainer pattern="grid" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Cultural Impact</h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto">{excellenceContent[1]}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Brand Activations",
                role: "Premium Host",
                image: "/images/projects/madesmirnoffamoment.jpg",
                description: "Elevating brand experiences through authentic connections"
              },
              {
                name: "Fashion & Style",
                role: "Style Icon",
                image: "/images/projects/fashionkiller.jpg",
                description: "Setting trends and influencing fashion narratives"
              },
              {
                name: "Entertainment",
                role: "Vibe Creator",
                image: "/images/projects/energy.jpg",
                description: "Creating electric atmospheres that define moments"
              }
            ].map((item, index) => (
              <RetroCard
                key={item.name}
                variant="secondary"
                className="group backdrop-blur-sm overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-[4/3]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  <div className="relative h-full p-6 flex flex-col justify-end">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">{item.role}</p>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </motion.div>
              </RetroCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Legacy Section */}
      <SectionContainer pattern="kente" className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RetroCard variant="highlight" className="overflow-hidden group">
              <div className="relative aspect-[4/3]">
                <img
                  src="/images/philantrophy/rooboy foundation3.jpg"
                  alt="Community Impact"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Building Legacy</h3>
                  <p className="text-gray-300 text-base sm:text-lg">
                    {legacyContent[0]}
                  </p>
                </div>
              </div>
            </RetroCard>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4">Youth Empowerment</h2>
                <p className="text-gray-300 text-lg sm:text-xl mb-6">{legacyContent[1]}</p>
              </motion.div>

              <div className="grid gap-4">
                {[
                  { name: "Campus Mentorship", role: "Youth Development", image: "/images/philantrophy/Philantophy.jpg" },
                  { name: "Industry Workshops", role: "Skills Development", image: "/images/philantrophy/rooboy foundation 2.jpg" },
                  { name: "Community Outreach", role: "Social Impact", image: "/images/philantrophy/Rooboy foundation.jpg" }
                ].map((program, index) => (
                  <RetroCard
                    key={program.name}
                    variant="secondary"
                    className="group backdrop-blur-sm overflow-hidden"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 flex items-center gap-4"
                    >
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                        <img src={program.image} alt={program.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-primary transition-colors">
                          {program.name}
                        </h3>
                        <p className="text-sm text-gray-400">{program.role}</p>
                      </div>
                    </motion.div>
                  </RetroCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Shows & Events Section */}
      <SectionContainer pattern="kente" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-primary mb-4">Shows & Events</h2>
            <p className="text-gray-300 text-lg">Creating unforgettable moments across different platforms</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {showCategories.map((category, index) => (
              <RetroCard
                key={category.category}
                variant={index === 0 ? "highlight" : "secondary"}
                className="group backdrop-blur-sm"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={category.image}
                      alt={category.category}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold text-white">{category.category}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {category.shows.map((show) => (
                      <div key={show.name} className="flex justify-between items-center group/item">
                        <div>
                          <h4 className="font-bold text-white group-hover/item:text-primary transition-colors">
                            {show.name}
                          </h4>
                          <p className="text-sm text-gray-400">{show.role}</p>
                        </div>
                        <motion.div
                          className="text-primary opacity-0 group-hover/item:opacity-100 transition-opacity"
                          whileHover={{ x: 5 }}
                        >
                          →
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </RetroCard>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* Contact Section */}
      <SectionContainer pattern="grid" patternOpacity="opacity-[0.02]">
        <RetroCard 
          variant="highlight" 
          className="mx-auto max-w-5xl transform hover:scale-[1.01] transition-transform duration-300"
        >
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 p-6 sm:p-8">
            {[
              { 
                icon: Mail, 
                title: 'General Inquiries', 
                content: 'info.rooboy@gmail.com', 
                href: 'mailto:info.rooboy@gmail.com',
                description: 'For general questions and collaborations'
              },
              { 
                icon: Mail, 
                title: 'Booking & Events', 
                content: 'book@rooboy.live', 
                href: 'mailto:book@rooboy.live',
                description: 'For event bookings and professional engagements'
              },
              { 
                icon: Phone, 
                title: 'Phone', 
                content: '07086968897', 
                href: 'tel:+2347086968897',
                description: 'Available during business hours'
              },
              { 
                icon: MapPin, 
                title: 'Location', 
                content: 'Lagos, Nigeria', 
                description: 'Available for worldwide bookings'
              }
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  style: { backgroundColor: 'rgba(45, 0, 247, 0.1)' }
                }}
                className="group"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="icon-wrapper">
                    {React.createElement(item.icon, {
                      size: 24,
                      className: "text-primary"
                    })}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold mb-0.5">{item.title}</h3>
                    {item.href ? (
                      <a 
                        href={item.href} 
                        className="font-mono text-xs text-gray-300 hover:text-primary transition-colors duration-300"
                        target={item.title === 'Bookings' ? '_blank' : undefined}
                        rel={item.title === 'Bookings' ? 'noopener noreferrer' : undefined}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="font-mono text-xs text-gray-300">{item.content}</p>
                    )}
                    {item.description && (
                      <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="mt-6 border-t border-primary/10 pt-6 px-6">
            <div className="flex justify-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-700 bg-black/30 p-2 text-gray-300 transition-colors duration-300 hover:border-primary hover:text-primary"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.platform}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">
              © {new Date().getFullYear()} RooBoy. All rights reserved.
            </p>
          </div>
        </RetroCard>
      </SectionContainer>
    </div>
  );
} 