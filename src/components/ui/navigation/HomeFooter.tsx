import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { socialLinks } from '@/config/social-links';

const contactInfo = [
  { icon: Mail, text: 'info.rooboy@gmail.com', href: 'mailto:info.rooboy@gmail.com' },
  { icon: Phone, text: '07086968897', href: 'tel:+2347086968897' },
  { icon: MapPin, text: 'Lagos, Nigeria', href: null },
];

export function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, transparent 50%, rgba(45,0,247,0.3) 50%),
            radial-gradient(circle at 100% 100%, transparent 50%, rgba(45,0,247,0.3) 50%)
          `,
          backgroundSize: '40px 40px',
          filter: 'blur(1px)'
        }}
      />

      <div className="container relative mx-auto px-4 py-8 md:py-12">
        {/* Main Content */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand & Contact Section */}
          <div className="flex flex-col gap-6 md:flex-row md:gap-12">
            {/* Brand */}
            <div>
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                  ROOBOY
                </h3>
                <motion.div
                  className="absolute -right-2 -top-2 h-6 w-6 md:-right-3 md:-top-3 md:h-8 md:w-8"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <div className="h-full w-full rounded-full border border-[#2D00F7] opacity-20" />
                </motion.div>
              </motion.div>
            </div>

            {/* Contact Info - Compact Version */}
            <div className="flex flex-wrap gap-4 text-sm md:gap-6">
              {contactInfo.map(({ icon: Icon, text, href }) => (
                <motion.div
                  key={text}
                  className="flex items-center gap-2 text-gray-400"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Icon className="h-4 w-4 text-[#2D00F7]" />
                  {href ? (
                    <a href={href} className="hover:text-[#2D00F7] transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Links - Compact Version */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all hover:bg-[#2D00F7]/20 md:h-10 md:w-10"
                whileHover={{ y: -2, scale: 1.1 }}
              >
                <social.icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-[#2D00F7] md:h-5 md:w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* LOG_ON Signature & Copyright */}
        <div className="relative mt-8 flex flex-col items-center gap-4 pt-6 md:mt-12 md:flex-row md:justify-between md:pt-8">
          {/* Animated Line */}
          <motion.div
            className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2D00F7]/20 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />

          {/* Copyright */}
          <motion.p
            className="text-center text-xs text-gray-500 md:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {currentYear} ROOBOY. All rights reserved.
          </motion.p>

          {/* LOG_ON Signature */}
          <motion.div
            className="group relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://logon.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 text-xs md:text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gray-500">Crafted by</span>
              <span className="font-display font-bold text-[#2D00F7]">LOG_ON</span>
              
              {/* Animated Underline */}
              <motion.div
                className="absolute -bottom-1 left-1/2 h-px w-0 bg-[#2D00F7]"
                initial={{ width: 0 }}
                whileHover={{ width: '100%', left: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -right-4 -top-4 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                animate={{
                  rotate: [0, 360],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }
                }}
              >
                <div className="absolute inset-0 rounded-full border border-[#2D00F7] opacity-20" />
                <div className="absolute inset-2 rounded-full border border-[#2D00F7] opacity-20" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
} 