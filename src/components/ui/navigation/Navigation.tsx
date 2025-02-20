import Logo from '@/components/ui/branding/Logo';
import { PreloadLink } from '@/components/ui/core/PreloadLink';
import { RoutePath } from '@/config/routes';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, Image, LucideIcon, Mail, Menu, User, X } from 'lucide-react';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface NavLink {
  path: RoutePath;
  icon: LucideIcon;
  label: string;
}

interface NavItemProps {
  link: NavLink;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links: NavLink[] = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/gallery', icon: Image, label: 'Gallery' },
  { path: '/about', icon: User, label: 'About' },
  { path: '/contact', icon: Mail, label: 'Contact' },
];

// Memoized navigation link component for better performance
const NavItem = memo(function NavItem({ link, isActive, isMobile, onClick }: NavItemProps) {
  const { path, icon: Icon, label } = link;

  return (
    <PreloadLink
      to={path}
      aria-label={label}
      className={`relative group ${
        isMobile
          ? 'flex items-center w-full p-4 mb-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200'
          : 'px-4 py-2 hover:bg-white/5 rounded-lg transition-colors duration-200'
      }`}
      preloadOptions={{
        threshold: 0.2,
        rootMargin: '100px',
      }}
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
        whileTap={{ scale: 0.98 }}
        className={`flex ${isMobile ? 'flex-row items-center' : 'flex-col items-center gap-1'} transition-transform duration-200 ease-out`}
      >
        <Icon
          className={`${isMobile ? 'h-6 w-6 mr-4' : 'h-5 w-5'} transition-all duration-300 ${
            isActive ? 'text-[#2D00F7] scale-110' : 'text-white group-hover:text-[#2D00F7]/90'
          }`}
          aria-hidden="true"
        />
        <motion.span
          className={`${
            isMobile
              ? 'text-white text-lg font-medium flex-1'
              : 'text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-all duration-300'
          }`}
          initial={isMobile ? { opacity: 1 } : { opacity: 0, y: -5 }}
          animate={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
        {isActive && (
          <motion.div
            className={`${
              isMobile
                ? 'absolute right-4 w-2 h-2 rounded-full bg-[#2D00F7]'
                : 'absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#2D00F7]'
            }`}
            layoutId={`navIndicator${isMobile ? 'Mobile' : 'Desktop'}`}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
          />
        )}
      </motion.div>
    </PreloadLink>
  );
});

// Memoized mobile menu component
const MobileMenu = memo(function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gradient-to-b from-black/95 to-black/98 backdrop-blur-md md:hidden"
          >
            {/* Close button for better mobile UX */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              className="flex flex-col items-center justify-center min-h-screen px-6 py-20"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {links.map(link => (
                <motion.div
                  key={link.path}
                  className="w-full max-w-sm"
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 20, opacity: 0 },
                  }}
                >
                  <NavItem
                    link={link}
                    isActive={location.pathname === link.path}
                    isMobile
                    onClick={onClose}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

const Navigation = memo(function Navigation() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-lg shadow-lg py-3'
            : isMobileMenuOpen
              ? 'bg-transparent py-4'
              : 'bg-gradient-to-b from-black/80 to-transparent py-4'
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6"
          role="navigation"
          aria-label="Main navigation"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-50"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center gap-2 rounded-2xl bg-black/80 px-4 py-2 backdrop-blur-lg shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            role="menubar"
          >
            {links.map(link => (
              <motion.div
                key={link.path}
                role="menuitem"
                whileHover={{ scale: 1.02 }}
                className="px-1"
              >
                <NavItem link={link} isActive={location.pathname === link.path} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative z-50 p-3 text-white hover:bg-white/10 active:bg-white/20 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Mobile Navigation */}
          <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </nav>
      </header>
      <AnimatePresence mode="wait">
        {/* ... rest of your existing AnimatePresence content ... */}
      </AnimatePresence>
    </>
  );
});

export default Navigation;
