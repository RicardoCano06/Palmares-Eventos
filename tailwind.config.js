/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1e252d',
        'brand-card': '#27313b',
        'brand-accent': '#22e369',
        'brand-muted': '#b1becb',
        'brand-gold': '#d4af37',
      },
    },
  },
  plugins: [],
};
