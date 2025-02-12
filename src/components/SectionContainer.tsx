import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  pattern?: 'top' | 'center' | 'bottom' | 'none';
}

export function SectionContainer({
  children,
  id,
  className = '',
  pattern = 'none'
}: SectionContainerProps) {
  const gradientPatterns = {
    top: 'bg-[radial-gradient(ellipse_at_top,#2D00F710_0%,transparent_70%)]',
    center: 'bg-[radial-gradient(circle_at_center,#2D00F710_0%,transparent_65%)]',
    bottom: 'bg-[radial-gradient(circle_at_bottom,#2D00F710_0%,transparent_60%)]',
    none: ''
  };

  return (
    <section id={id} className={`relative py-16 md:py-20 ${className}`}>
      <div className={`absolute inset-0 ${gradientPatterns[pattern]}`} />
      <div className="container mx-auto px-4 relative z-10">
        {children}
      </div>
    </section>
  );
} 