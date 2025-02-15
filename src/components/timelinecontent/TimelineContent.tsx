import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TimelineContentProps {
  children?: ReactNode;
  className?: string;
}

export function TimelineContent({ children, className }: TimelineContentProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
