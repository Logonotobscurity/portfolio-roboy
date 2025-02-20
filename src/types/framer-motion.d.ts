import { ComponentType, ReactNode, CSSProperties, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';

declare module 'framer-motion' {
  export interface MotionStyle extends CSSProperties {
    x?: number | string;
    y?: number | string;
    rotate?: number;
    scale?: number;
    opacity?: number;
    transformOrigin?: string;
  }

  export interface MotionTransition {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    repeat?: number;
    repeatType?: string;
    repeatDelay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    times?: number[];
    staggerChildren?: number;
    delayChildren?: number;
  }

  export interface MotionVariants {
    [key: string]: {
      x?: number | string;
      y?: number | string;
      rotate?: number;
      scale?: number;
      opacity?: number;
      transition?: MotionTransition;
    };
  }

  export interface MotionProps {
    children?: ReactNode;
    className?: string;
    style?: MotionStyle;
    initial?: MotionStyle | string;
    animate?: MotionStyle | string;
    exit?: MotionStyle | string;
    transition?: MotionTransition;
    variants?: MotionVariants;
    whileHover?: MotionStyle | string;
    whileTap?: MotionStyle | string;
    whileInView?: MotionStyle | string;
    viewport?: {
      once?: boolean;
      margin?: string;
      amount?: number | "some" | "all";
    };
    layoutId?: string;
    layout?: boolean | "position" | "size";
    drag?: boolean | "x" | "y";
    dragConstraints?: {
      top?: number;
      right?: number;
      bottom?: number;
      left?: number;
    };
    key?: string | number;
  }

  export interface HTMLMotionProps<T extends keyof HTMLMotionComponents> extends MotionProps {
    onClick?: (event: React.MouseEvent<HTMLMotionComponents[T]>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLMotionComponents[T]>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLMotionComponents[T]>) => void;
    href?: string;
    target?: string;
    rel?: string;
    src?: string;
    alt?: string;
    role?: string;
    'aria-label'?: string;
  }

  export interface AnimatePresenceProps {
    children?: ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }

  export interface HTMLMotionComponents {
    div: HTMLDivElement;
    span: HTMLSpanElement;
    p: HTMLParagraphElement;
    a: HTMLAnchorElement;
    button: HTMLButtonElement;
    img: HTMLImageElement;
  }

  export type MotionComponent<T extends keyof HTMLMotionComponents> = ForwardRefExoticComponent<
    PropsWithoutRef<HTMLMotionProps<T>> & RefAttributes<HTMLMotionComponents[T]>
  >;

  export const motion: {
    [K in keyof HTMLMotionComponents]: MotionComponent<K>;
  };

  export const AnimatePresence: ComponentType<AnimatePresenceProps>;
} 