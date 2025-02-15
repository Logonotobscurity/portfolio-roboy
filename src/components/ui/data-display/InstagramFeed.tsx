import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Share2 } from 'lucide-react';
import { RetroCard } from './RetroCard';

interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  location?: string;
  link: string;
}

const samplePosts: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/assets/instagram/post1.jpg',
    caption: 'Bringing the energy to AMC The Hangout! 🎤✨ Another epic night of pure vibes and entertainment. #RooBoyXperience #AMCTheHangout',
    likes: 1200,
    comments: 45,
    date: '2 days ago',
    location: 'AMC The Hangout, Lagos',
    link: 'https://instagram.com/rooboyway',
  },
  {
    id: '2',
    imageUrl: '/assets/instagram/post2.jpg',
    caption: 'Another epic night with @SmirnoffNG! When we come together, magic happens. 🎉 #SmirnoffNights #RooBoyMagic',
    likes: 980,
    comments: 32,
    date: '5 days ago',
    location: 'Smirnoff Nights, Victoria Island',
    link: 'https://instagram.com/rooboyway',
  },
  {
    id: '3',
    imageUrl: '/assets/instagram/post3.jpg',
    caption: 'Hosting the biggest names in African music at #GidiFest2024! The energy was unmatched! 🔥 #GidiCulture',
    likes: 1500,
    comments: 67,
    date: '1 week ago',
    location: 'Gidi Culture Festival',
    link: 'https://instagram.com/rooboyway',
  },
  {
    id: '4',
    imageUrl: '/assets/instagram/post4.jpg',
    caption: 'Behind the scenes at @MTVBaseAfrica! New content loading... 📺✨ #MTVBase #ComingSoon',
    likes: 890,
    comments: 28,
    date: '1 week ago',
    location: 'MTV Base Studios',
    link: 'https://instagram.com/rooboyway',
  },
  {
    id: '5',
    imageUrl: '/assets/instagram/post5.jpg',
    caption: 'Giving back to the community through the RooBoy Foundation. Together, we can make a difference! 💫 #RooBoyFoundation',
    likes: 2100,
    comments: 93,
    date: '2 weeks ago',
    location: 'Lagos State',
    link: 'https://instagram.com/rooboyway',
  },
  {
    id: '6',
    imageUrl: '/assets/instagram/post6.jpg',
    caption: 'International moves! 🌍 Taking the RooBoy brand global. Stay tuned for more! #GlobalTakeover',
    likes: 1800,
    comments: 76,
    date: '2 weeks ago',
    link: 'https://instagram.com/rooboyway',
  }
];

export function InstagramFeed() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary via-purple-500 to-pink-500" />
          <Instagram className="relative h-full w-full p-2 text-white" />
        </div>
        <div className="text-center">
          <a
            href="https://instagram.com/rooboyway"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xl text-primary hover:text-primary-light"
          >
            @rooboyway
          </a>
          <div className="text-sm text-gray-400">Follow the journey</div>
        </div>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {samplePosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <RetroCard className="group overflow-hidden">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {post.location && (
                      <div className="mb-2 text-sm font-semibold text-primary">
                        📍 {post.location}
                      </div>
                    )}
                    <p className="mb-2 line-clamp-2 text-sm">{post.caption}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        {post.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </div>
                      <div className="ml-auto text-xs text-gray-300">{post.date}</div>
                    </div>
                  </div>
                </div>
              </a>
            </RetroCard>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center">
        <motion.a
          href="https://instagram.com/rooboyway"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-black/30 px-6 py-3 text-primary backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-white hover:shadow-[0_0_15px_rgba(45,0,247,0.3)]"
          whileHover={{ scale: 1.05 }}
        >
          <Share2 className="h-4 w-4" />
          View More on Instagram
        </motion.a>
      </div>
    </div>
  );
} 