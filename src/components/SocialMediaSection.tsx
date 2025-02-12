import { motion } from 'framer-motion';
import { Facebook, Twitter, Music2, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    url: '#',
    color: 'hover:text-blue-500',
    description: 'Follow my daily adventures and behind-the-scenes moments',
  },
  {
    name: 'X (Twitter)',
    icon: Twitter,
    url: '#',
    color: 'hover:text-gray-400',
    description: 'Get real-time updates and engage in conversations',
  },
  {
    name: 'Spotify',
    icon: Music2,
    url: '#',
    color: 'hover:text-green-500',
    description: 'Listen to my curated playlists and favorite tracks',
  },
  {
    name: 'YouTube',
    icon: Youtube,
    url: '#',
    color: 'hover:text-red-500',
    description: 'Watch exclusive content and event highlights',
  },
  {
    name: 'Threads',
    icon: MessageCircle,
    url: '#',
    color: 'hover:text-purple-500',
    description: 'Join the conversation and share your thoughts',
  },
];

export function SocialMediaSection() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.h2
        className="mb-12 text-center font-display text-3xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Follow My Journey
      </motion.h2>
      
      <div className="mx-auto max-w-4xl space-y-6">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-6 rounded-lg border border-gray-800 bg-black/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-black/50 ${social.color}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-700 bg-black/50 transition-colors duration-300 group-hover:border-primary/50">
              <social.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-xl font-bold">{social.name}</h3>
              <p className="mt-1 text-gray-400">{social.description}</p>
            </div>
            <motion.div
              className="text-primary"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              →
            </motion.div>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 