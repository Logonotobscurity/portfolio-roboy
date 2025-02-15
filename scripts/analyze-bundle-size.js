#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const gzipSize = require('gzip-size');
const brotliSize = require('brotli-size');
const prettyBytes = require('pretty-bytes');

// Size limits in bytes
const LIMITS = {
  INDIVIDUAL_CHUNK: 500 * 1024, // 500KB
  TOTAL_JS: 2 * 1024 * 1024, // 2MB
  TOTAL_CSS: 100 * 1024, // 100KB
  TOTAL_ASSETS: 5 * 1024 * 1024 // 5MB
};

async function getFileStats(filePath) {
  const content = fs.readFileSync(filePath);
  const stats = fs.statSync(filePath);
  
  return {
    path: filePath,
    size: stats.size,
    gzip: await gzipSize(content),
    brotli: await brotliSize.sync(content)
  };
}

async function analyzeDirectory(dir) {
  const files = fs.readdirSync(dir);
  const stats = [];
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      stats.push(...await analyzeDirectory(filePath));
    } else {
      stats.push(await getFileStats(filePath));
    }
  }
  
  return stats;
}

function printStats(stats) {
  console.log(chalk.blue.bold('\nBundle Size Analysis:'));
  console.log(chalk.gray('='.repeat(50)));
  
  // Group by file type
  const jsFiles = stats.filter(s => s.path.endsWith('.js'));
  const cssFiles = stats.filter(s => s.path.endsWith('.css'));
  const assetFiles = stats.filter(s => /\.(png|jpg|svg|gif|woff2?)$/i.test(s.path));
  
  // Calculate totals
  const totalJS = jsFiles.reduce((sum, f) => sum + f.size, 0);
  const totalCSS = cssFiles.reduce((sum, f) => sum + f.size, 0);
  const totalAssets = assetFiles.reduce((sum, f) => sum + f.size, 0);
  
  // Print individual file sizes
  console.log(chalk.yellow.bold('\nJavaScript Chunks:'));
  jsFiles.forEach(file => {
    const isOverLimit = file.size > LIMITS.INDIVIDUAL_CHUNK;
    const sizeStr = prettyBytes(file.size);
    const gzipStr = prettyBytes(file.gzip);
    const brotliStr = prettyBytes(file.brotli);
    
    console.log(
      chalk[isOverLimit ? 'red' : 'green'](
        `${path.basename(file.path)}: ${sizeStr} (gzip: ${gzipStr}, brotli: ${brotliStr})`
      )
    );
  });
  
  console.log(chalk.yellow.bold('\nCSS Files:'));
  cssFiles.forEach(file => {
    console.log(chalk.green(
      `${path.basename(file.path)}: ${prettyBytes(file.size)} (gzip: ${prettyBytes(file.gzip)})`
    ));
  });
  
  // Print summary
  console.log(chalk.gray('\n' + '='.repeat(50)));
  console.log(chalk.blue.bold('\nTotal Sizes:'));
  console.log(chalk[totalJS > LIMITS.TOTAL_JS ? 'red' : 'green'](
    `Total JavaScript: ${prettyBytes(totalJS)}`
  ));
  console.log(chalk[totalCSS > LIMITS.TOTAL_CSS ? 'red' : 'green'](
    `Total CSS: ${prettyBytes(totalCSS)}`
  ));
  console.log(chalk[totalAssets > LIMITS.TOTAL_ASSETS ? 'red' : 'green'](
    `Total Assets: ${prettyBytes(totalAssets)}`
  ));
  
  // Check limits
  const violations = [];
  if (totalJS > LIMITS.TOTAL_JS) {
    violations.push(`Total JavaScript size (${prettyBytes(totalJS)}) exceeds limit (${prettyBytes(LIMITS.TOTAL_JS)})`);
  }
  if (totalCSS > LIMITS.TOTAL_CSS) {
    violations.push(`Total CSS size (${prettyBytes(totalCSS)}) exceeds limit (${prettyBytes(LIMITS.TOTAL_CSS)})`);
  }
  if (totalAssets > LIMITS.TOTAL_ASSETS) {
    violations.push(`Total assets size (${prettyBytes(totalAssets)}) exceeds limit (${prettyBytes(LIMITS.TOTAL_ASSETS)})`);
  }
  
  jsFiles.forEach(file => {
    if (file.size > LIMITS.INDIVIDUAL_CHUNK) {
      violations.push(
        `Chunk ${path.basename(file.path)} (${prettyBytes(file.size)}) exceeds limit (${prettyBytes(LIMITS.INDIVIDUAL_CHUNK)})`
      );
    }
  });
  
  if (violations.length > 0) {
    console.log(chalk.red.bold('\n❌ Size Limit Violations:'));
    violations.forEach(v => console.log(chalk.red(`- ${v}`)));
    process.exit(1);
  }
  
  console.log(chalk.green.bold('\n✨ All size checks passed!'));
}

async function main() {
  try {
    const distPath = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      console.error(chalk.red('❌ dist directory not found. Run build first.'));
      process.exit(1);
    }
    
    const stats = await analyzeDirectory(distPath);
    printStats(stats);
  } catch (error) {
    console.error(chalk.red('❌ Analysis failed:'), error);
    process.exit(1);
  }
}

main(); 