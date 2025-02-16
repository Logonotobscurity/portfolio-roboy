import { Handler } from '@netlify/functions';
import sharp from 'sharp';

interface ImageProcessRequest {
  imageUrl: string;
  width?: number;
  height?: number;
  format?: string;
}

export const handler: Handler = async (event) => {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' }),
      };
    }

    // Parse the incoming request body
    const { imageUrl, width, height, format } = JSON.parse(event.body || '{}') as ImageProcessRequest;

    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Image URL is required' }),
      };
    }

    // Fetch the image
    const response = await fetch(imageUrl);
    const imageBuffer = await response.arrayBuffer();

    // Process the image with Sharp
    let processedImage = sharp(Buffer.from(imageBuffer));

    // Resize if dimensions are provided
    if (width || height) {
      processedImage = processedImage.resize(width || null, height || null, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      });
    }

    // Convert to specified format or default to webp
    const outputFormat = format || 'webp';
    processedImage = processedImage.toFormat(outputFormat as keyof sharp.FormatEnum, {
      quality: 80,
      effort: 6
    });

    // Get the processed buffer
    const outputBuffer = await processedImage.toBuffer();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': `image/${outputFormat}`,
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      body: outputBuffer.toString('base64'),
      isBase64Encoded: true
    };
  } catch (error) {
    console.error('Image processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process image' }),
    };
  }
}; 