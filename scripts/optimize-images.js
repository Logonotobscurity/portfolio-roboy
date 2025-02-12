import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { promises as fs } from 'fs';

const QUALITY = 80;
const MAX_WIDTH = 1920;

async function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

async function optimizeImage(inputPath) {
  try {
    const outputPath = inputPath;
    await ensureDirectoryExists(outputPath);
    
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Only resize if image is larger than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Create optimized buffer based on image type
    let buffer;
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      buffer = await image.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    } else if (metadata.format === 'png') {
      buffer = await image.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
    } else if (metadata.format === 'webp') {
      buffer = await image.webp({ quality: QUALITY }).toBuffer();
    }

    // Write the optimized buffer to file
    if (buffer) {
      await fs.writeFile(outputPath, buffer);
      console.log(`✓ Optimized ${path.basename(inputPath)}`);
    }
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error.message);
  }
}

async function optimizeImages() {
  try {
    const images = await glob('public/**/*.{jpg,jpeg,png,webp}');
    console.log(`Found ${images.length} images to optimize`);

    await Promise.all(images.map(image => optimizeImage(image)));
    console.log('\nImage optimization complete! ✨');
  } catch (error) {
    console.error('Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages(); 