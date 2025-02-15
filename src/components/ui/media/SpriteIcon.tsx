import { memo } from 'react';
import { motion, type SVGMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type SpriteIconProps = Omit<SVGMotionProps<SVGSVGElement>, 'children' | 'className'> & {
  name: string;
  size?: number | string;
  title?: string;
  className?: string;
};

export const SpriteIcon = memo(function SpriteIcon({
  name,
  size = 24,
  title,
  className = '',
  ...props
}: SpriteIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      className={twMerge('inline-block', className)}
      role="img"
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <use href={`/sprite.svg#${name}`} />
    </motion.svg>
  );
}); 