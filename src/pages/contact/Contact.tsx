import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Twitter, Facebook, Youtube, MessageCircle, Music2 } from 'lucide-react';
import { HeroSection } from '@/components/ui/sections/HeroSection';
import { socialLinks } from '@/config/social-links';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { PageLoading } from '@/components/ui/feedback/PageLoading';
import { toast } from 'sonner';
import { z } from 'zod';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { usePageState } from '@/hooks/usePageState';
import { ErrorBoundary } from '@/components/ui/core/ErrorBoundary';
import { useLoading } from '@/providers/LoadingProvider';
import { SECTION_NAMES, SECTION_IDS } from '@/config/sections';
import { SectionContainer } from '@/components/ui/layout/SectionContainer';
import { SectionHeader } from '@/components/ui/layout/SectionHeader';
import type { LucideIcon } from 'lucide-react';
import { debounce } from 'lodash';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface SocialLink {
  platform: string;
  url: string;
  Icon: LucideIcon;
  ariaLabel: string;
}

interface ContactPageData {
  socialLinks: SocialLink[];
  contactInfo: {
    email: string;
    bookingEmail: string;
    phone: string;
    address: string;
  };
}

const contactCards = [
  {
    icon: Mail,
    title: 'General Inquiries',
    content: 'info.rooboy@gmail.com',
    href: 'mailto:info.rooboy@gmail.com',
    description: 'For general questions and collaborations'
  },
  {
    icon: Mail,
    title: 'Booking & Events',
    content: 'book@rooboy.live',
    href: 'mailto:book@rooboy.live',
    description: 'For event bookings and professional engagements'
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '07086968897',
    href: 'tel:+2347086968897',
    description: 'Available during business hours'
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Lagos, Nigeria',
    description: 'Available for worldwide bookings',
    isLocation: true
  }
];

