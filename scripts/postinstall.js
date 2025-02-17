import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runPostInstall() {
  console.log('Running postinstall script...');

  try {
    // Ensure required directories exist
    const dirs = [
      'public',
      'public/images',
      'src/assets/images',
      'netlify/functions'
    ];

    for (const dir of dirs) {
      await fs.mkdir(dir, { recursive: true });
    }

    // Check if .env file exists, if not create from example
    try {
      await fs.access('.env');
    } catch {
      const envExample = await fs.readFile('.env.example', 'utf-8');
      await fs.writeFile('.env', envExample);
      console.log('✅ Created .env file from .env.example');
    }

    // Install additional dependencies if needed
    if (process.env.NODE_ENV === 'development') {
      try {
        execSync('npm install -D @types/sharp @types/node', { stdio: 'inherit' });
        console.log('✅ Installed development dependencies');
      } catch (error) {
        console.warn('⚠️ Failed to install some dev dependencies:', error.message);
      }
    }

    console.log('✨ Postinstall completed successfully');
  } catch (error) {
    console.error('❌ Error during postinstall:', error);
    process.exit(1);
  }
}

runPostInstall();
