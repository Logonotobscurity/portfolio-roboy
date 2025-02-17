const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const INPUT_DIR = 'src/assets/images';
const OUTPUT_DIR = 'public/images';

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(outputPath);

    console.log(`✅ Optimized: ${path.basename(inputPath)}`);
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

    // Process each image
    const optimizationPromises = imageFiles.map(file => {
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(
        OUTPUT_DIR,
        `${path.parse(file).name}.webp`
      );
      return optimizeImage(inputPath, outputPath);
    });

    await Promise.all(optimizationPromises);
    console.log('✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error processing images:', error);
    process.exit(1);
  }
}

processImages();
