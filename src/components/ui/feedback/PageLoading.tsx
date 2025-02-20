import React from 'react';
import { motion } from 'framer-motion';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { Feather } from 'lucide-react';

export interface PageLoadingProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative">
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-primary rounded-full"
                animate={{
                  x: [-20, 20, -20],
                  y: [-20, 20, -20],
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                style={{
                  transformOrigin: 'center',
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full" />
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-white/90 text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default PageLoading; 