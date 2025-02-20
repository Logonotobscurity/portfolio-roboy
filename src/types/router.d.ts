import { ComponentType } from 'react';

declare module 'react-router-dom' {
  export interface LinkProps {
    to: string;
    replace?: boolean;
    state?: any;
    className?: string;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent) => void;
  }

  export interface BrowserRouterProps {
    basename?: string;
    children?: React.ReactNode;
  }

  export const Link: ComponentType<LinkProps>;
  export const BrowserRouter: ComponentType<BrowserRouterProps>;
  export const useLocation: () => { pathname: string; search: string; hash: string; state: any };
  export const useNavigate: () => (to: string, options?: { replace?: boolean; state?: any }) => void;
  export const useParams: <T extends Record<string, string | undefined>>() => T;
} 