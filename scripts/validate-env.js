#!/usr/bin/env node

import { execSync } from 'child_process';
import semver from 'semver';
import chalk from 'chalk';

const REQUIRED_ENV_VARS = [
  'VITE_APP_TITLE',
  'VITE_API_URL',
  'VITE_SENTRY_DSN',
  'VITE_ENABLE_ERROR_TRACKING'
];

const REQUIRED_DIRECTORIES = [
  'src/components/ui/core',
  'src/components/ui/feedback',
  'src/components/ui/layout',
  'src/components/ui/navigation',
  'src/components/ui/sections',
  'src/components/ui/interactive',
  'src/components/ui/media',
  'src/components/ui/data-display',
  'src/components/ui/typography',
  'src/components/ui/branding'
];

const requiredVersions = {
  node: '>=20.0.0',
  npm: '>=10.0.0'
};

function validateVersion(type, currentVersion, requiredVersion) {
  if (!semver.satisfies(currentVersion, requiredVersion)) {
    console.error(
      chalk.red(
        `Error: ${type} version ${currentVersion} does not satisfy required version ${requiredVersion}`
      )
    );
    process.exit(1);
  }
  console.log(
    chalk.green(`✓ ${type} version ${currentVersion} satisfies ${requiredVersion}`)
  );
}

function validateEnvVars() {
  console.log(chalk.blue('Validating environment variables...'));
  const missingVars = REQUIRED_ENV_VARS.filter(envVar => !process.env[envVar]);
  
  if (missingVars.length > 0) {
    console.error(chalk.red('❌ Missing required environment variables:'));
    missingVars.forEach(variable => {
      console.error(chalk.red(`   - ${variable}`));
    });
    process.exit(1);
  }
  
  console.log(chalk.green('✓ Environment variables validated'));
}

function validateDirectoryStructure() {
  console.log(chalk.blue('Validating directory structure...'));
  const missingDirs = REQUIRED_DIRECTORIES.filter(dir => {
    const fullPath = path.join(process.cwd(), dir);
    return !fs.existsSync(fullPath);
  });
  
  if (missingDirs.length > 0) {
    console.error(chalk.red('❌ Missing required directories:'));
    missingDirs.forEach(dir => {
      console.error(chalk.red(`   - ${dir}`));
    });
    process.exit(1);
  }
  
  console.log(chalk.green('✓ Directory structure validated'));
}

function validateDependencies() {
  console.log(chalk.blue('Validating dependencies...'));
  const packageJson = require(path.join(process.cwd(), 'package.json'));
  
  const requiredDeps = [
    'react',
    'react-dom',
    'react-router-dom',
    '@tanstack/react-query',
    '@tanstack/react-router',
    'framer-motion',
    'tailwindcss',
    'lucide-react'
  ];
  
  const missingDeps = requiredDeps.filter(dep => {
    return !packageJson.dependencies[dep] && !packageJson.devDependencies[dep];
  });
  
  if (missingDeps.length > 0) {
    console.error(chalk.red('❌ Missing required dependencies:'));
    missingDeps.forEach(dep => {
      console.error(chalk.red(`   - ${dep}`));
    });
    process.exit(1);
  }
  
  console.log(chalk.green('✓ Dependencies validated'));
}

function validateTypeScript() {
  console.log(chalk.blue('Validating TypeScript configuration...'));
  const tsConfig = require(path.join(process.cwd(), 'tsconfig.json'));
  
  const requiredCompilerOptions = [
    'strict',
    'esModuleInterop',
    'skipLibCheck',
    'forceConsistentCasingInFileNames',
    'noEmit',
    'jsx'
  ];
  
  const missingOptions = requiredCompilerOptions.filter(option => {
    return !tsConfig.compilerOptions[option];
  });
  
  if (missingOptions.length > 0) {
    console.error(chalk.red('❌ Missing required TypeScript compiler options:'));
    missingOptions.forEach(option => {
      console.error(chalk.red(`   - ${option}`));
    });
    process.exit(1);
  }
  
  // Validate include/exclude patterns
  if (!tsConfig.include?.includes('src')) {
    console.error(chalk.red('❌ TypeScript configuration must include "src" directory'));
    process.exit(1);
  }
  
  console.log(chalk.green('✓ TypeScript configuration validated'));
}

try {
  validateEnvVars();
  validateDirectoryStructure();
  validateDependencies();
  validateTypeScript();

  // Validate Node.js version
  const nodeVersion = process.version.replace('v', '');
  validateVersion('Node.js', nodeVersion, requiredVersions.node);

  // Validate npm version
  const npmVersion = execSync('npm --version').toString().trim();
  validateVersion('npm', npmVersion, requiredVersions.npm);

  // Validate sharp installation
  try {
    const sharpVersion = execSync('npm list sharp --depth=0').toString();
    if (sharpVersion.includes('sharp@')) {
      console.log(chalk.green('✓ sharp is installed correctly'));
    } else {
      throw new Error('sharp not found');
    }
  } catch (error) {
    console.error(
      chalk.red('Error: sharp is not installed correctly. Please run npm rebuild sharp')
    );
    process.exit(1);
  }

  // Validate FFmpeg installation
  try {
    execSync('ffmpeg -version');
    console.log(chalk.green('✓ FFmpeg is installed correctly'));
  } catch (error) {
    console.error(
      chalk.red('Error: FFmpeg is not installed correctly. Please install FFmpeg')
    );
    process.exit(1);
  }

  console.log(chalk.green.bold('✨ All validations passed!'));
} catch (error) {
  console.error(chalk.red('❌ Validation failed:'), error);
  process.exit(1);
} 