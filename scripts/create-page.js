import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createPage(pageName) {
  if (!pageName) {
    console.error('Please provide a page name');
    process.exit(1);
  }

  // Convert to proper case format
  const componentName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
  const folderName = pageName.toLowerCase();
  
  const pagesDir = join(__dirname, '../src/pages');
  const pageDir = join(pagesDir, folderName);
  const pageFile = join(pageDir, `${componentName}.tsx`);
  const indexFile = join(pageDir, 'index.ts');

  try {
    // Create directory
    await fs.mkdir(pageDir, { recursive: true });

    // Read template
    const templateContent = await fs.readFile(
      join(pagesDir, 'page-template.tsx'),
      'utf8'
    );

    // Create page component
    const pageContent = templateContent
      .replace('PageTemplate', componentName)
      .replace('{ title, description }', '{ title = "' + componentName + '", description }');

    // Create files
    await fs.writeFile(pageFile, pageContent);
    await fs.writeFile(indexFile, `export { default } from './${componentName}';\n`);

    console.log(`✨ Created new page: ${componentName}`);
    console.log(`   - ${pageFile}`);
    console.log(`   - ${indexFile}`);
  } catch (error) {
    console.error('Error creating page:', error);
    process.exit(1);
  }
}

// Get page name from command line argument
const pageName = process.argv[2];
createPage(pageName); 