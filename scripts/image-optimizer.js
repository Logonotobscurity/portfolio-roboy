import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(path.dirname(__dirname), 'src/assets/images');
const OUTPUT_DIR = path.join(path.dirname(__dirname), 'public/images/optimized');

const FORMATS = ['webp', 'avif', 'jpg'];
const SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 800, height: 800 },
  large: { width: 1920, height: 1080 }
};

async function optimizeImage(inputPath, outputPath, format, size) {
  try {
    const pipeline = sharp(inputPath)
      .resize(size.width, size.height, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        pipeline.webp({ 
          quality: 80,
          effort: 6 // Higher compression effort
        });
        break;
      case 'avif':
        pipeline.avif({ 
          quality: 65,
          effort: 9 // Maximum compression effort
        });
        break;
      case 'jpg':
        pipeline.jpeg({ 
          quality: 85,
          progressive: true,
          mozjpeg: true // Use mozjpeg for better compression
        });
        break;
    }

    await pipeline.toFile(outputPath);
    console.log(`✅ Optimized: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error);
  }
}

async function processImages() {
  try {
    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Get all images from input directory recursively
    async function getFiles(dir) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const files = await Promise.all(entries.map(entry => {
        const res = path.resolve(dir, entry.name);
        return entry.isDirectory() ? getFiles(res) : res;
      }));
      return files.flat();
    }

    const allFiles = await getFiles(INPUT_DIR);
    const imageFiles = allFiles.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    );

    console.log(`🔍 Found ${imageFiles.length} images to optimize`);

    // Process each image in all formats and sizes
    const optimizationPromises = imageFiles.map(file => {
      const relativePath = path.relative(INPUT_DIR, file);
      const baseName = path.parse(relativePath).name;
      const dirName = path.dirname(relativePath);
      
      return FORMATS.flatMap(format => 
        Object.entries(SIZES).map(([sizeName, dimensions]) => {
          const outputFileName = `${baseName}-${sizeName}.${format}`;
          const outputPath = path.join(OUTPUT_DIR, dirName, outputFileName);
          // Ensure output directory exists
          fs.mkdir(path.dirname(outputPath), { recursive: true });
          return optimizeImage(file, outputPath, format, dimensions);
        })
      );
    });

    await Promise.all(optimizationPromises.flat());
    console.log('✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
  }
}

processImages();
