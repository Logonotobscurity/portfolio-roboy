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

async function isGitLFSFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content.toString().startsWith('version https://git-lfs.github.com/spec/');
  } catch (error) {
    console.warn(`Warning: Could not check if ${filePath} is a Git LFS file:`, error.message);
    return false;
  }
}

async function optimizeImage(inputPath) {
  try {
    // Check if the file is a Git LFS pointer
    const isLFS = await isGitLFSFile(inputPath);
    if (isLFS) {
      console.log(`⚠️ Skipping LFS file: ${path.basename(inputPath)}`);
      return;
    }

    const outputPath = inputPath;
    await ensureDirectoryExists(outputPath);
    
    const image = sharp(inputPath, { failOnError: false });
    const metadata = await image.metadata();

    if (!metadata) {
      console.warn(`⚠️ Could not read metadata for ${path.basename(inputPath)}`);
      return;
    }

    // Only resize if image is larger than MAX_WIDTH
    if (metadata.width > MAX_WIDTH) {
      image.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    // Create optimized buffer based on image type
    let buffer;
    const format = metadata.format?.toLowerCase();
    
    try {
      if (format === 'jpeg' || format === 'jpg') {
        buffer = await image.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
      } else if (format === 'png') {
        buffer = await image.png({ quality: QUALITY, compressionLevel: 9 }).toBuffer();
      } else if (format === 'webp') {
        buffer = await image.webp({ quality: QUALITY }).toBuffer();
      } else {
        console.warn(`⚠️ Unsupported format ${format} for ${path.basename(inputPath)}`);
        return;
      }

      // Write the optimized buffer to file
      if (buffer) {
        await fs.writeFile(outputPath, buffer);
        console.log(`✓ Optimized ${path.basename(inputPath)}`);
      }
    } catch (error) {
      console.warn(`⚠️ Failed to optimize ${path.basename(inputPath)}:`, error.message);
    }
  } catch (error) {
    console.warn(`⚠️ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeImages() {
  try {
    const images = await glob('public/**/*.{jpg,jpeg,png,webp}');
    console.log(`Found ${images.length} images to optimize`);

    // Process images sequentially to avoid memory issues
    for (const image of images) {
      await optimizeImage(image).catch(error => {
        console.warn(`⚠️ Failed to process ${image}:`, error.message);
      });
    }
    
    console.log('\n✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error during image optimization:', error.message);
    // Don't exit with error code to prevent build failure
    console.log('\n⚠️ Continuing build despite optimization errors');
  }
}

// Run the optimization
optimizeImages(); 