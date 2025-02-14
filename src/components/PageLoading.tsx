import { motion } from 'framer-motion';
import { PatternOverlay } from './PatternOverlay';
import { RetroCard } from './RetroCard';

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps): React.ReactElement {
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
            <div className="relative">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent" />
              <div className="absolute inset-0 blur-xl bg-primary/20 animate-pulse" />
            </div>
            <motion.p 
              className="text-lg font-display bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-white"
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