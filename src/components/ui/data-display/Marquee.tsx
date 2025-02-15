import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  children: React.ReactNode;
  gap?: number;
  speed?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  vertical = false,
  children,
  gap = 16,
  speed = 20,
}: MarqueeProps) {
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollDistance = vertical ? container.scrollHeight : container.scrollWidth;
    setDuration(scrollDistance / speed);
  }, [vertical, speed]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'group overflow-hidden [--gap:theme(spacing.4)]',
        vertical ? '[--duration:40s]' : '[--duration:20s]',
        className
      )}
      style={
        {
          '--gap': `${gap}px`,
          '--duration': `${duration}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'flex min-w-full shrink-0 items-center justify-around gap-[--gap]',
          vertical ? 'flex-col' : 'flex-row',
          vertical
            ? 'animate-marquee-vertical'
            : 'animate-marquee',
          reverse && 'direction-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
} 