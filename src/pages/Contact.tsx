import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, MessageCircle, Music2 } from 'lucide-react';
import { PatternOverlay } from '../components/PatternOverlay';
import { PageLoading } from '../components/PageLoading';
import { toast } from 'sonner';
import { z } from 'zod';
import { RetroCard } from '../components/RetroCard';
import { usePageState } from '../hooks/usePageState';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useLoading } from '../providers/LoadingProvider';
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

export default function Contact(): React.ReactElement {
  const { startLoading: startGlobalLoading, stopLoading: stopGlobalLoading } = useLoading();
  const abortControllerRef = useRef<AbortController>();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
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
  if ((isPageLoading && isInitialLoad) || !pageData?.socialLinks || !pageData?.contactInfo) {
    return <PageLoading message="Loading contact information..." />;
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
      <main className="min-h-screen bg-retro-black text-retro-white">
        {/* Hero Section */}
        <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/projects/RooKingdom.jpg"
              alt="Contact Hero"
              className="w-full h-full object-cover opacity-50"
              width={1920}
              height={1080}
              loading="eager"
            />
            <PatternOverlay variant="grid" className="opacity-20" />
            <PatternOverlay variant="kente" className="opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-retro-black/90 via-retro-black/50 to-retro-black" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.2 }}
              layout
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Get in Touch</h1>
              <p className="text-xl text-retro-white/80">Let's create something amazing together</p>
            </motion.div>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <section className="container mx-auto px-4 py-16 relative">
          <PatternOverlay variant="grid" className="opacity-10" />
          <PatternOverlay variant="dots" className="opacity-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Contact Information</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a 
                    href={`mailto:${pageData?.contactInfo.email}`}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {pageData?.contactInfo.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a 
                    href={`mailto:${pageData?.contactInfo.bookingEmail}`}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {pageData?.contactInfo.bookingEmail}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                  <a 
                    href={`tel:+234${pageData?.contactInfo.phone}`}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {pageData?.contactInfo.phone}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                  <span className="text-gray-300">{pageData?.contactInfo.address}</span>
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-6 text-primary">Connect With Me</h3>
                <div className="space-y-4">
                  {pageData?.socialLinks.map(({ platform, url, Icon, ariaLabel }) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-6 rounded-lg border border-gray-800 bg-black/30 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-black/50"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-black/50 transition-colors duration-300 group-hover:border-primary/50">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-lg font-bold text-gray-200">{platform}</h4>
                        <p className="mt-1 text-sm text-gray-400">{ariaLabel}</p>
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
            </div>

            {/* Contact Form */}
            <RetroCard variant="highlight" className="p-6 border-primary/30 bg-primary/5">
              <div className="absolute inset-0">
                <PatternOverlay variant="grid" className="opacity-[0.05]" />
                <PatternOverlay variant="kente" className="opacity-[0.02]" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-primary">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-black/50 border ${
                      errors.name ? 'border-red-500' : 'border-primary/30'
                    } rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-300`}
                    disabled={isSubmitting}
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-primary">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-black/50 border ${
                      errors.email ? 'border-red-500' : 'border-primary/30'
                    } rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-300`}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2 text-primary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 bg-black/50 border ${
                      errors.message ? 'border-red-500' : 'border-primary/30'
                    } rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-gray-300`}
                    disabled={isSubmitting}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 rounded-full border-2 border-primary bg-black/50 font-mono text-lg text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_15px_rgba(45,0,247,0.5)]"
                  aria-busy={isSubmitting ? 'true' : 'false'}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </RetroCard>
          </div>
        </section>
      </main>
    </ErrorBoundary>
  );
}