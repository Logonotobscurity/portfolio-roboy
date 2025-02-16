import { v2 as cloudinary } from 'cloudinary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videoPath = join(__dirname, '../public/videos/optimized/hero-intro.mp4');

// Upload video
async function uploadVideo() {
  try {
    console.log('Starting video upload to Cloudinary...');
    const result = await cloudinary.uploader.upload(videoPath, {
      resource_type: 'video',
      folder: 'portfolio',
      eager: [
        { 
          format: 'mp4',
          video_codec: 'auto',
          quality: 'auto'
        }
      ],
      eager_async: true
    });
    
    console.log('Upload successful!');
    console.log('Video URL:', result.secure_url);
    console.log('Video details:', result);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

uploadVideo().catch(console.error); 