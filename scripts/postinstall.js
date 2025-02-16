import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  console.log('Running postinstall script...');
  
  // Set environment variables for Sharp
  process.env.SHARP_IGNORE_GLOBAL_LIBVIPS = '1';
  process.env.SHARP_DIST_BASE_URL = 'https://npmmirror.com/mirrors/sharp';
  
  if (process.env.CI) {
    console.log('Running in CI environment...');
    // Install build essentials in CI environment
    if (process.platform === 'linux') {
      console.log('Installing build dependencies...');
      execSync('apt-get update && apt-get install -y build-essential');
    }
  }
  
  console.log('Postinstall completed successfully');
} catch (error) {
  console.error('Postinstall script failed:', error);
  process.exit(1);
} 