/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'font-primary': ['Roboto', ' sans-serif']
      },
      colors: {
        'color-bg': '#f0f2f6',
        'color-red': '#ed3636',
        'color-black': '#262626',
        'color-border': '#3333330d',
        'color-bg-e7': '#e7edf3',
        'color-bg-e9': '#E9E9E9',
        'color-blue': '#06aaff'
      }
    }
  },
  plugins: []
};
