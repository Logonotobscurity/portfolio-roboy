import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectStructure = {
  src: {
    api: {
      // API related code
      'client.ts': 'export const apiClient = { baseURL: process.env.VITE_API_URL };',
      'types.ts': 'export interface ApiResponse<T> { data: T; status: number; }',
    },
    assets: {
      // Static assets
      icons: {},
      images: {},
      fonts: {},
    },
    components: {
      ui: {
        layout: {},
        feedback: {},
        interactive: {},
        typography: {},
        media: {},
        navigation: {},
        'data-display': {},
        cards: {},
        sections: {},
      },
    },
    config: {
      // Configuration files
      'routes.ts': 'export const API_URL = process.env.VITE_API_URL;',
      'theme.ts': 'export const theme = { primary: "#2D00F7" };',
    },
    hooks: {
      // Custom hooks
      'usePageState.ts': `
import { useState, useEffect } from 'react';

export function usePageState<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  return { state, setState };
}`,
      'useMediaQuery.ts': `
export function useMediaQuery(query: string) {
  // Implementation
}`,
    },
    lib: {
      // Third-party library configurations
      'sentry.ts': `
import * as Sentry from '@sentry/react';

export function initSentry() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.VITE_SENTRY_DSN,
    });
  }
}`,
    },
    providers: {
      // Context providers
      'LoadingProvider.tsx': `
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext<{
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}>({ isLoading: false, setIsLoading: () => {} });

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}`,
    },
    styles: {
      // Global styles
      'globals.css': `
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-primary: 45 0 247;
  }
}`,
      'animations.css': `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`,
    },
    types: {
      // TypeScript type definitions
      'common.ts': `
export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}`,
      'api.ts': `
export interface ApiError {
  message: string;
  code: string;
}`,
    },
    utils: {
      // Utility functions
      'format.ts': `
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}`,
      'validation.ts': `
export function validateEmail(email: string): boolean {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}`,
    },
  },
};

async function createDirectory(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = join(basePath, name);
    
    if (typeof content === 'object' && content !== null) {
      // Create directory
      await fs.mkdir(currentPath, { recursive: true });
      
      // Recursively create subdirectories and files
      await createDirectory(currentPath, content);
    } else if (typeof content === 'string' && name.includes('.')) {
      // Create file with content
      await fs.writeFile(currentPath, content);
    }
  }
}

async function setupProject() {
  try {
    const rootDir = join(__dirname, '..');
    await createDirectory(rootDir, projectStructure);
    console.log('✨ Project structure created successfully!');
  } catch (error) {
    console.error('Error setting up project structure:', error);
    process.exit(1);
  }
}

setupProject(); 