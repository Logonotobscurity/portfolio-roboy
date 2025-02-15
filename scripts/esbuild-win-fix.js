import { chmod, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = join(__dirname, '..');

const esbuildExe = join(
  projectRoot,
  'node_modules',
  '@esbuild',
  'win32-x64',
  'esbuild.exe'
);

if (existsSync(esbuildExe)) {
  chmod(esbuildExe, 0o755, (err) => {
    if (err) {
      console.error('❌ Error updating esbuild.exe permissions:', err);
    } else {
      console.log('✅ esbuild.exe permissions updated successfully');
    }
  });
} else {
  console.log('⚠️ esbuild.exe not found - skipping permission update');
} 