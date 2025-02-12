import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Image, User, Mail, Menu, X, LucideIcon } from 'lucide-react';
import Logo from './Logo';

interface NavLink {
  path: string;
  icon: LucideIcon;
  label: string;
}

const links: NavLink[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/gallery', icon: Image, label: 'Gallery' },
  { path: '/about', icon: User, label: 'About' },
  { path: '/contact', icon: Mail, label: 'Contact' },
];

export function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Logo />
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden md:flex items-center gap-8 rounded-full bg-black/80 px-6 py-3 backdrop-blur-lg"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {links.map(({ path, icon: Icon, label }) => (
            <Link 
              key={path} 
              to={path}
              aria-label={label}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center"
              >
                <Icon
                  className={`h-5 w-5 transition-colors duration-200 ${
                    location.pathname === path ? 'text-primary' : 'text-white hover:text-primary/80'
                  }`}
                  aria-hidden="true"
                />
                <motion.span 
                  className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {label}
                </motion.span>
                {location.pathname === path && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 h-1 w-1 rounded-full bg-primary"
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden relative z-50 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-lg md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full gap-8">
                {links.map(({ path, icon: Icon, label }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center gap-2"
                  >
                    <Icon
                      className={`h-8 w-8 ${
                        location.pathname === path ? 'text-primary' : 'text-white'
                      }`}
                    />
                    <span className="text-white text-lg">{label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navigation;