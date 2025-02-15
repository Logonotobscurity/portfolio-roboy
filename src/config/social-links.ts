import { Facebook, Instagram, Twitter, Youtube, MessageCircle, Music2 } from 'lucide-react';

export const socialLinks = [
  {
    platform: 'Instagram',
    handle: '@rooboy',
    url: 'https://instagram.com/rooboy',
    icon: Instagram,
    description: 'Follow for daily updates and behind-the-scenes content'
  },
  {
    platform: 'Facebook',
    handle: 'RooBoy Official',
    url: 'https://facebook.com/rooboyofficial',
    icon: Facebook,
    description: 'Join our community and stay connected'
  },
  {
    platform: 'X (Twitter)',
    handle: '@rooboy',
    url: 'https://twitter.com/rooboy',
    icon: Twitter,
    description: 'Join the conversation and stay updated'
  },
  {
    platform: 'YouTube',
    handle: 'RooBoy TV',
    url: 'https://youtube.com/rooboy',
    icon: Youtube,
    description: 'Watch event highlights and exclusive content'
  },
  {
    platform: 'TikTok',
    handle: '@rooboy',
    url: 'https://tiktok.com/@rooboy',
    icon: Music2,
    description: 'Fun, short-form content and viral moments'
  },
  {
    platform: 'Threads',
    handle: '@rooboy',
    url: 'https://threads.net/@rooboy',
    icon: MessageCircle,
    description: 'Join the community conversations'
  },
  {
    platform: 'Spotify',
    handle: 'RooBoy',
    url: 'https://open.spotify.com/user/rooboy',
    icon: Music2,
    description: 'Listen to my playlists and podcasts'
  }
] as const;

export type SocialPlatform = (typeof socialLinks)[number]['platform'];

export const socialLinksMap = socialLinks.reduce((acc, link) => {
  acc[link.platform] = link;
  return acc;
}, {} as Record<SocialPlatform, typeof socialLinks[number]>); 