export default function Contact(): React.ReactElement {
  const { startLoading: startGlobalLoading, stopLoading: stopGlobalLoading } = useLoading();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Page-level state management
  const { 
    isLoading: isPageLoading, 
    error: pageError, 
    data: pageData,
  } = usePageState<ContactPageData>({
    loadingFn: async () => {
      abortControllerRef.current = new AbortController();
      
      try {
        if (isInitialLoad) {
          startGlobalLoading();
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data: ContactPageData = {
          socialLinks: [
            { 
              platform: 'Facebook',
              url: '#',
              Icon: Facebook,
              ariaLabel: 'Follow my daily adventures and behind-the-scenes moments'
            },
            { 
              platform: 'X (Twitter)',
              url: '#',
              Icon: Twitter,
              ariaLabel: 'Get real-time updates and engage in conversations'
            },
            { 
              platform: 'Spotify',
              url: '#',
              Icon: Music2,
              ariaLabel: 'Listen to my curated playlists and favorite tracks'
            },
            { 
              platform: 'YouTube',
              url: '#',
              Icon: Youtube,
              ariaLabel: 'Watch exclusive content and event highlights'
            },
            { 
              platform: 'Threads',
              url: '#',
              Icon: MessageCircle,
              ariaLabel: 'Join the conversation and share your thoughts'
            }
          ],
          contactInfo: {
            email: 'info.rooboy@gmail.com',
            bookingEmail: 'book@rooboy.live',
            phone: '07086968897',
            address: 'Lagos, Nigeria'
          }
        };

        setIsInitialLoad(false);
        return data;
      } catch (error) {
        if (abortControllerRef.current?.signal.aborted) {
          return {} as ContactPageData;
        }
        throw new Error('Failed to load contact data');
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          stopGlobalLoading();
        }
      }
    },
    onError: (error: unknown) => {
      if (!abortControllerRef.current?.signal.aborted) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to load contact information: ${message}`);
        stopGlobalLoading();
      }
    }
  });

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cleanup function
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      stopGlobalLoading();
    };
  }, [stopGlobalLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Memoized validation function
  const validateField = useCallback(
    debounce((name: keyof FormData, value: string) => {
      try {
        const partialSchema = {
          name: name === 'name' ? formSchema.shape.name : undefined,
          email: name === 'email' ? formSchema.shape.email : undefined,
          message: name === 'message' ? formSchema.shape.message : undefined
        };
        const fieldSchema = z.object({
          [name]: partialSchema[name] as z.ZodString
        });
        fieldSchema.parse({ [name]: value });
        setErrors(prev => ({ ...prev, [name]: undefined }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          const fieldError = error.errors[0]?.message;
          setErrors(prev => ({ ...prev, [name]: fieldError }));
        }
      }
    }, 300),
    []
  );

  const validateForm = useCallback(() => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<Record<keyof FormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      validateField(name as keyof FormData, value);
    },
    [validateField]
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    startGlobalLoading();
    
    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to send message: ${error.message}`);
      } else {
      toast.error('Failed to send message. Please try again.');
      }
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
      setIsSubmitting(false);
        stopGlobalLoading();
      }
    }
  }, [validateForm, startGlobalLoading, stopGlobalLoading]);

  // Loading state - only show on initial load
  if (isLoading) {
    return <PageLoading />;
  }

  // Error state
  if (pageError) {
    return (
      <div className="min-h-screen bg-retro-black text-retro-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-500 mb-4">
            Unable to Load Contact Page
          </h2>
          <p className="text-retro-white/80 mb-4">{pageError.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-retro-white text-retro-black rounded hover:bg-retro-white/90 transition-colors"
            type="button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-retro-black text-retro-white">
        <HeroSection
          title="GET IN TOUCH"
          subtitle="| LET'S CREATE SOMETHING AMAZING |"
          description="Ready to elevate your event? Let's bring your vision to life."
          backgroundImage="/images/projects/RooKingdom.jpg"
          pattern="kente"
          height="medium"
          align="left"
          contentWidth="normal"
          withGlitch={false}
        />

        {/* Contact Form and Info Section */}
        <SectionContainer id={SECTION_IDS.CONTACT_FORM} pattern="grid">
          <SectionHeader
            title={SECTION_NAMES[SECTION_IDS.CONTACT_FORM]}
            subtitle="Let's discuss your next event or collaboration"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 px-4 sm:px-6">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-primary">Contact Information</h2>
              <div className="grid gap-4 sm:gap-6">
                {contactCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <RetroCard className="p-4 sm:p-6 hover:bg-primary/5 transition-all duration-300 border border-primary/10 hover:border-primary/30">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="rounded-full bg-primary/10 p-2 sm:p-3 group-hover:bg-primary/20 transition-colors duration-300">
                          <card.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1">
                            {card.title}
                          </h3>
                          {card.isLocation ? (
                            <>
                              <p className="text-sm sm:text-base text-gray-300">{card.content}</p>
                              <p className="text-xs sm:text-sm text-primary mt-1">{card.description}</p>
                            </>
                          ) : (
                            <>
                              <a 
                                href={card.href}
                                className="text-sm sm:text-base text-gray-300 hover:text-primary transition-colors duration-300 block"
                              >
                                {card.content}
                              </a>
                              <p className="text-xs sm:text-sm text-gray-400 mt-1">{card.description}</p>
                            </>
                          )}
                        </div>
                        {!card.isLocation && (
                          <motion.div
                            className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            →
                          </motion.div>
                        )}
                      </div>
                    </RetroCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <RetroCard variant="highlight" className="p-4 sm:p-6 border-primary/30 bg-primary/5">
              <div className="absolute inset-0">
                <PatternOverlay variant="grid" className="opacity-[0.05]" />
                <PatternOverlay variant="kente" className="opacity-[0.02]" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    className={`mt-1 block w-full rounded-md bg-black/50 border ${
                      errors.name ? 'border-red-500' : 'border-primary/50'
                    } px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    className={`mt-1 block w-full rounded-md bg-black/50 border ${
                      errors.email ? 'border-red-500' : 'border-primary/50'
                    } px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    rows={6}
                    className={`mt-1 block w-full rounded-md bg-black/50 border ${
                      errors.message ? 'border-red-500' : 'border-primary/50'
                    } px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 shadow-sm focus:border-primary focus:ring focus:ring-primary/20 focus:ring-opacity-50`}
                    placeholder="Your message"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-busy={isSubmitting ? 'true' : 'false'}
                    className={`w-full rounded-full border-2 border-primary bg-black/50 px-8 sm:px-12 py-3 sm:py-4 font-mono text-base sm:text-lg text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(45,0,247,0.5)] ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </RetroCard>
          </div>
        </SectionContainer>

        {/* Social Links */}
        <SectionContainer id={SECTION_IDS.SOCIAL_LINKS} pattern="grid" patternOpacity="opacity-[0.02]">
          <SectionHeader
            title={SECTION_NAMES[SECTION_IDS.SOCIAL_LINKS]}
            subtitle="Connect with me on social media"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <RetroCard
                  variant="secondary"
                  className="group flex items-center gap-4 sm:gap-6 p-3 sm:p-4 h-full"
                >
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary/10">
                    <link.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-base sm:text-lg font-bold text-white truncate">
                      {link.platform}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-gray-400 line-clamp-2">
                      {link.description}
                    </p>
                  </div>
                  <motion.div
                    className="text-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    →
                  </motion.div>
                </RetroCard>
              </motion.a>
            ))}
          </div>
        </SectionContainer>
      </div>
    </ErrorBoundary>
  );
}