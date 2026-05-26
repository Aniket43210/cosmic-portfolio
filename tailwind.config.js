/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#09090B',
        secondary: '#111827',
        card: 'rgba(20,20,30,0.7)',
        primary: '#F8FAFC',
        muted: '#94A3B8',
        accent: {
          amber: '#F59E0B',
          cyan: '#22D3EE',
          pink: '#EC4899',
          warm: '#D97706',
          light: '#FBBF24',
        },
        deep: { 800: '#1E293B', 900: '#0F172A', 950: '#09090B' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '0.875rem',
        '3xl': '1.125rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)',
        card: '0 2px 8px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)',
        glow: '0 0 30px rgba(245,158,11,0.08)',
        glowCyan: '0 0 30px rgba(34,211,238,0.08)',
        glowPink: '0 0 30px rgba(236,72,153,0.08)',
      },
    },
  },
  plugins: [],
}
