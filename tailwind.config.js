const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  theme: {
    
  },
  darkMode: 'class',
};
