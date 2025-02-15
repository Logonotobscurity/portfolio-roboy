import { ReactNode } from 'react';
import { PatternOverlay } from './PatternOverlay';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  pattern?: 'grid' | 'kente' | 'dots';
  patternOpacity?: string;
  withContainer?: boolean;
}

export function SectionContainer({
  children,
  className = '',
  id,
  pattern = 'grid',
  patternOpacity = 'opacity-10',
  withContainer = true
}: SectionContainerProps) {
  return (
    <section id={id} className={`relative py-12 sm:py-20 overflow-hidden ${className}`}>
      <PatternOverlay variant={pattern} className={patternOpacity} />
      {withContainer ? (
        <div className="container mx-auto px-4">
          {children}
        </div>
      ) : children}
    </section>
  );
} 