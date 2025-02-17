import { promises as fs } from 'fs';
import path from 'path';
import prettier from 'prettier';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://rooboy.netlify.app'; // Replace with your site URL
const PUBLIC_DIR = 'public';

const routes = [
  '/',              // Home
  '/about',         // About
  '/gallery',       // Gallery
  '/contact',       // Contact
  // 404 page is handled by Netlify's not-found handling
];

async function generateSitemap() {
  try {
    const prettierConfig = await prettier.resolveConfig('.prettierrc');

    const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
          .map(route => `
            <url>
              <loc>${SITE_URL}${route}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>${route === '/' ? '1.0' : '0.8'}</priority>
            </url>
          `)
          .join('')}
      </urlset>
    `;

    const formatted = await prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    });

    await fs.mkdir(PUBLIC_DIR, { recursive: true });
    await fs.writeFile(
      path.join(PUBLIC_DIR, 'sitemap.xml'),
      formatted
    );

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
