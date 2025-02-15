import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  className?: string;
}

export function TimelineContent({ children, animationNum, className = '' }: TimelineContentProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, {
    once: false,
    margin: '0px 0px -20% 0px'
  });

  const sequenceVariants = {
    visible: (i: number) => ({
      filter: 'blur(0px)',
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
    hidden: {
      filter: 'blur(20px)',
      y: 30,
      opacity: 0,
    },
  };

  return (
    <div ref={timelineRef} className={className}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={animationNum}
        variants={sequenceVariants}
      >
        {children}
      </motion.div>
    </div>
  );
} 