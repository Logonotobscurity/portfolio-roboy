import ffmpeg from 'fluent-ffmpeg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = join(__dirname, '../public/videos/hero-intro.mp4');
const outputPath = join(__dirname, '../public/videos/optimized/hero-intro.mp4');

ffmpeg()
  .input(inputPath)
  .outputOptions([
    '-c:v libx264',     // Video codec
    '-crf 23',          // Constant Rate Factor (18-28 is good, lower means better quality)
    '-preset medium',    // Encoding speed preset
    '-c:a aac',         // Audio codec
    '-b:a 128k',        // Audio bitrate
    '-movflags +faststart', // Enable fast start for web playback
  ])
  .output(outputPath)
  .on('end', () => {
    console.log('Video optimization completed!');
  })
  .on('error', (err) => {
    console.error('An error occurred:', err.message);
  })
  .run(); 