// Section IDs for consistent usage across pages
export const SECTION_IDS = {
  // Home Page Sections
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  PORTFOLIO: 'portfolio',
  JOURNEY: 'journey',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
  LEGACY: 'legacy',
  CULTURAL_IMPACT: 'cultural-impact',

  // About Page Sections
  STORY: 'story',
  STATS: 'stats',
  FASHION: 'fashion',
  BRAND_COLLABORATIONS: 'brand-collaborations',
  UNIVERSITY_SHOWS: 'university-shows',
  FESTIVALS: 'festivals',
  FUTURE_VISION: 'future-vision',

  // Gallery Page Sections
  GALLERY_HERO: 'gallery-hero',
  GALLERY_GRID: 'gallery-grid',
  CATEGORIES: 'categories',

  // Contact Page Sections
  CONTACT_HERO: 'contact-hero',
  CONTACT_FORM: 'contact-form',
  SOCIAL_LINKS: 'social-links'
} as const;

type SectionId = typeof SECTION_IDS[keyof typeof SECTION_IDS];

// Section display names mapped to their IDs
export const SECTION_NAMES: Record<SectionId, string> = {
  [SECTION_IDS.HERO]: 'Hero',
  [SECTION_IDS.ABOUT]: 'About',
  [SECTION_IDS.SERVICES]: 'Services',
  [SECTION_IDS.PORTFOLIO]: 'Portfolio',
  [SECTION_IDS.JOURNEY]: 'Journey',
  [SECTION_IDS.TESTIMONIALS]: 'Testimonials',
  [SECTION_IDS.CONTACT]: 'Contact',
  [SECTION_IDS.LEGACY]: 'Building a Legacy',
  [SECTION_IDS.CULTURAL_IMPACT]: 'Cultural Heritage & Impact',
  
  [SECTION_IDS.STORY]: 'My Story',
  [SECTION_IDS.STATS]: 'Stats & Achievements',
  [SECTION_IDS.FASHION]: 'Fashion & Style',
  [SECTION_IDS.BRAND_COLLABORATIONS]: 'Brand Collaborations',
  [SECTION_IDS.UNIVERSITY_SHOWS]: 'University Shows',
  [SECTION_IDS.FESTIVALS]: 'Festivals & Events',
  [SECTION_IDS.FUTURE_VISION]: 'Future Vision',
  
  [SECTION_IDS.GALLERY_HERO]: 'Gallery',
  [SECTION_IDS.GALLERY_GRID]: 'Gallery Grid',
  [SECTION_IDS.CATEGORIES]: 'Categories',
  
  [SECTION_IDS.CONTACT_HERO]: 'Get in Touch',
  [SECTION_IDS.CONTACT_FORM]: 'Contact Form',
  [SECTION_IDS.SOCIAL_LINKS]: 'Social Links'
}; 