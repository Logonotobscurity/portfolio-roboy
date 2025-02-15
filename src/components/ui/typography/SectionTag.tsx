import React from 'react';
import { motion } from 'framer-motion';

interface SectionTagProps {
  children: React.ReactNode;
}

const SectionTag: React.FC<SectionTagProps> = ({ children }) => {
  return (
    <motion.div
      className="inline-flex items-center gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-12 h-px bg-[#2D00F7]" />
      <span className="text-sm font-medium uppercase tracking-wider text-[#2D00F7]">
        {children}
      </span>
      <div className="w-12 h-px bg-[#2D00F7]" />
    </motion.div>
  );
};

export default SectionTag;