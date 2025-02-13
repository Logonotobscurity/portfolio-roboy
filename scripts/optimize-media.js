import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { promises as fs } from 'fs';
import { optimize } from 'svgo';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const QUALITY = {
  jpg: 80,
  webp: 75,
  avif: 65
};

const MAX_WIDTH = 1920;
const GENERATE_FORMATS = ['webp', 'avif'];
const VIDEO_FORMATS = ['mp4', 'webm'];

// Video optimization settings
const VIDEO_SETTINGS = {
  mp4: '-c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k',
  webm: '-c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 96k'
};

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
    const basePath = inputPath.replace(/\.[^/.]+$/, '');
    await ensureDirectoryExists(basePath);
    
    const image = sharp(inputPath, { failOnError: false });
    const metadata = await image.metadata();

    if (!metadata) {
      console.warn(`⚠️ Could not read metadata for ${path.basename(inputPath)}`);
      return;
    }

    // Calculate dimensions maintaining aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }

    const resizedImage = image.resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true
    });

    // Generate optimized versions
    const tasks = [];

    // Original format optimization
    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      tasks.push({
        format: 'jpg',
        promise: resizedImage
          .jpeg({ 
            quality: QUALITY.jpg, 
            mozjpeg: true,
            chromaSubsampling: '4:4:4'
          })
          .toFile(`${basePath}.jpg`)
      });
    } else if (metadata.format === 'png') {
      tasks.push({
        format: 'png',
        promise: resizedImage
          .png({ 
            quality: QUALITY.jpg,
            compressionLevel: 9,
            palette: true
          })
          .toFile(`${basePath}.png`)
      });
    }

    // Additional formats
    for (const format of GENERATE_FORMATS) {
      const outputPath = `${basePath}.${format}`;
      if (format === 'webp') {
        tasks.push({
          format,
          promise: resizedImage
            .webp({ 
              quality: QUALITY.webp,
              effort: 6,
              smartSubsample: true
            })
            .toFile(outputPath)
        });
      } else if (format === 'avif') {
        tasks.push({
          format,
          promise: resizedImage
            .avif({ 
              quality: QUALITY.avif,
              effort: 9,
              chromaSubsampling: '4:4:4'
            })
            .toFile(outputPath)
        });
      }
    }

    // Process all formats
    for (const { format, promise } of tasks) {
      try {
        await promise;
        console.log(`✓ Generated ${format.toUpperCase()}: ${path.basename(inputPath)}`);
      } catch (error) {
        console.warn(`⚠️ Failed to generate ${format} for ${path.basename(inputPath)}:`, error.message);
      }
    }

  } catch (error) {
    console.warn(`⚠️ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeVideo(inputPath) {
  try {
    const basePath = inputPath.replace(/\.[^/.]+$/, '');
    await ensureDirectoryExists(basePath);

    for (const format of VIDEO_FORMATS) {
      const outputPath = `${basePath}.${format}`;
      if (outputPath === inputPath) continue;

      try {
        const command = `ffmpeg -i "${inputPath}" ${VIDEO_SETTINGS[format]} "${outputPath}"`;
        await execAsync(command);
        console.log(`✓ Generated ${format.toUpperCase()}: ${path.basename(outputPath)}`);
      } catch (error) {
        console.warn(`⚠️ Failed to generate ${format} for ${path.basename(inputPath)}:`, error.message);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Error processing video ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeMedia() {
  try {
    // Find all media files
    const images = await glob('public/images/**/*.{jpg,jpeg,png}');
    const videos = await glob('public/images/**/*.{mp4,mov,avi}');

    console.log(`Found ${images.length} images and ${videos.length} videos to optimize`);

    // Process images
    console.log('\nOptimizing images...');
    for (const image of images) {
      await optimizeImage(image);
    }

    // Process videos
    console.log('\nOptimizing videos...');
    for (const video of videos) {
      await optimizeVideo(video);
    }
    
    console.log('\n✨ Media optimization complete!');
  } catch (error) {
    console.error('❌ Error during media optimization:', error.message);
  }
}

// Run the optimization
optimizeMedia(); 