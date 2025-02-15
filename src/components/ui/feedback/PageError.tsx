import { motion } from 'framer-motion';

interface PageErrorProps {
  message: string;
  onRetry?: () => void;
}

export function PageError({ message, onRetry }: PageErrorProps) {
  return (
    <div className="min-h-screen bg-retro-black text-retro-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 rounded-lg max-w-md"
      >
        <h2 className="text-xl font-bold text-red-500 mb-4">
          Something went wrong
        </h2>
        <p className="text-retro-white/80 mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            type="button"
            className="px-6 py-3 bg-retro-white text-retro-black font-medium rounded hover:bg-retro-white/90 transition-colors"
          >
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
} 