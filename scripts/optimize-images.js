import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import { promises as fs } from 'fs';
import { optimize } from 'svgo';

const QUALITY = {
  jpg: 80,
  webp: 75,
  avif: 65
};
const MAX_WIDTH = 1920;
const GENERATE_FORMATS = ['webp', 'avif'];

// Enhanced SVGO configuration for optimizing SVGs
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeTitle: false,
          removeDesc: false,
          cleanupIds: {
            prefix: {
              toString() {
                this.counter = this.counter || 0;
                return `id-${this.counter++}`;
              }
            },
            minify: true
          },
          removeMetadata: true,
          removeComments: true,
          removeEmptyAttrs: true,
          removeEmptyContainers: true,
          mergePaths: true,
          convertPathData: true,
          convertTransform: true,
          cleanupNumericValues: {
            floatPrecision: 2
          }
        }
      }
    },
    {
      name: 'removeDimensions'
    },
    {
      name: 'removeXMLNS'
    },
    {
      name: 'sortAttrs'
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [
          { 'aria-hidden': 'true' },
          { 'role': 'img' },
          { 'focusable': 'false' }
        ]
      }
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'data-name',
          'baseProfile',
          'version',
          'xml:space',
          'enable-background'
        ]
      }
    },
    {
      name: 'convertColors',
      params: {
        currentColor: true
      }
    }
  ]
};

// Export svgoConfig for use in other scripts
export { svgoConfig };

async function optimizeSvg(inputPath) {
  try {
    const content = await fs.readFile(inputPath, 'utf8');
    
    // Skip if it's a Git LFS file
    if (content.startsWith('version https://git-lfs.github.com/spec/')) {
      console.log(`⚠️ Skipping LFS file: ${path.basename(inputPath)}`);
      return;
    }

    const result = optimize(content, {
      path: inputPath,
      ...svgoConfig
    });

    if (result.error) {
      throw new Error(result.error);
    }

    await fs.writeFile(inputPath, result.data);
    console.log(`✓ Optimized SVG: ${path.basename(inputPath)}`);
  } catch (error) {
    console.warn(`⚠️ Failed to optimize SVG ${path.basename(inputPath)}:`, error.message);
  }
}

async function ensureDirectoryExists(filePath) {
  const directory = path.dirname(filePath);
  try {
    await fs.access(directory);
  } catch {
    await fs.mkdir(directory, { recursive: true });
  }
}

async function isGitLFSFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content.toString().startsWith('version https://git-lfs.github.com/spec/');
  } catch (error) {
    console.warn(`Warning: Could not check if ${filePath} is a Git LFS file:`, error.message);
    return false;
  }
}

async function generateOptimizedVersions(image, metadata, basePath) {
  const results = [];
  const format = metadata.format?.toLowerCase();

  // Only generate JPG version if the original is not already a JPG/JPEG
  if ((format !== 'jpeg' && format !== 'jpg') && (format === 'png' || format === 'webp')) {
    const buffer = await image
      .jpeg({ 
        quality: QUALITY.jpg, 
        mozjpeg: true,
        chromaSubsampling: '4:4:4'
      })
      .toBuffer();
    results.push({ buffer, ext: 'jpg', path: `${basePath}.jpg` });
  } else if (format === 'png') {
    const buffer = await image
      .png({ 
        quality: QUALITY.jpg,
        compressionLevel: 9,
        palette: true
      })
      .toBuffer();
    results.push({ buffer, ext: 'png', path: `${basePath}.png` });
  }

  // Generate additional formats
  for (const newFormat of GENERATE_FORMATS) {
    const outputPath = `${basePath}.${newFormat}`;
    let buffer;

    if (newFormat === 'webp') {
      buffer = await image
        .webp({ 
          quality: QUALITY.webp,
          effort: 6,
          smartSubsample: true
        })
        .toBuffer();
    } else if (newFormat === 'avif') {
      buffer = await image
        .avif({ 
          quality: QUALITY.avif,
          effort: 9,
          chromaSubsampling: '4:4:4'
        })
        .toBuffer();
    }

    if (buffer) {
      results.push({ buffer, ext: newFormat, path: outputPath });
    }
  }

  return results;
}

