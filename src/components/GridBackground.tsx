import React from 'react';
import { motion } from 'framer-motion';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black bg-opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D00F7]/10 to-transparent" />
      
      {/* Animated dots */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#2D00F7]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <motion.div
        className="absolute inset-0 grid grid-cols-8 gap-4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 64 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full border border-[#2D00F7]/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: i * 0.01,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default GridBackground;