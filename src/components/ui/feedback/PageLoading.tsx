import { motion } from 'framer-motion';
import { PatternOverlay } from '@/components/ui/layout/PatternOverlay';
import { RetroCard } from '@/components/ui/interactive/RetroCard';
import { Feather } from 'lucide-react';

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = 'Keep Calm Roo is ROARING' }: PageLoadingProps): React.ReactElement {
  return (
    <div className="min-h-screen bg-retro-black text-retro-white flex items-center justify-center relative overflow-hidden">
      <PatternOverlay variant="grid" className="opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-retro-black/90 via-retro-black/50 to-retro-black" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <RetroCard variant="highlight" className="text-center p-8">
          <div className="flex flex-col items-center gap-4">
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
              className="text-lg font-display text-retro-white"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {message}
            </motion.p>
          </div>
        </RetroCard>
      </motion.div>
    </div>
  );
} 