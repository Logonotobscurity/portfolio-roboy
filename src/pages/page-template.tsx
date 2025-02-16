import { type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { ErrorBoundary } from '@/components/ui/feedback/ErrorBoundary';

interface PageProps {
  title: string;
  description?: string;
}

export default function PageTemplate({ title, description }: PageProps): ReactElement {
  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-retro-black text-retro-white">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <PatternOverlay variant="grid" className="opacity-20" />
            <PatternOverlay variant="kente" className="opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-retro-black/90 via-retro-black/50 to-retro-black" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{title}</h1>
              {description && (
                <p className="text-xl text-retro-white/80">{description}</p>
              )}
            </motion.div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="container mx-auto px-4 py-16 relative">
          <PatternOverlay variant="grid" className="opacity-10" />
          <PatternOverlay variant="dots" className="opacity-5" />
          
          {/* Add your page-specific content here */}
        </section>
      </main>
    </ErrorBoundary>
  );
} 