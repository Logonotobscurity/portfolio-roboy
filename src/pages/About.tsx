/// <reference types="react" />

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Globe, 
  Sparkles, Mic, ChevronDown, Instagram, Twitter, Linkedin, Facebook
} from 'lucide-react';
import { RetroCard } from '../components/RetroCard';
import { PatternOverlay } from '../components/PatternOverlay';
import { GlitchText } from '../components/GlitchText';
import { FashionStyleSection } from '../components/FashionStyleSection';
import { useRef } from 'react';
import { TimelineContent } from '../components/TimelineContent';
import { Marquee } from '../components/Marquee';
import { useNavigate } from 'react-router-dom';

const specialEvents = [
  { name: "Firewood Jollof Festival", role: "Festival Host" },
  { name: "Pulse Fiesta", role: "Event Host" },
  { name: "Sunday At Ilashe", role: "Event Host" },
  { name: "Culture FM - Naija to the World", role: "Show Host" },
  { name: "RETRO RAVE", role: "Event Host" }
];

const stats = [
  { label: 'Smirnoff X1 Tour', icon: Sparkles },
  { label: 'Gulder Ultimate Search', icon: Sparkles },
  { label: 'Gordons Moringa', icon: Sparkles },
  { label: 'MTV Base Cypher', icon: Mic },
  { label: 'Pulse Fiesta', icon: Mic },
  { label: 'Firewood Jollof Festival', icon: Sparkles },
  { label: 'Culture FM', icon: Mic },
  { label: 'Stanbic IBTC Fest', icon: Sparkles },
  { label: 'RETRO RAVE', icon: Mic },
  { label: 'Sunday At Ilashe', icon: Mic }
];

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

const nextChapterContent = [
  "The journey's been amazing, but trust me, we're just getting started! I'm constantly pushing to create new experiences and take entertainment to places it's never been before.",
  "Stay tuned as we continue to push boundaries and create magic. The future is bright, and I'm excited to have you all along for the ride!"
];

const legacyContent = [
  "Beyond the lights and cameras, I'm focused on creating something that lasts. It's about inspiring the next generation to dream bigger and showing them that with passion and dedication, anything is possible.",
  "Through my platform, I'm working to create opportunities and open doors for young talents. Because the real measure of success isn't just what you achieve – it's what you inspire others to become."
];


const brandCollaborations = [
  { name: "Gulder", role: "Brand Host" },
  { name: "Gordons", role: "Brand Host" },
  { name: "Smirnoff - No Known Address", role: "Event Host" },
  { name: "Stanbic IBTC Fest", role: "Festival Host" },
  { name: "MTV Base Cypher", role: "Show Host" }
];

const universityShows = [
  { name: "Babcock University", role: "Show Host" },
  { name: "Bowen University", role: "Show Host" },
  { name: "ABUAD", role: "Show Host" },
  { name: "Landmark University", role: "Show Host" },
  { name: "Caleb University", role: "Show Host" }
];

