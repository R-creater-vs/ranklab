/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#F3F5F8',
          subtle: '#EAEFF5',
        },
        navy: {
          DEFAULT: '#152336',
          light: '#233854',
          dark: '#0D1622',
        },
        cobalt: {
          DEFAULT: '#315FD4',
          light: '#E8F0FE',
          dark: '#244AB0',
        },
        amber: {
          unknown: '#D97706',
          light: '#FEF3C7',
          dark: '#B45309',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
