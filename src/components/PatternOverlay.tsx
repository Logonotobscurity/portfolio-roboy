
interface PatternOverlayProps {
  variant?: 'dots' | 'lines' | 'grid' | 'kente';
  className?: string;
}

export function PatternOverlay({ variant = 'dots', className = '' }: PatternOverlayProps) {
  const patterns = {
    dots: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
    lines: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 10px)',
    grid: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
    kente: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px),
            repeating-linear-gradient(-45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)`
  };

  const getBackgroundStyle = () => {
    switch (variant) {
      case 'dots':
        return {
          backgroundImage: patterns.dots,
          backgroundSize: '20px 20px'
        };
      case 'lines':
        return {
          backgroundImage: patterns.lines,
          backgroundSize: '20px 20px'
        };
      case 'grid':
        return {
          backgroundImage: patterns.grid,
          backgroundSize: '20px 20px'
        };
      case 'kente':
        return {
          backgroundImage: patterns.kente,
          backgroundSize: '16px 16px'
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={getBackgroundStyle()}
      aria-hidden="true"
    />
  );
} 