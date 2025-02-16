import { execSync } from 'child_process';
import { validateBuild, optimizeImages, checkBundleSize, validateEnv } from './deploy-utils.js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment variables
dotenv.config();

const DEPLOY_TYPES = {
    PRODUCTION: 'production',
    PREVIEW: 'preview',
    STAGING: 'staging'
};

// Cross-platform directory removal
function removeDir(dirPath) {
    console.log('🧹 Cleaning previous build...');
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
    }
}

// Install dependencies based on lock file presence
function installDependencies() {
    console.log('📦 Installing dependencies...');
    const hasLockFile = fs.existsSync(path.join(process.cwd(), 'package-lock.json'));
    
    if (hasLockFile) {
        console.log('Using clean install with package-lock.json...');
        execSync('npm ci', { stdio: 'inherit' });
    } else {
        console.log('No package-lock.json found, using npm install...');
        execSync('npm install', { stdio: 'inherit' });
    }
}

async function deploy() {
    try {
        const deployType = process.argv[2] || DEPLOY_TYPES.PREVIEW;
        console.log(`🚀 Starting ${deployType} deployment...`);

        // Validate environment with deploy type
        validateEnv(deployType);

        // Clean previous build using cross-platform method
        const distPath = path.join(process.cwd(), 'dist');
        removeDir(distPath);

        // Install dependencies with appropriate method
        installDependencies();

        // Optimize images before build
        optimizeImages();

        // Generate sitemap
        console.log('🗺️ Generating sitemap...');
        execSync('npm run generate-sitemap', { stdio: 'inherit' });

        // Build project
        console.log('🏗️ Building project...');
        const buildEnv = {
            ...process.env,
            NODE_ENV: deployType === DEPLOY_TYPES.PRODUCTION ? 'production' : 'preview',
            VITE_APP_ENV: deployType,
            CI: process.env.CI || 'false'
        };
        execSync('npm run build', { stdio: 'inherit', env: buildEnv });

        // Validate build output
        validateBuild();

        // Check bundle size
        checkBundleSize();

        // Deploy to Netlify
        if (process.env.CI !== 'true' && !process.env.NETLIFY_AUTH_TOKEN) {
            console.warn('⚠️ NETLIFY_AUTH_TOKEN not found. Skipping deployment...');
            console.log('✅ Build completed successfully!');
            return;
        }

        console.log('🚀 Deploying to Netlify...');
        switch (deployType) {
            case DEPLOY_TYPES.PRODUCTION:
                execSync('netlify deploy --prod', { stdio: 'inherit' });
                break;
            case DEPLOY_TYPES.STAGING:
                execSync(`netlify deploy --alias staging-${process.env.GITHUB_SHA || 'local'}`, { stdio: 'inherit' });
                break;
            default:
                execSync(`netlify deploy --alias preview-${Date.now()}`, { stdio: 'inherit' });
        }

        console.log('✅ Deployment successful!');
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1);
    }
}

deploy(); 