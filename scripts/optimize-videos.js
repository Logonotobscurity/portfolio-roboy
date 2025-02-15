import { glob } from 'glob';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../public/videos/optimized');

async function optimizeVideo(inputPath) {
  const filename = path.basename(inputPath);
  const outputPath = path.join(outputDir, filename);

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Skip if output file exists and is newer than input
  try {
    const [inputStat, outputStat] = await Promise.all([
      fs.stat(inputPath),
      fs.stat(outputPath).catch(() => null)
    ]);
    
    if (outputStat && outputStat.mtime > inputStat.mtime) {
      console.log(`⏭️ Skipping ${filename} - already optimized`);
      return;
    }
  } catch (error) {
    // Continue if error checking files
  }

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-c:v libx264',     // Use H.264 codec
        '-crf 23',          // Constant Rate Factor (18-28 is good)
        '-preset medium',    // Encoding speed preset
        '-movflags +faststart', // Enable fast start for web playback
        '-profile:v main',   // H.264 profile
        '-level 4.0',       // H.264 level
        '-pix_fmt yuv420p', // Pixel format for maximum compatibility
        '-an'               // Remove audio
      ])
      .output(outputPath)
      .on('end', () => {
        console.log(`✅ Optimized: ${filename}`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`❌ Error optimizing ${filename}:`, err);
        reject(err);
      })
      .run();
  });
}

async function main() {
  try {
    const videos = await glob('**/*.{mp4,webm}', {
      cwd: inputDir,
      ignore: ['optimized/**'],
      absolute: true
    });

    if (videos.length === 0) {
      console.log('ℹ️ No videos found to optimize');
      return;
    }

    console.log(`🎥 Found ${videos.length} videos to optimize...`);

    for (const video of videos) {
      await optimizeVideo(video);
    }

    console.log('✨ Video optimization complete!');
  } catch (error) {
    console.error('❌ Error during video optimization:', error);
    process.exit(1);
  }
}

main(); 