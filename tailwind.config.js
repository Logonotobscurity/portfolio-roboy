/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        primary: '#2D00F7',
        'primary-dark': '#1A0099',
        'primary-light': '#4D33FF',
        'retro-black': '#0A0A0A',
        'retro-white': '#F5F5F5',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'scan': 'scan 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'flicker': 'flicker 0.3s infinite',
        'glitch-1': 'glitch-1 2.5s infinite',
        'glitch-2': 'glitch-2 2.5s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(45,0,247,0.5)' },
          '100%': { 'box-shadow': '0 0 20px rgba(45,0,247,0.8)' },
        },
        flicker: {
          '0%, 100%': { opacity: 0.1 },
          '50%': { opacity: 0.3 },
        },
        'glitch-1': {
          '0%, 100%': { transform: 'none' },
          '41.99%': { transform: 'none' },
          '42%': { transform: 'translate(-2px, 2px)' },
          '43.99%': { transform: 'translate(-2px, 2px)' },
          '44%': { transform: 'translate(2px, -2px)' },
          '45.99%': { transform: 'translate(2px, -2px)' },
          '46%': { transform: 'none' }
        },
        'glitch-2': {
          '0%, 100%': { transform: 'none' },
          '64.99%': { transform: 'none' },
          '65%': { transform: 'translate(2px, -2px)' },
          '65.99%': { transform: 'translate(2px, -2px)' },
          '66%': { transform: 'translate(-2px, 2px)' },
          '66.99%': { transform: 'translate(-2px, 2px)' },
          '67%': { transform: 'none' }
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': 'url("/assets/noise.png")',
        'grid': 'linear-gradient(to right, #2D00F7 1px, transparent 1px), linear-gradient(to bottom, #2D00F7 1px, transparent 1px)',
      },
      gridTemplateColumns: {
        'gallery': 'repeat(auto-fill, minmax(300px, 1fr))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
};