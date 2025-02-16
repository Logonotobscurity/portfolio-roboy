import { glob } from 'glob';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Normalize FFmpeg path for cross-platform support
const ffmpegPath = path.normalize(ffmpegInstaller.path);
ffmpeg.setFfmpegPath(ffmpegPath);

const inputDir = path.join(__dirname, '../public/videos');
const outputDir = path.join(__dirname, '../public/videos/optimized');
const tempDir = path.join(os.tmpdir(), 'video-optimization');

// Video optimization settings per platform
const VIDEO_SETTINGS = {
  mp4: os.platform() === 'win32' 
    ? '-c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart'
    : '-c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart -threads 0',
  webm: os.platform() === 'win32'
    ? '-c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 96k'
    : '-c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus -b:a 96k -row-mt 1 -threads 0'
};

async function ensureDirectoryExists(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function cleanupTempFiles() {
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (error) {
    console.warn('Warning: Failed to cleanup temp files:', error.message);
  }
}

async function optimizeVideo(inputPath) {
  const filename = path.basename(inputPath);
  const outputPath = path.join(outputDir, filename);
  const tempPath = path.join(tempDir, `temp-${filename}`);

  // Ensure directories exist
  await Promise.all([
    ensureDirectoryExists(outputDir),
    ensureDirectoryExists(tempDir)
  ]);

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
    const ext = path.extname(filename).toLowerCase();
    const format = ext === '.webm' ? 'webm' : 'mp4';
    
    ffmpeg(inputPath)
      .outputOptions(VIDEO_SETTINGS[format].split(' '))
      .output(tempPath)
      .on('end', async () => {
        try {
          // Atomic move of temp file to final destination
          await fs.rename(tempPath, outputPath);
          console.log(`✅ Optimized: ${filename}`);
          resolve();
        } catch (error) {
          reject(new Error(`Failed to move temp file: ${error.message}`));
        }
      })
      .on('error', (err) => {
        console.error(`❌ Error optimizing ${filename}:`, err);
        reject(err);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\rProcessing: ${filename} - ${Math.round(progress.percent)}%`);
        }
      })
      .run();
  });
}

async function main() {
  try {
    // Ensure clean start
    await cleanupTempFiles();

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

    // Process videos with concurrency limit
    const concurrency = Math.max(1, Math.min(os.cpus().length - 1, 4));
    const chunks = [];
    
    for (let i = 0; i < videos.length; i += concurrency) {
      chunks.push(videos.slice(i, i + concurrency));
    }

    for (const chunk of chunks) {
      await Promise.all(chunk.map(video => optimizeVideo(video)));
    }

    console.log('\n✨ Video optimization complete!');
  } catch (error) {
    console.error('❌ Error during video optimization:', error);
    process.exit(1);
  } finally {
    await cleanupTempFiles();
  }
}

// Handle cleanup on process exit
process.on('SIGINT', async () => {
  console.log('\n🧹 Cleaning up...');
  await cleanupTempFiles();
  process.exit(0);
});

main(); 