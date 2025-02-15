import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const requiredStructure = {
  src: {
    api: ['client.ts', 'types.ts'],
    assets: ['icons', 'images', 'fonts'],
    components: {
      ui: [
        'layout',
        'feedback',
        'interactive',
        'typography',
        'media',
        'navigation',
        'data-display',
        'cards',
        'sections'
      ]
    },
    config: ['routes.ts', 'theme.ts'],
    hooks: ['usePageState.ts', 'useMediaQuery.ts'],
    lib: ['sentry.ts'],
    pages: [
      'home/Home.tsx',
      'about/About.tsx',
      'gallery/Gallery.tsx',
      'contact/Contact.tsx',
      'not-found/NotFound.tsx',
      'page-template.tsx'
    ],
    providers: ['LoadingProvider.tsx'],
    styles: ['globals.css', 'animations.css'],
    types: ['common.ts', 'api.ts'],
    utils: ['format.ts', 'validation.ts']
  }
};

async function checkPath(basePath, structure) {
  const issues = [];

  for (const [name, content] of Object.entries(structure)) {
    const currentPath = join(basePath, name);

    try {
      await fs.access(currentPath);

      if (Array.isArray(content)) {
        // Check files/directories in the array
        for (const item of content) {
          const itemPath = join(currentPath, item);
          try {
            await fs.access(itemPath);
          } catch {
            issues.push(`Missing: ${itemPath}`);
          }
        }
      } else if (typeof content === 'object') {
        // Recursively check subdirectories
        const subIssues = await checkPath(currentPath, content);
        issues.push(...subIssues);
      }
    } catch {
      issues.push(`Missing: ${currentPath}`);
    }
  }

  return issues;
}

async function validateStructure() {
  try {
    const rootDir = join(__dirname, '..');
    const issues = await checkPath(rootDir, requiredStructure);

    if (issues.length === 0) {
      console.log('✅ Project structure is valid!');
      return true;
    } else {
      console.log('❌ Project structure has issues:');
      issues.forEach(issue => console.log(`  - ${issue}`));
      return false;
    }
  } catch (error) {
    console.error('Error validating project structure:', error);
    return false;
  }
}

// Run validation
validateStructure(); 