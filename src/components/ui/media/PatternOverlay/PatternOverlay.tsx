import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface PatternOverlayProps {
  children?: ReactNode;
  className?: string;
}

export function PatternOverlay({ children, className }: PatternOverlayProps) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}
