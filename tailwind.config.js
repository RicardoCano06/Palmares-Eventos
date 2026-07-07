/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#120f0d',
        'brand-card': '#fbf6ef',
        'brand-accent': '#22e369',
        'brand-muted': '#6f6459',
        'brand-gold': '#b8863b',
      },
    },
  },
  plugins: [],
};
