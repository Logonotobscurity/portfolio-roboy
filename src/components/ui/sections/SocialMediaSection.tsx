import { motion } from 'framer-motion';
import { socialLinks } from '@/config/social-links';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import { SECTION_IDS, SECTION_NAMES } from '@/config/sections';

export function SocialMediaSection() {
  return (
    <SectionContainer id={SECTION_IDS.SOCIAL_LINKS} pattern="grid">
      <SectionHeader
        title={SECTION_NAMES[SECTION_IDS.SOCIAL_LINKS]}
        subtitle="Stay connected and follow the journey"
      />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <RetroCard variant="secondary" className="relative overflow-hidden p-3 sm:p-4 h-full">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white truncate">
                      {social.platform}
                    </h3>
                    <p className="text-xs text-gray-400 truncate mb-1 sm:mb-2">
                      {social.handle}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-2">
                      {social.description}
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-primary"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  →
                </motion.div>
              </RetroCard>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
} 