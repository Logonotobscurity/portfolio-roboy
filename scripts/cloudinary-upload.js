import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET,
});

// Update input directory to public/images folder
const INPUT_DIR = path.join(path.dirname(__dirname), 'public', 'images');

async function uploadToCloudinary(filePath, publicId, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Upload with optimized settings
      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        resource_type: 'auto',
        // Enable automatic format and quality optimization
        fetch_format: 'auto',
        quality: 'auto',
        // Enable responsive breakpoints
        responsive_breakpoints: {
          create_derived: true,
          bytes_step: 20000,
          min_width: 200,
          max_width: 1920,
          max_images: 5,
          transformation: {
            crop: 'fill',
            gravity: 'auto'
          }
        },
        // Enable automatic content-aware cropping
        gravity: 'auto',
        // Enable automatic color space optimization
        color_space: 'srgb',
        // Enable automatic metadata stripping
        strip: true,
        // Enable eager transformations for common sizes
        eager: [
          { width: 400, height: 300, crop: "fill", gravity: "auto" },
          { width: 800, height: 600, crop: "fill", gravity: "auto" },
          { width: 1200, height: 900, crop: "fill", gravity: "auto" }
        ],
        // Enable automatic format selection
        eager_async: true,
        // Enable automatic backup
        backup: true,
        // Add folder structure to keep organization
        folder: `images/${path.relative(INPUT_DIR, path.dirname(filePath)).replace(/\\/g, '/')}`,
        // Increase timeout to 60 seconds
        timeout: 60000
      });

      console.log(`✅ Uploaded: ${path.basename(filePath)}`);
      console.log(`   Public ID: ${result.public_id}`);
      console.log(`   URL: ${result.secure_url}`);
      
      // Generate optimized URLs for different use cases
      const optimizedUrl = cloudinary.url(result.public_id, {
        fetch_format: 'auto',
        quality: 'auto'
      });

      const thumbnailUrl = cloudinary.url(result.public_id, {
        width: 300,
        height: 300,
        crop: 'fill',
        gravity: 'auto',
        fetch_format: 'auto',
        quality: 'auto'
      });

      return {
        ...result,
        optimizedUrl,
        thumbnailUrl
      };
    } catch (error) {
      if (attempt === retries) {
        console.error(`❌ Error uploading ${filePath} after ${retries} attempts:`, error);
        return null;
      }
      console.log(`⚠️ Attempt ${attempt} failed for ${path.basename(filePath)}, retrying...`);
      // Wait for a short time before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
}

async function processImages() {
  try {
    // Ensure input directory exists
    await fs.access(INPUT_DIR);

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
      /\.(jpg|jpeg|png|gif|webp|avif|mp4|webm|mov)$/i.test(file)
    );

    console.log(`🔍 Found ${imageFiles.length} files to upload in ${INPUT_DIR}`);

    // Process files in batches of 10
    const BATCH_SIZE = 10;
    const results = [];
    
    for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
      const batch = imageFiles.slice(i, i + BATCH_SIZE);
      console.log(`\n📦 Processing batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(imageFiles.length/BATCH_SIZE)}`);
      
      // Process each file in the current batch
      const batchPromises = batch.map(async (file) => {
        const relativePath = path.relative(INPUT_DIR, file);
        // Use the relative path without extension as the public ID to maintain folder structure
        const publicId = path.join(
          path.parse(relativePath).name
        ).replace(/\\/g, '/');
        
        return uploadToCloudinary(file, publicId);
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add a small delay between batches to avoid rate limiting
      if (i + BATCH_SIZE < imageFiles.length) {
        console.log('⏳ Waiting before processing next batch...');
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    const successful = results.filter(Boolean).length;

    console.log('\n✨ Upload complete!');
    console.log(`📊 Successfully uploaded ${successful} of ${imageFiles.length} files`);

    // Generate a mapping file for the uploaded assets
    const mapping = results
      .filter(Boolean)
      .reduce((acc, result) => {
        // Store paths relative to /images for easier reference
        const key = `images/${result.public_id}`;
        acc[key] = {
          url: result.secure_url,
          optimizedUrl: result.optimizedUrl,
          thumbnailUrl: result.thumbnailUrl,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          breakpoints: result.responsive_breakpoints?.[0]?.breakpoints || [],
          eager: result.eager || []
        };
        return acc;
      }, {});

    // Save the mapping to a file
    const mappingPath = path.join(path.dirname(__dirname), 'src/config/cloudinaryAssets.json');
    await fs.mkdir(path.dirname(mappingPath), { recursive: true });
    await fs.writeFile(mappingPath, JSON.stringify(mapping, null, 2));
    console.log(`📝 Asset mapping saved to ${mappingPath}`);

  } catch (error) {
    console.error('❌ Error processing files:', error);
    process.exit(1);
  }
}

processImages(); 