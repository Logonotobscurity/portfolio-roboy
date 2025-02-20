import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
    custom?: any;
  }

  export interface MotionProps extends HTMLMotionProps<'div'> {
    initial?: any;
    animate?: any;
    exit?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string;
      repeat?: number;
      repeatType?: string;
      times?: number[];
      staggerChildren?: number;
      delayChildren?: number;
      mass?: number;
      stiffness?: number;
      damping?: number;
      type?: string;
    };
    variants?: {
      [key: string]: any;
    };
    layoutId?: string;
  }

  export interface HTMLMotionComponents {
    div: React.ForwardRefExoticComponent<HTMLMotionProps<'div'>>;
    span: React.ForwardRefExoticComponent<HTMLMotionProps<'span'>>;
    p: React.ForwardRefExoticComponent<HTMLMotionProps<'p'>>;
    h1: React.ForwardRefExoticComponent<HTMLMotionProps<'h1'>>;
    h2: React.ForwardRefExoticComponent<HTMLMotionProps<'h2'>>;
    h3: React.ForwardRefExoticComponent<HTMLMotionProps<'h3'>>;
    h4: React.ForwardRefExoticComponent<HTMLMotionProps<'h4'>>;
    h5: React.ForwardRefExoticComponent<HTMLMotionProps<'h5'>>;
    h6: React.ForwardRefExoticComponent<HTMLMotionProps<'h6'>>;
    a: React.ForwardRefExoticComponent<HTMLMotionProps<'a'>>;
    button: React.ForwardRefExoticComponent<HTMLMotionProps<'button'>>;
    img: React.ForwardRefExoticComponent<HTMLMotionProps<'img'>>;
    li: React.ForwardRefExoticComponent<HTMLMotionProps<'li'>>;
  }

  export const motion: HTMLMotionComponents;
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
} 