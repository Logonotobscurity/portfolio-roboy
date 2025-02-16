import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Utility to validate build output
export function validateBuild() {
    const requiredFiles = ['index.html', '404.html', 'sitemap.xml'];
    const distPath = path.resolve(process.cwd(), 'dist');
    
    console.log('🔍 Validating build output...');
    
    if (!fs.existsSync(distPath)) {
        throw new Error('❌ dist directory not found!');
    }

    for (const file of requiredFiles) {
        if (!fs.existsSync(path.join(distPath, file))) {
            throw new Error(`❌ Required file ${file} not found in build output!`);
        }
    }
    
    console.log('✅ Build validation successful!');
}

// Utility to optimize images
export function optimizeImages() {
    console.log('🖼️ Optimizing images...');
    try {
        execSync('npm run optimize-images', { stdio: 'inherit' });
        console.log('✅ Image optimization complete!');
    } catch (error) {
        console.warn('⚠️ Image optimization skipped:', error.message);
    }
}

// Utility to check bundle size
export function checkBundleSize() {
    console.log('📦 Checking bundle size...');
    try {
        const stats = JSON.parse(fs.readFileSync('dist/stats.json', 'utf-8'));
        
        const maxBundleSize = 500 * 1024; // 500KB
        const maxTotalSize = 2 * 1024 * 1024; // 2MB
        
        let totalSize = 0;
        const largeFiles = [];
        
        Object.entries(stats.assets).forEach(([file, details]) => {
            totalSize += details.size;
            if (details.size > maxBundleSize) {
                largeFiles.push({ file, size: (details.size / 1024).toFixed(2) + 'KB' });
            }
        });
        
        if (largeFiles.length > 0) {
            console.warn('⚠️ Large bundles detected:');
            largeFiles.forEach(({ file, size }) => {
                console.warn(`   ${file}: ${size}`);
            });
        }
        
        if (totalSize > maxTotalSize) {
            console.warn(`⚠️ Total bundle size (${(totalSize / 1024 / 1024).toFixed(2)}MB) exceeds recommended limit of 2MB`);
        }
    } catch (error) {
        console.warn('⚠️ Bundle size check skipped:', error.message);
    }
    
    console.log('✅ Bundle size check complete!');
}

// Utility to validate environment variables
export function validateEnv(deployType = 'preview') {
    console.log('🔐 Validating environment variables...');
    
    // Set default environment variables based on deploy type
    process.env.NODE_ENV = process.env.NODE_ENV || (deployType === 'production' ? 'production' : 'preview');
    process.env.VITE_APP_ENV = process.env.VITE_APP_ENV || deployType;
    
    const requiredVars = [
        'NODE_ENV',
        'VITE_APP_ENV',
        'NETLIFY_SITE_ID'
    ];
    
    // Only require NETLIFY_AUTH_TOKEN in CI environment
    if (process.env.CI === 'true') {
        requiredVars.push('NETLIFY_AUTH_TOKEN');
    }
    
    const missing = requiredVars.filter(varName => !process.env[varName]);
    
    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:');
        missing.forEach(varName => {
            console.error(`   - ${varName}`);
        });
        console.error('\nPlease ensure these variables are set in your .env file or environment.');
        console.error('For local development, copy .env.example to .env and fill in the values.');
        throw new Error('Missing required environment variables');
    }
    
    console.log('✅ Environment validation successful!');
    console.log('Current environment:');
    console.log(`   NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`   VITE_APP_ENV: ${process.env.VITE_APP_ENV}`);
    console.log(`   Deploy Type: ${deployType}`);
} 