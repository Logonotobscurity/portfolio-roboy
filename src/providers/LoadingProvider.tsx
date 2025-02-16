import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather } from 'lucide-react';

interface LoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps): React.ReactElement {
  const [loadingCount, setLoadingCount] = useState(0);
  const isLoading = loadingCount > 0;

  const startLoading = useCallback(() => {
    setLoadingCount(prev => prev + 1);
  }, []);

  const stopLoading = useCallback(() => {
    setLoadingCount(prev => Math.max(0, prev - 1));
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-retro-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <div className="relative h-32 w-full">
                {/* Left Wing */}
                <motion.div
                  className="absolute text-retro-white"
                  animate={{ 
                    x: [-150, 0],
                    y: [-30, 30],
                    rotate: [-45, -15],
                    scale: [0.9, 1.1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  style={{ left: '35%', top: '30%' }}
                >
                  <Feather size={48} className="transform -scale-x-100 rotate-45" />
                </motion.div>
                
                {/* Right Wing */}
                <motion.div
                  className="absolute text-retro-white"
                  animate={{ 
                    x: [0, 150],
                    y: [-30, 30],
                    rotate: [45, 15],
                    scale: [0.9, 1.1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  style={{ right: '35%', top: '30%' }}
                >
                  <Feather size={48} className="transform rotate-45" />
                </motion.div>

                {/* Center Glow Effect */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/20 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Additional Wing Trails */}
                <motion.div
                  className="absolute text-retro-white/30"
                  animate={{ 
                    x: [-120, 0],
                    y: [-20, 20],
                    rotate: [-45, -15],
                    scale: [0.7, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.1
                  }}
                  style={{ left: '35%', top: '30%' }}
                >
                  <Feather size={48} className="transform -scale-x-100 rotate-45" />
                </motion.div>

                <motion.div
                  className="absolute text-retro-white/30"
                  animate={{ 
                    x: [0, 120],
                    y: [-20, 20],
                    rotate: [45, 15],
                    scale: [0.7, 0.9]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 0.1
                  }}
                  style={{ right: '35%', top: '30%' }}
                >
                  <Feather size={48} className="transform rotate-45" />
                </motion.div>
              </div>
              <motion.p 
                className="text-lg font-display text-retro-white mt-6"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Keep Calm Roo is ROARING
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  );
} 