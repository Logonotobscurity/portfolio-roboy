import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

export function Section({
  children,
  className,
  containerClassName,
  id,
  containerSize = 'lg',
  animate = true
}: SectionProps) {
  const Wrapper = animate ? motion.section : 'section';

  return (
    <Wrapper
      id={id}
      className={cn('py-12 sm:py-16 md:py-20', className)}
      initial={animate ? { opacity: 0, y: 20 } : undefined}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true }}
    >
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </Wrapper>
  );
} 