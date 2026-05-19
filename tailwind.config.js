/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { 50: '#e6e6f0', 100: '#b3b3cc', 200: '#8080a8', 300: '#4d4d85', 400: '#262661', 500: '#14143d', 600: '#0f0f2e', 700: '#0a0a1f', 800: '#070712', 900: '#090909', 950: '#050505' },
        ember: { 400: '#fb923c', 500: '#f97316' },
        surge: { 400: '#22d3ee', 500: '#06b6d4' },
        bloom: { 400: '#d946ef', 500: '#c026d3' },
        charcoal: { 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
