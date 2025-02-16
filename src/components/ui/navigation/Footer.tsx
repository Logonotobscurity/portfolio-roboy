import { motion } from 'framer-motion';
import { socialLinks } from '@/config/social-links';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-white/10 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-[#2D00F7]">
              © {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2D00F7] transition-colors hover:text-[#2D00F7]/80"
                whileHover={{ y: -2 }}
              >
                {social.platform}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 