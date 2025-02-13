import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, MessageCircle, Globe, Linkedin } from 'lucide-react';
import { PatternOverlay } from '../components/PatternOverlay';
import { toast } from 'sonner';
import { z } from 'zod';
import { RetroCard } from '../components/RetroCard';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<FormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof FormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
  return (
    <main className="min-h-screen bg-retro-black text-retro-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/projects/RooKingdom.jpg"
            alt="Contact Hero"
            className="w-full h-full object-cover opacity-50"
            loading="eager"
          />
          <PatternOverlay variant="grid" className="opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-retro-black/80 via-transparent to-retro-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Get in Touch
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="relative py-12 sm:py-20">
        <PatternOverlay variant="grid" className="opacity-[0.02]" />
        <div className="container mx-auto px-4">
          <RetroCard 
            variant="highlight" 
            className="mx-auto max-w-4xl transform hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 p-4 sm:p-6">
              {[
                { icon: Mail, title: 'Email', content: 'info.rooboy@gmail.com', href: 'mailto:info.rooboy@gmail.com' },
                { icon: Globe, title: 'Bookings', content: 'book.rooboy.live', href: 'https://book.rooboy.live' },
                { icon: Phone, title: 'Phone', content: '07030880801', href: 'tel:07030880801' },
                { icon: MapPin, title: 'Location', content: 'Lagos, Nigeria (Available Worldwide)' }
              ].map((item) => (
            <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <item.icon className="h-5 w-5 text-primary transform group-hover:scale-110 transition-transform duration-300" />
                <div>
                      <h3 className="font-display text-sm font-bold mb-0.5">{item.title}</h3>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          className="font-mono text-xs text-gray-300 hover:text-primary transition-colors duration-300"
                          target={item.title === 'Bookings' ? '_blank' : undefined}
                          rel={item.title === 'Bookings' ? 'noopener noreferrer' : undefined}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="font-mono text-xs text-gray-300">{item.content}</p>
                  )}
                </div>
                </div>
                </motion.div>
              ))}
                </div>

            {/* Social Icons */}
            <div className="mt-6 border-t border-primary/10 pt-6 px-6">
              <div className="flex justify-center space-x-8">
                <motion.a
                  href="https://instagram.com/rooboy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://twitter.com/rooboy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                    <motion.a
                  href="https://facebook.com/rooboyofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                >
                  <Facebook className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                  href="https://linkedin.com/in/rooboy"
                      target="_blank"
                      rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-primary transition-colors duration-300"
                    >
                  <Linkedin className="w-6 h-6" />
                    </motion.a>
              </div>
              <p className="text-center text-gray-400 text-sm mt-4">
                © {new Date().getFullYear()} RooBoy. All rights reserved.
              </p>
          </div>
          </RetroCard>
        </div>
      </section>
    </div>
  );
}