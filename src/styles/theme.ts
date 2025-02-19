export type ThemeMode = 'light' | 'dark';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  secondary: string;
  accent: string;
  surface: string;
  border: string;
  error: string;
  success: string;
}

export const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    primary: '#2563eb',
    background: '#ffffff',
    text: '#1f2937',
    secondary: '#6b7280',
    accent: '#3b82f6',
    surface: '#f3f4f6',
    border: '#e5e7eb',
    error: '#ef4444',
    success: '#22c55e',
  },
  dark: {
    primary: '#3b82f6',
    background: '#111827',
    text: '#f9fafb',
    secondary: '#9ca3af',
    accent: '#60a5fa',
    surface: '#1f2937',
    border: '#374151',
    error: '#f87171',
    success: '#4ade80',
  },
};

export const themeConfig = {
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  transitions: {
    default: '200ms ease-in-out',
  },
}; 