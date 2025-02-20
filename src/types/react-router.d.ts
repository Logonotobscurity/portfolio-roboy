import { ComponentType, ReactNode } from 'react';

declare module 'react-router-dom' {
  export interface RouteObject {
    path: string;
    element?: ReactNode;
    children?: RouteObject[];
    index?: boolean;
  }

  export interface LinkProps {
    to: string;
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    state?: any;
  }

  export interface BrowserRouterProps {
    children?: ReactNode;
    basename?: string;
  }

  export interface RouteProps {
    path?: string;
    element?: ReactNode;
    children?: ReactNode;
  }

  export const Link: ComponentType<LinkProps>;
  export const BrowserRouter: ComponentType<BrowserRouterProps>;
  export const Route: ComponentType<RouteProps>;
  export const Routes: ComponentType<{ children?: ReactNode }>;

  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: any;
  };

  export function useNavigate(): (to: string | number, options?: { replace?: boolean; state?: any }) => void;
  export function useParams<T extends Record<string, string | undefined>>(): T;
} 