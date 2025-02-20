declare module 'react' {
  export * from '@types/react';

  export interface ComponentType<P = any> {
    (props: P, context?: any): ReactElement<any, any> | null;
    displayName?: string;
  }

  export type LazyExoticComponent<T extends ComponentType<any>> = {
    $$typeof: symbol;
    _payload: {
      _status: -1 | 0 | 1 | 2;
      _result: T | null;
    };
    _init: () => T;
    default?: T;
  };

  export type FC<P = {}> = FunctionComponent<P>;
  export type FunctionComponent<P = {}> = ComponentType<P>;

  export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key: Key | null;
  }

  export type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<P, any>);
  export type Key = string | number;

  export class Component<P = {}, S = {}> {
    constructor(props: P);
    readonly props: Readonly<P>;
    state: Readonly<S>;
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly context: any;
    readonly refs: { [key: string]: any };
  }

  export const StrictMode: ComponentType<{ children?: ReactNode }>;
  export const Suspense: ComponentType<{ children?: ReactNode; fallback?: ReactNode }>;
  export function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): LazyExoticComponent<T>;

  export type ReactNode = React.ReactNode;
  export type CSSProperties = React.CSSProperties;
  export type TouchEvent = React.TouchEvent;
  export type ErrorInfo = { componentStack: string };
  export type ElementRef<T> = T;
  export type ComponentPropsWithoutRef<T> = Omit<React.ComponentProps<T>, 'ref'>;
  export type HTMLAttributes<T> = React.HTMLAttributes<T> & AriaAttributes & DOMAttributes<T>;
  export type ValidationMap<T> = { [K in keyof T]?: Validator<T[K]> };
  export type WeakValidationMap<T> = { [K in keyof T]?: WeakValidator<T[K]> };
  export type Validator<T> = (props: object, propName: string, componentName: string, location: string, propFullName: string) => Error | null;
  export type WeakValidator<T> = (props: object, propName: string) => Error | null;

  export const memo: <T extends (...args: any[]) => any>(component: T) => T;
  export const useCallback: <T extends (...args: any[]) => any>(
    callback: T,
    deps: ReadonlyArray<any>
  ) => T;
  export const useEffect: (effect: () => void | (() => void), deps?: ReadonlyArray<any>) => void;
  export const useState: <T>(
    initialState: T | (() => T)
  ) => [T, (newState: T | ((prevState: T) => T)) => void];
  export const useRef: <T>(initialValue: T | null) => { current: T | null };
  export const createContext: <T>(defaultValue: T) => React.Context<T>;
  export const useContext: <T>(context: React.Context<T>) => T;
  export const useId: () => string;
  export const useMemo: <T>(factory: () => T, deps: ReadonlyArray<any>) => T;
  export const createElement: typeof React.createElement;
  export const forwardRef: typeof React.forwardRef;

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    layoutId?: string;
  }
}

declare module 'react-router-dom' {
  import { ComponentType, ReactNode } from 'react';

  export interface LinkProps {
    to: string;
    className?: string;
    children?: ReactNode;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    target?: string;
    rel?: string;
    'aria-label'?: string;
    role?: string;
  }

  export interface RouteProps {
    path?: string;
    element?: ReactNode;
    children?: ReactNode;
    index?: boolean;
  }

  export interface NavigateOptions {
    replace?: boolean;
    state?: any;
  }

  export const Link: ComponentType<LinkProps>;
  export const BrowserRouter: ComponentType<{ children?: ReactNode }>;
  export const Routes: ComponentType<{ children?: ReactNode }>;
  export const Route: ComponentType<RouteProps>;
  
  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  };
  
  export function useNavigate(): (to: string, options?: NavigateOptions) => void;
  export function useRouteError(): any;
}

declare module '@radix-ui/react-dialog' {
  export interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
  }

  export interface DialogPortalProps {
    children?: React.ReactNode;
    container?: HTMLElement;
  }

  export const Root: React.FC<DialogProps>;
  export const Trigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  export const Portal: React.FC<DialogPortalProps>;
  export const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const Content: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const Title: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const Description: React.FC<React.HTMLAttributes<HTMLParagraphElement>>;
  export const Close: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

declare module 'framer-motion' {
  import { ComponentType, CSSProperties, ReactNode } from 'react';
  import { HTMLMotionProps } from 'framer-motion';

  export interface MotionProps extends HTMLMotionProps<"div"> {
    layoutId?: string;
  }

  export interface HTMLMotionProps<T extends keyof HTMLElementTagNameMap> extends MotionProps {
    href?: string;
    src?: string;
    alt?: string;
    target?: string;
    rel?: string;
    'aria-label'?: string;
    'aria-expanded'?: boolean;
    role?: string;
  }

  export interface AnimatePresenceProps {
    children?: ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
  }

  export const motion: {
    [K in keyof HTMLElementTagNameMap]: ComponentType<HTMLMotionProps<K>>;
  };

  export const AnimatePresence: ComponentType<AnimatePresenceProps>;
}
