import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const componentCategories = {
  layout: ['SectionContainer', 'GridBackground', 'PatternOverlay', 'NoiseOverlay'],
  feedback: ['PageLoading', 'PageError', 'ErrorBoundary'],
  interactive: ['Dialog', 'RetroCard', 'CTACard'],
  typography: ['GlitchText', 'AnimatedText', 'SectionTag', 'ChapterHeading'],
  media: ['ResponsiveImage', 'SpriteIcon', 'SvgIcon', 'VideoHero'],
  navigation: ['Navigation', 'Footer'],
  'data-display': ['MasonryGrid', 'Marquee', 'TimelineContent', 'InstagramFeed', 'BrandLogos', 'BrandCarousel'],
  cards: ['ImageCard', 'StoryCard', 'StatsCard', 'PortfolioCard'],
  sections: ['CulturalImpact', 'PortfolioSection', 'SocialMediaSection', 'FashionStyleSection', 'JourneyTimeline', 'Testimonials']
};

const componentsDir = join(__dirname, '../src/components');
const uiDir = join(componentsDir, 'ui');

async function organizeComponents() {
  try {
    // Create category directories
    await Promise.all(
      Object.keys(componentCategories).map(async (category) => {
        const dir = join(uiDir, category);
        await fs.mkdir(dir, { recursive: true });
      })
    );

    // Move components to their respective directories
    await Promise.all(
      Object.entries(componentCategories).map(async ([category, components]) => {
        await Promise.all(
          components.map(async (component) => {
            const sourceFile = join(componentsDir, `${component}.tsx`);
            const sourceTestFile = join(componentsDir, `${component}.test.tsx`);
            const targetDir = join(uiDir, category);
            const targetFile = join(targetDir, `${component}.tsx`);
            const targetTestFile = join(targetDir, `${component}.test.tsx`);

            try {
              await fs.access(sourceFile);
              await fs.rename(sourceFile, targetFile);
              console.log(`Moved ${component}.tsx to ${category}`);
            } catch (error) {
              if (error.code !== 'ENOENT') {
                console.error(`Error moving ${component}.tsx:`, error);
              }
            }

            try {
              await fs.access(sourceTestFile);
              await fs.rename(sourceTestFile, targetTestFile);
              console.log(`Moved ${component}.test.tsx to ${category}`);
            } catch (error) {
              if (error.code !== 'ENOENT') {
                console.error(`Error moving ${component}.test.tsx:`, error);
              }
            }
          })
        );
      })
    );

    console.log('Component organization completed successfully!');
  } catch (error) {
    console.error('Error organizing components:', error);
    process.exit(1);
  }
}

organizeComponents(); 