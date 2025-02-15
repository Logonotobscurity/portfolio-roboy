import type { ImportMetaEnv } from 'vite/client';

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
