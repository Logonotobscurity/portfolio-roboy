import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pages = [
  {
    name: 'Home',
    path: 'home',
    fileName: 'Home.tsx'
  },
  {
    name: 'About',
    path: 'about',
    fileName: 'About.tsx'
  },
  {
    name: 'Gallery',
    path: 'gallery',
    fileName: 'Gallery.tsx'
  },
  {
    name: 'Contact',
    path: 'contact',
    fileName: 'Contact.tsx'
  },
  {
    name: 'NotFound',
    path: 'not-found',
    fileName: 'NotFound.tsx'
  }
];

const pagesDir = join(__dirname, '../src/pages');

async function createIndexFile(pagePath, componentName) {
  const indexContent = `export { default } from './${componentName}';\n`;
  await fs.writeFile(join(pagePath, 'index.ts'), indexContent);
}

async function organizePage(page) {
  const pagePath = join(pagesDir, page.path);
  const sourceFile = join(pagesDir, page.fileName);
  const targetFile = join(pagePath, page.fileName);

  try {
    // Create directory if it doesn't exist
    await fs.mkdir(pagePath, { recursive: true });

    // Check if source file exists
    try {
      await fs.access(sourceFile);
      
      // Read the source file
      const content = await fs.readFile(sourceFile, 'utf8');
      
      // Create the target file with content
      await fs.writeFile(targetFile, content);
      
      // Create index.ts
      await createIndexFile(pagePath, page.name);
      
      // Remove the source file
      await fs.unlink(sourceFile);
      
      console.log(`✓ Organized ${page.name} page`);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠ Source file for ${page.name} not found, might be already moved`);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error(`✗ Error organizing ${page.name} page:`, error);
  }
}

async function organizePages() {
  try {
    await Promise.all(pages.map(organizePage));
    console.log('\n✨ Page organization completed successfully!');
  } catch (error) {
    console.error('Error organizing pages:', error);
    process.exit(1);
  }
}

organizePages(); 