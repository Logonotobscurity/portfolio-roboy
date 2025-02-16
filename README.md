# Portfolio Roboy

## Deployment Status

[![Production Deployment](https://github.com/[your-username]/portfolioRoboy/actions/workflows/production.yml/badge.svg)](https://github.com/[your-username]/portfolioRoboy/actions/workflows/production.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/32870b7f-f27a-483e-bc41-e389092f9221/deploy-status)](https://app.netlify.com/sites/rooboy/deploys)

## Deployment Information

The site is automatically deployed using GitHub Actions and Netlify:

- Production URL: https://rooboy.netlify.app
- Staging URLs: Generated per branch/PR

### Deployment Workflows

1. **Production Deployment**
   - Triggered on push to `main`/`master` branch
   - Deploys to production environment
   - Full optimization and production settings

2. **Staging Deployment**
   - Triggered on PRs and non-production branches
   - Creates preview deployments
   - Useful for testing changes before production

### Environment Variables

The following environment variables are required for deployment:

- `NETLIFY_AUTH_TOKEN`: Netlify authentication token
- `NETLIFY_SITE_ID`: Site ID (32870b7f-f27a-483e-bc41-e389092f9221)

These should be set as GitHub repository secrets.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features

- Vite + React + TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Automatic sitemap generation
- Optimized asset handling
- Production-ready security headers
- Comprehensive error handling 