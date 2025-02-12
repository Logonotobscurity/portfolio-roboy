export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? {
          'cssnano': {
            preset: ['default', {
              discardComments: {
                removeAll: true,
              },
              normalizeWhitespace: false,
            }],
          },
          '@fullhuman/postcss-purgecss': {
            content: [
              './src/**/*.{js,jsx,ts,tsx}',
              './index.html',
            ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: ['html', 'body'],
              deep: [/^dark:/],
              greedy: [/^prose/, /^aspect-/],
            },
          },
        }
      : {}),
  },
};
