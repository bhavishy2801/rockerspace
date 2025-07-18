/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        cyborg: ['Cyborg', 'sans-serif'], // Register the custom font
      },
      colors: {
        'cyber-black': '#0a0a0a',
        'cyber-bg': '#14141c',
        'cyber-primary': '#00f0ff',
        'cyber-secondary': '#8A2BE2',
        'cyber-accent': '#f0f00f',
        'cyber-dim': '#8892b0',
      },
      keyframes: {
        'grid-pan': {
          '0%': { 'background-position': '0% 50%' },
          '100%': { 'background-position': '100% 50%' },
        },
        'text-scramble': {
          '0%': { content: '"@#$*&%"' },
          '10%': { content: '"B#@v*&y@"' },
          '20%': { content: '"Bh@v*shy@"' },
          '30%': { content: '"Bhav*shy@"' },
          '40%': { content: '"Bhavis#y@"' },
          '50%': { content: '"Bhavishy@"' },
          '60%': { content: '"Bhavishya"' },
          '100%': { content: 'attr(data-text)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        }
      },
      animation: {
        'grid-pan': 'grid-pan 15s linear infinite alternate',
        'text-scramble': 'text-scramble 1s forwards',
        'flicker': 'flicker 0.2s infinite',
      }
    },
  },
  plugins: [],
}