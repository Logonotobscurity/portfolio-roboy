#!/bin/bash
# Deployment Verification Script

# 1. Pre-flight Checks
echo "🔍 Checking Environment..."
if ! command -v netlify &> /dev/null; then
  npm install -g netlify-cli
fi
if ! command -v gh &> /dev/null; then
  brew install gh
fi

# 2. Local Build Test
echo "🚀 Testing Local Build..."
rm -rf node_modules && npm ci
npm run build || { echo "❌ Build failed"; exit 1; }

# 3. Netlify Deployment Simulation
echo "🌐 Testing Netlify Build..."
ntl deploy --build --timeout 600 || { echo "❌ Netlify deploy failed"; exit 1; }

# 4. Error Tracking Test
echo "🛑 Generating Test Error..."
git checkout -b verification-$(date +%s)
cat << 'EOF' > src/components/SentryTest.tsx
import { Sentry } from '@sentry/react';

export const SentryTest = () => (
  <button
    onClick={() => {
      Sentry.captureException(new Error('Verification Error: Everything works!'));
    }}
  >
    Trigger Verification Error
  </button>
);
EOF

git add . && git commit -m "Add verification component"
git push origin HEAD

# 5. Deployment Verification
echo "🔧 Checking Production Deployment..."
DEPLOY_URL=$(netlify deploy --json | jq -r '.deploy_url')
sleep 120 # Wait for deployment propagation

# 6. Functional Tests
echo "🧪 Running Tests..."
curl -s $DEPLOY_URL | grep "window.Sentry" || { echo "❌ Sentry not initialized"; exit 1; }
curl -s -o /dev/null -w "%{http_code}" $DEPLOY_URL/healthcheck | grep 200 || { echo "❌ Healthcheck failed"; exit 1; }

# 7. Error Reporting Check
echo "📊 Checking Sentry..."
SENTRY_EVENT_ID=$(curl -s $DEPLOY_URL | grep -oP 'Sentry\.captureException\(new Error\(.*?\)' | cut -d"'" -f2)
gh issue create --title "Verify Sentry Error" --body "Check for error ID: $SENTRY_EVENT_ID in Sentry dashboard"

# 8. Cleanup
echo "🧹 Cleaning Up..."
git checkout main
git branch -D verification-*
netlify deploy revert

# 9. Final Verification
echo "✅ Verification Complete!"
echo "Next steps:"
echo "1. Check Sentry dashboard for test error"
echo "2. Review Netlify deployment logs"
echo "3. Verify Renovate PR creation"