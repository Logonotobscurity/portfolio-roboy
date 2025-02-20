import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

type MotionComponent = {
  div: React.FC<HTMLMotionProps<'div'>>;
  p: React.FC<HTMLMotionProps<'p'>>;
};

export const MotionDiv = motion.div as React.FC<HTMLMotionProps<'div'>>;
export const MotionP = motion.p as React.FC<HTMLMotionProps<'p'>>;

// Helper function to create motion components with proper typing
export const createMotionComponent = <T extends keyof HTMLElementTagNameMap>(
  element: T
): React.FC<HTMLMotionProps<T>> => {
  return motion[element] as React.FC<HTMLMotionProps<T>>;
}; 