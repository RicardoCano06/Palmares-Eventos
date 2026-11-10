/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5EFE4',
          surface: '#EDE4D5',
          surfaceDark: '#E3D7C4',
          text: '#10231A',
          dark: '#0E2318',
          green: '#1F4D2E',
          muted: '#5C625A',
          accent: '#C9A227',
          accentSoft: '#E8D6A3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
