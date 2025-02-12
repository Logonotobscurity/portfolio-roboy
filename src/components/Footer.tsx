import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

const socialLinks = [
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'Threads' },
  { icon: Twitter, href: '#', label: 'X (Twitter)' },
];

const contactInfo = [
  { icon: Mail, text: 'info.rooboy@gmail.com', href: 'mailto:info.rooboy@gmail.com' },
  { icon: Mail, text: 'book@rooboy.live', href: 'mailto:book@rooboy.live' },
  { icon: Phone, text: '07086968897', href: 'tel:+2347086968897' },
  { icon: MapPin, text: 'Lagos, Nigeria', href: null },
];

export function Footer() {
  return (
    <footer className="relative bg-retro-black py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-12">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold text-retro-white">
            ROOBOY
          </Link>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-300">
                <item.icon className="h-5 w-5 text-primary" />
                {item.href ? (
                  <a 
                    href={item.href}
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-700 bg-black/30 p-2 text-gray-300 transition-colors duration-300 hover:border-primary hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>

          {/* Tagline and Copyright */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <p className="text-sm text-gray-500">
              ROOBOY "THE STREET CAPTAIN": The Master of Vibes and Moments
            </p>
            <div className="h-px w-24 bg-gray-800" />
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ROOBOY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 