import React, { createContext, useContext, useEffect, useState } from 'react';
import { ThemeMode, themeColors, themeConfig } from '../styles/theme';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof themeColors.light;
  config: typeof themeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'app-theme-preference';

const applyThemeToDOM = (theme: ThemeMode) => {
  // Apply theme to document element
  document.documentElement.setAttribute('data-theme', theme);
  
  // Apply theme colors
  Object.entries(themeColors[theme]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--color-${key}`, value);
  });

  // Apply theme config
  document.documentElement.style.setProperty('--font-family', themeConfig.typography.fontFamily);
  
  // Apply spacing
  Object.entries(themeConfig.spacing).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--spacing-${key}`, value);
  });
  
  // Apply border radius
  Object.entries(themeConfig.borderRadius).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--radius-${key}`, value);
  });
  
  // Apply font sizes
  Object.entries(themeConfig.typography.fontSize).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--font-size-${key}`, value);
  });
  
  // Apply font weights
  Object.entries(themeConfig.typography.fontWeight).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--font-weight-${key}`, value);
  });
  
  // Apply transitions
  document.documentElement.style.setProperty('--transition-default', themeConfig.transitions.default);

  // Also apply theme class to body for easier styling
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    console.log('Theme changed to:', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    applyThemeToDOM(theme);

    // Verify CSS variables are set
    const styles = getComputedStyle(document.documentElement);
    console.log('Current theme variables:', {
      background: styles.getPropertyValue('--color-background'),
      text: styles.getPropertyValue('--color-text'),
      primary: styles.getPropertyValue('--color-primary'),
    });
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle theme clicked, current theme:', theme);
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log('Setting new theme to:', newTheme);
      return newTheme;
    });
  };

  const value = {
    theme,
    toggleTheme,
    colors: themeColors[theme],
    config: themeConfig,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 