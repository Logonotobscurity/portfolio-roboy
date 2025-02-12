import { memo, type SVGProps, type CSSProperties } from 'react';
import { motion, type MotionProps, type MotionStyle, type SVGMotionProps } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

type SvgIconProps = Omit<SVGMotionProps<SVGSVGElement>, 'style'> & {
  src?: string;
  title?: string;
  description?: string;
  size?: number | string;
  className?: string;
  inline?: boolean;
  style?: MotionStyle;
};

export const SvgIcon = memo(function SvgIcon({
  src,
  title,
  description,
  size = 24,
  className = '',
  inline = false,
  style,
  ...props
}: SvgIconProps) {
  const dimensions: MotionStyle = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    ...(style || {})
  };

  const commonClassName = twMerge(
    'pointer-events-none select-none',
    inline ? 'inline-block align-middle' : 'block',
    className
  );

  // If src is provided, render as an external SVG
  if (src) {
    return (
      <object
        type="image/svg+xml"
        data={src}
        className={commonClassName}
        style={dimensions as CSSProperties}
        aria-label={title}
        role="img"
      >
        {title}
      </object>
    );
  }

  // If no src, render as an SVG container
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={commonClassName}
      style={dimensions}
      role="img"
      aria-labelledby={title ? 'title' : undefined}
      aria-describedby={description ? 'desc' : undefined}
      {...props}
    >
      {title && <title id="title">{title}</title>}
      {description && <desc id="desc">{description}</desc>}
      {props.children}
    </motion.svg>
  );
}); 