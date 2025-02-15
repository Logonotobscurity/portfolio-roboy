import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { usePreloadOnVisible } from '@/hooks/usePreloadOnVisible';
import { isValidRoute } from '@/config/routes';

interface PreloadLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
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
  const shouldPreload = isValidRoute(to);
  const ref = usePreloadOnVisible(to, preloadOptions);

  return (
    <Link
      ref={shouldPreload ? ref : undefined}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}; 