import { memo, type CSSProperties } from 'react';
import { motion, type MotionStyle } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SvgIconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export const SvgIcon = memo(function SvgIcon({
  size = 24,
  className,
  style,
  children
}: SvgIconProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('feather', className)}
      style={style as MotionStyle}
    >
      {children}
    </motion.svg>
  );
}); 