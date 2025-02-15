import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';

interface PatternOverlayProps {
  variant?: 'grid' | 'dots' | 'kente' | 'grain';
  className?: string;
}

export function PatternOverlay({ 
  variant = 'grid', 
  className 
}: PatternOverlayProps): React.ReactElement {
  const [patternError, setPatternError] = useState(false);

  const patterns = {
    grid: 'bg-[url("/patterns/grid.svg")]',
    dots: 'bg-[url("/patterns/dots.svg")]',
    kente: 'bg-[url("/patterns/kente.svg")]',
    grain: 'bg-[url("/patterns/grain.svg")]'
  };

  useEffect(() => {
    // Preload pattern to check if it exists
    const img = new Image();
    img.src = `/patterns/${variant}.svg`;
    img.onerror = () => setPatternError(true);
    
    return () => {
      img.onerror = null;
    };
  }, [variant]);

  if (patternError) {
    console.warn(`Pattern ${variant}.svg not found, falling back to default style`);
    return (
      <div 
        className={cn(
          'absolute inset-0 pointer-events-none bg-black/5',
          className
        )} 
        aria-hidden="true"
      />
    );
  }

  return (
    <div 
      className={cn(
        'absolute inset-0 pointer-events-none bg-repeat',
        patterns[variant],
        className
      )} 
      aria-hidden="true"
    />
  );
} 