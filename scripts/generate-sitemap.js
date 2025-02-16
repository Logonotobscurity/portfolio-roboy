import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

// Add your routes here
const routes = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/projects', changefreq: 'weekly', priority: 0.9 },
    { url: '/contact', changefreq: 'monthly', priority: 0.7 }
];

// Create a stream to write to
const stream = new SitemapStream({ hostname: 'https://rooboy.netlify.app' });

// Return a promise that resolves with your XML string
const sitemap = await Readable.from(routes).pipe(stream);
const data = await streamToBuffer(sitemap);
const writeStream = createWriteStream('./public/sitemap.xml');
writeStream.write(data);
writeStream.end();
console.log('Sitemap generated successfully!');

// Helper function to convert stream to buffer
async function streamToBuffer(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString();
} 