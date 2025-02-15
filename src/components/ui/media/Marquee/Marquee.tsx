import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface MarqueeProps {
  children?: ReactNode;
  className?: string;
}

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