async function optimizeImage(inputPath) {
  // Handle SVGs separately
  if (path.extname(inputPath).toLowerCase() === '.svg') {
    await optimizeSvg(inputPath);
    return;
  }

  try {
    // Check if the file is a Git LFS pointer
    const isLFS = await isGitLFSFile(inputPath);
    if (isLFS) {
      console.log(`⚠️ Skipping LFS file: ${path.basename(inputPath)}`);
      return;
    }

    const basePath = inputPath.replace(/\.[^/.]+$/, '');
    const ext = path.extname(inputPath).toLowerCase();
    const isJpg = ext === '.jpg' || ext === '.jpeg';
    
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
      image.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // For JPG files, optimize in place using buffer
    if (isJpg) {
      const originalSize = (await fs.stat(inputPath)).size;
      const tempPath = `${inputPath}.tmp`;
      
      try {
        // Optimize JPG and save to temp file
        await image
          .jpeg({ 
            quality: QUALITY.jpg, 
            mozjpeg: true,
            chromaSubsampling: '4:4:4'
          })
          .toFile(tempPath);

        // Atomic replacement of original with optimized version
        await fs.rename(tempPath, inputPath);
        
        const optimizedSize = (await fs.stat(inputPath)).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        console.log(`✓ Optimized JPG: ${path.basename(inputPath)} (${formatBytes(originalSize)} → ${formatBytes(optimizedSize)}, ${savings}% saved)`);
      } catch (error) {
        // Clean up temp file if it exists
        try {
          await fs.unlink(tempPath);
        } catch {}
        throw error;
      }

      // Generate WebP and AVIF versions
      for (const format of GENERATE_FORMATS) {
        const outputPath = `${basePath}.${format}`;
        let buffer;

        if (format === 'webp') {
          buffer = await image
            .webp({ 
              quality: QUALITY.webp,
              effort: 6,
              smartSubsample: true
            })
            .toBuffer();
        } else if (format === 'avif') {
          buffer = await image
            .avif({ 
              quality: QUALITY.avif,
              effort: 9,
              chromaSubsampling: '4:4:4'
            })
            .toBuffer();
        }

        if (buffer) {
          await fs.writeFile(outputPath, buffer);
          console.log(`✓ Generated ${format.toUpperCase()}: ${path.basename(basePath)}.${format}`);
        }
      }
    } else {
      // For non-JPG files, proceed with normal optimization
      await ensureDirectoryExists(basePath);

      // Generate optimized versions
      const versions = await generateOptimizedVersions(image, metadata, basePath);

      // Write all versions
      for (const { buffer, ext, path: outputPath } of versions) {
        await fs.writeFile(outputPath, buffer);
        console.log(`✓ Generated ${ext.toUpperCase()}: ${path.basename(outputPath)}`);
      }
    }

  } catch (error) {
    console.warn(`⚠️ Error processing ${path.basename(inputPath)}:`, error.message);
  }
}

// Helper function to format bytes to human readable size
function formatBytes(bytes, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;
}

async function optimizeImages() {
  try {
    const images = await glob('public/**/*.{jpg,jpeg,png,svg}');
    console.log(`Found ${images.length} images to optimize`);

    // Process images sequentially to avoid memory issues
    for (const image of images) {
      await optimizeImage(image).catch(error => {
        console.warn(`⚠️ Failed to process ${image}:`, error.message);
      });
    }
    
    console.log('\n✨ Image optimization complete!');
  } catch (error) {
    console.error('❌ Error during image optimization:', error.message);
    // Don't exit with error code to prevent build failure
    console.log('\n⚠️ Continuing build despite optimization errors');
  }
}

// Run the optimization
optimizeImages(); 