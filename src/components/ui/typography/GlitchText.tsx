import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative inline-block text-retro-white"
        initial={{ opacity: 1 }}
        animate={{
          opacity: [1, 0.9, 1],
          x: [0, -2, 0, 2, 0],
          y: [0, 1, -1, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-cyan-400 mix-blend-screen"
        style={{ clipPath: "inset(10% 0 90% 0)" } as React.CSSProperties}
        animate={{
          x: [-1, 1, -1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-red-400 mix-blend-screen"
        style={{ clipPath: 'inset(80% 0 10% 0)' } as React.CSSProperties}
        animate={{
          x: [1, -1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {text}
      </motion.span>
    </div>
  );
} 