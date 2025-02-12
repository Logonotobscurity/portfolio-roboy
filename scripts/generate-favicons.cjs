const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const SIZES = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512
};

async function generateFavicons() {
  const inputSvg = path.join(__dirname, '../public/favicon.svg');
  
  try {
    // Read the SVG file
    const svgBuffer = await fs.readFile(inputSvg);
    
    // Generate each size
    for (const [filename, size] of Object.entries(SIZES)) {
      const outputPath = path.join(__dirname, '../public', filename);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated ${filename}`);
    }
    
    // Generate Safari pinned tab SVG (monochrome)
    await fs.copyFile(
      inputSvg,
      path.join(__dirname, '../public/safari-pinned-tab.svg')
    );
    
    console.log('Generated safari-pinned-tab.svg');
    
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons(); 