import { glob } from 'glob';
import path from 'path';
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const QUALITY = {
  h264: '23', // Lower CRF = higher quality (18-28 is good range)
  vp9: '30',  // VP9 uses different scale (30-35 is good range)
};

const MAX_WIDTH = 1920;
const GENERATE_FORMATS = ['webm'];

// Helper function to format bytes to human readable size
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}

async function getVideoMetadata(inputPath) {
  try {
    const { stdout } = await execAsync(
      `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration -of json "${inputPath}"`
    );
    const data = JSON.parse(stdout);
    return data.streams[0];
  } catch (error) {
    console.warn(`⚠️ Failed to get video metadata: ${error.message}`);
    return null;
  }
}

async function optimizeVideo(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    const basePath = inputPath.replace(/\.[^/.]+$/, '');
    const originalSize = (await fs.stat(inputPath)).size;
    
    // Get video metadata
    const metadata = await getVideoMetadata(inputPath);
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

    // Optimize original video to MP4 (h.264)
    const tempPath = `${inputPath}.tmp.mp4`;
    try {
      await execAsync(
        `ffmpeg -i "${inputPath}" -c:v libx264 -crf ${QUALITY.h264} ` +
        `-preset slow -profile:v high -level:v 4.0 ` +
        `-vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" ` +
        `-movflags +faststart -c:a aac -b:a 128k "${tempPath}"`
      );

      // Replace original with optimized version
      await fs.rename(tempPath, inputPath);
      
      const optimizedSize = (await fs.stat(inputPath)).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(
        `✓ Optimized MP4: ${path.basename(inputPath)} ` +
        `(${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, ${savings}% saved)`
      );
    } catch (error) {
      // Clean up temp file if it exists
      try {
        await fs.unlink(tempPath);
      } catch {}
      throw error;
    }

    // Generate WebM version (VP9)
    for (const format of GENERATE_FORMATS) {
      const outputPath = `${basePath}.${format}`;
      try {
        await execAsync(
          `ffmpeg -i "${inputPath}" -c:v libvpx-vp9 -crf ${QUALITY.vp9} -b:v 0 ` +
          `-vf "scale=${width}:${height}:force_original_aspect_ratio=decrease,pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2" ` +
          `-c:a libopus -b:a 128k "${outputPath}"`
        );
        
        const webmSize = (await fs.stat(outputPath)).size;
        console.log(`✓ Generated ${format.toUpperCase()}: ${path.basename(outputPath)} (${formatBytes(webmSize)})`);
      } catch (error) {
        console.warn(`⚠️ Failed to generate ${format.toUpperCase()}: ${error.message}`);
      }
    }

  } catch (error) {
    console.warn(`⚠️ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

async function optimizeVideos() {
  try {
    // Check if ffmpeg is installed
    try {
      await execAsync('ffmpeg -version');
    } catch (error) {
      console.error('❌ FFmpeg is not installed. Please install FFmpeg to optimize videos.');
      console.log('Installation instructions:');
      console.log('- Windows (with Chocolatey): choco install ffmpeg');
      console.log('- macOS (with Homebrew): brew install ffmpeg');
      console.log('- Linux (Ubuntu/Debian): sudo apt-get install ffmpeg');
      return;
    }

    const videos = await glob('public/**/*.{mp4,mov,avi,mkv}');
    console.log(`Found ${videos.length} videos to optimize`);

    // Process videos sequentially to avoid memory issues
    for (const video of videos) {
      await optimizeVideo(video).catch(error => {
        console.warn(`⚠️ Failed to process ${video}:`, error.message);
      });
    }
    
    console.log('\n✨ Video optimization complete!');
  } catch (error) {
    console.error('❌ Error during video optimization:', error.message);
    console.log('\n⚠️ Continuing build despite optimization errors');
  }
}

// Run the optimization
optimizeVideos(); 