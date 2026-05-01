/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        sand: {
          50: '#fdf8f0',
          100: '#faefd9',
          200: '#f4dbb0',
          300: '#ecc27d',
          400: '#e3a44e',
          500: '#d98c30',
          600: '#c07025',
          700: '#9f5520',
          800: '#824422',
          900: '#6b3820',
        },
        ocean: {
          50: '#eefbfd',
          100: '#d4f4f9',
          200: '#afe9f3',
          300: '#77d7ea',
          400: '#38bdd8',
          500: '#1ca0be',
          600: '#1a80a0',
          700: '#1c6782',
          800: '#1f546b',
          900: '#1e465b',
        },
        slate: {
          950: '#0a0f1a',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
