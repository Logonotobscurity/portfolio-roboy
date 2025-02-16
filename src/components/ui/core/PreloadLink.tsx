import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { usePreloadOnVisible } from '@/hooks/usePreloadOnVisible';
import { RoutePath } from '@/config/routes';

interface PreloadLinkProps extends Omit<LinkProps, 'to'> {
  to: RoutePath;
  preloadOptions?: {
    threshold?: number;
    rootMargin?: string;
  };
}

export const PreloadLink: React.FC<PreloadLinkProps> = ({
  to,
  preloadOptions,
  children,
  ...props
}) => {
  const ref = usePreloadOnVisible<HTMLAnchorElement>(to, preloadOptions);

  return (
    <Link
      ref={ref}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}; 