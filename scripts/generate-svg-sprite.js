import { glob } from 'glob';
import { promises as fs } from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { svgoConfig } from './optimize-images.js';

const SOURCE_DIR = 'public/icons';
const OUTPUT_FILE = 'public/sprite.svg';

// Modified SVGO config for sprite generation
const spriteConfig = {
  ...svgoConfig,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeTitle: false,
          removeDesc: false,
          cleanupIds: {
            prefix: {
              toString() {
                this.counter = this.counter || 0;
                return `sprite-${this.counter++}`;
              }
            },
            minify: true
          },
          removeMetadata: true,
          removeComments: true,
          removeEmptyAttrs: true,
          removeEmptyContainers: true,
          mergePaths: true,
          convertPathData: true,
          convertTransform: true,
          cleanupNumericValues: {
            floatPrecision: 2
          }
        }
      }
    },
    {
      name: 'removeDimensions'
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true
      }
    }
  ]
};

async function generateSvgSprite() {
  try {
    // Find all SVG files in the icons directory
    const svgFiles = await glob(`${SOURCE_DIR}/**/*.svg`);
    console.log(`Found ${svgFiles.length} SVG files`);

    if (svgFiles.length === 0) {
      console.log('No SVG files found to process');
      return;
    }

    // Process each SVG file
    const symbols = await Promise.all(
      svgFiles.map(async (file) => {
        const content = await fs.readFile(file, 'utf8');
        const filename = path.basename(file, '.svg');

        // Optimize SVG content
        const result = optimize(content, {
          path: file,
          ...spriteConfig
        });

        if (result.error) {
          console.warn(`⚠️ Failed to optimize ${filename}:`, result.error);
          return '';
        }

        // Convert SVG to symbol
        const symbolContent = result.data
          .replace(/<svg[^>]*>/, `<symbol id="${filename}" viewBox="0 0 24 24">`)
          .replace('</svg>', '</symbol>');

        return symbolContent;
      })
    );

    // Create sprite SVG wrapper
    const spriteContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="display:none">
  ${symbols.join('\n  ')}
</svg>`;

    // Ensure the output directory exists
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

    // Write sprite file
    await fs.writeFile(OUTPUT_FILE, spriteContent, 'utf8');
    console.log(`✓ Generated SVG sprite at ${OUTPUT_FILE}`);

  } catch (error) {
    console.error('❌ Error generating SVG sprite:', error.message);
  }
}

// Run the sprite generation
generateSvgSprite(); 