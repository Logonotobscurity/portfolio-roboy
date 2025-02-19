import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_DIR = path.join(path.dirname(__dirname), 'src/assets/images');
const OUTPUT_DIR = path.join(path.dirname(__dirname), 'public/images');

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

    // Get all images from input directory
    const files = await fs.readdir(INPUT_DIR);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    console.log(`🔍 Found ${imageFiles.length} images to optimize`);

    // Process each image in all formats and sizes
    const optimizationPromises = imageFiles.flatMap(file => {
      const inputPath = path.join(INPUT_DIR, file);
      const baseName = path.parse(file).name;
      
      return FORMATS.flatMap(format => 
        Object.entries(SIZES).map(([sizeName, dimensions]) => {
          const outputFileName = `${baseName}-${sizeName}.${format}`;
          const outputPath = path.join(OUTPUT_DIR, outputFileName);
          return optimizeImage(inputPath, outputPath, format, dimensions);
        })
      );
    });

    await Promise.all(optimizationPromises);
    console.log('✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
  }
}

processImages();