export default function About() {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-retro-black text-retro-white">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="/images/projects/hero-beast.jpg"
            alt="RooBoy Hero"
            className="w-full h-full object-cover opacity-50"
            loading="eager"
          />
          <PatternOverlay variant="grid" className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-retro-black/90 via-retro-black/50 to-retro-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-8 md:mb-12"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                <GlitchText text="Who is RooBoy?" />
              </h1>
              <motion.p 
                className="text-lg sm:text-xl text-gray-300 mt-6 px-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Street Captain | Culture Curator | Vibe Master
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4 px-4"
            >
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto inline-block rounded-full border-2 border-primary bg-black/50 px-12 py-4 font-mono text-lg text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(45,0,247,0.5)]"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="icon-wrapper">
              <ChevronDown />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-8 sm:py-12 overflow-hidden" ref={scrollRef}>
        <PatternOverlay variant="kente" className="opacity-10" />
        <div className="w-full overflow-hidden">
          <div className="flex flex-col gap-8">
            <Marquee className="py-4" speed={20} reverse={false} pauseOnHover={false}>
              {[...stats, ...stats].map((stat, index) => (
                <motion.div
                  key={`${stat.label}-${index}-left`}
                  className="mx-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RetroCard className="w-56 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center p-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="bg-primary/10 p-3 rounded-full mb-3"
                      >
                        <div className="icon-wrapper">
                          {stat.icon}
                        </div>
                      </motion.div>
                      <h3 className="font-display text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-white">
                        {stat.label}
                      </h3>
                    </div>
                  </RetroCard>
                </motion.div>
              ))}
            </Marquee>

            <Marquee className="py-4" speed={25} reverse={true} pauseOnHover={false}>
              {[...stats, ...stats].slice().reverse().map((stat, index) => (
                <motion.div
                  key={`${stat.label}-${index}-right`}
                  className="mx-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RetroCard className="w-56 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col items-center text-center p-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        className="bg-primary/10 p-3 rounded-full mb-3"
                      >
                        <div className="icon-wrapper">
                          {stat.icon}
                        </div>
                      </motion.div>
                      <h3 className="font-display text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-white">
                        {stat.label}
                      </h3>
                    </div>
                  </RetroCard>
                </motion.div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Enhanced Story Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <PatternOverlay variant="grid" className="opacity-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display">
                My Story
              </h2>
              <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
            </div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              A journey of passion, creativity, and endless possibilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <TimelineContent animationNum={0} className="flex flex-col gap-6">
              <div className="relative">
                <motion.div
                  className="aspect-[4/3] overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/projects/rooboy foundation3.jpg"
                    alt="The Journey"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                <motion.h3
                  className="absolute bottom-4 left-4 text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  The Journey
                </motion.h3>
              </div>
              {journeyContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </TimelineContent>

            <TimelineContent animationNum={1} className="flex flex-col gap-6">
              <div className="relative">
                <motion.div
                  className="aspect-[4/3] overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/images/projects/momentonstage.jpg"
                    alt="Entertainment Excellence"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                <motion.h3
                  className="absolute bottom-4 left-4 text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Entertainment Excellence
                </motion.h3>
              </div>
              {excellenceContent.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </TimelineContent>
          </div>
        </div>
      </section>

      {/* Fashion & Style Section */}
      <section className="relative py-12 sm:py-20">
        <PatternOverlay variant="kente" className="opacity-5" />
        <FashionStyleSection />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-12 sm:py-20">
        <PatternOverlay variant="grid" className="opacity-10" />
        <div className="container mx-auto px-4">
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
              A showcase of memorable moments and impactful events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Brand Collaborations */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-xl opacity-50" />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display mb-2 relative">
                  Brand Collaborations
                </h2>
                <p className="text-xl font-bold text-white relative">Premium Brands Host</p>
              </motion.div>

              <div className="space-y-4 relative">
                {brandCollaborations.map((brand, index) => (
                  <motion.div
                    key={brand.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:bg-[rgba(45,0,247,0.1)] transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-white font-medium group-hover:text-primary transition-colors duration-300">{brand.name}</span>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`mailto:info.rooboy@gmail.com?subject=Inquiry about ${brand.name}`}
                        className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Contact
                      </a>
                      <span className="text-primary text-sm">{brand.role}</span>
                    </div>
                  </motion.div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-retro-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* University Shows */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent blur-xl opacity-50" />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display mb-2 relative">
                  University Shows
                </h2>
                <p className="text-xl font-bold text-white relative">Campus Experience</p>
              </motion.div>

              <div className="space-y-4 relative">
                {universityShows.map((show, index) => (
                  <motion.div
                    key={show.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30 hover:bg-[rgba(45,0,247,0.1)] transition-all duration-300 group cursor-pointer"
                  >
                    <span className="text-white font-medium group-hover:text-primary transition-colors duration-300">{show.name}</span>
                    <div className="flex items-center gap-2">
                      <a 
                        href="https://book.rooboy.live"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        Book Now
                      </a>
                      <span className="text-primary text-sm">{show.role}</span>
                    </div>
                  </motion.div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-retro-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Festivals & Events */}
          <div className="mt-16 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent blur-2xl opacity-30" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 relative"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display mb-2">
                Festivals & Events
              </h2>
              <p className="text-xl font-bold text-white">Special Events</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {specialEvents.map((event, index) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    style: { backgroundColor: 'rgba(45, 0, 247, 0.1)' }
                  }}
                  className="flex items-center justify-between p-6 rounded-xl bg-black/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="text-white font-medium text-lg group-hover:text-primary transition-colors duration-300 relative z-10">
                    {event.name}
                  </span>
                  <div className="flex items-center gap-3 relative z-10">
                    <a 
                      href="https://book.rooboy.live"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      Book Event
                    </a>
                    <span className="text-primary text-sm font-medium px-3 py-1 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      {event.role}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Future Vision Section */}
      <section className="relative py-12 sm:py-20 overflow-hidden">
        <PatternOverlay variant="grid" className="opacity-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-wider font-display">
                Future Vision
              </h2>
              <div className="h-px flex-1 max-w-[100px] bg-primary/30" />
            </div>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Building a legacy that inspires generations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TimelineContent animationNum={0} className="group">
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-video hover:bg-[rgba(45,0,247,0.05)]"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/images/projects/RooKingdom.jpg"
                  alt="The Next Chapter"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold text-white mb-2">The Next Chapter</h3>
                  {nextChapterContent.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </TimelineContent>

            <TimelineContent animationNum={1} className="group">
              <motion.div
                className="relative overflow-hidden rounded-lg aspect-video hover:bg-[rgba(45,0,247,0.05)]"
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="/images/projects/Philantophy.jpg"
                  alt="Building Legacy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
                  <h3 className="text-xl font-bold text-white mb-2">Building Legacy</h3>
                  {legacyContent.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100 mb-2">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </TimelineContent>
          </div>
        </div>
      </section>

      {/* Updated Contact Section with Social Icons */}
      <section id="contact" className="relative py-12 sm:py-20">
        <PatternOverlay variant="grid" className="opacity-[0.02]" />
        <div className="container mx-auto px-4">
          <RetroCard 
            variant="highlight" 
            className="mx-auto max-w-4xl transform hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 p-4 sm:p-6">
              {[
                { icon: Mail, title: 'Email', content: 'info.rooboy@gmail.com', href: 'mailto:info.rooboy@gmail.com' },
                { icon: Globe, title: 'Bookings', content: 'book.rooboy.live', href: 'https://book.rooboy.live' },
                { icon: Phone, title: 'Phone', content: '07030880801', href: 'tel:07030880801' },
                { icon: MapPin, title: 'Location', content: 'Lagos, Nigeria (Available Worldwide)' }
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
                      {item.icon}
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
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="mt-6 border-t border-primary/10 pt-6 px-6">
              <div className="flex justify-center space-x-8">
                <div className="icon-wrapper">
                  <Instagram />
                </div>
                <div className="icon-wrapper">
                  <Twitter />
                </div>
                <div className="icon-wrapper">
                  <Facebook />
                </div>
                <div className="icon-wrapper">
                  <Linkedin />
                </div>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                © {new Date().getFullYear()} RooBoy. All rights reserved.
              </p>
            </div>
          </RetroCard>
        </div>
      </section>
    </div>
  );
} 