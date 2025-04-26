import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        spinSlow: 'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      colors: {
        brand: {
          blue: '#2563eb',
          pink: '#ec4899',
          green: '#10b981',
          cyan: '#06b6d4',
          dark: '#111827',
        },
      },
    },
  },
  plugins: [],
};

export default config;
