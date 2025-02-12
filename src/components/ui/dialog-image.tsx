import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type DialogImageProps = Omit<HTMLMotionProps<"img">, "src" | "alt"> & {
  src: string;
  alt: string;
  className?: string;
};

export function DialogImage({ src, alt, className, style, ...props }: DialogImageProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn('w-full h-full object-cover', className)}
      layoutId={`dialog-image-${src}`}
      style={style || {}}
      {...props}
    />
  );
} 