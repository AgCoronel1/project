/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ios-bg': '#000000',
        'ios-surface': '#1C1C1E',
        'ios-surface-2': '#2C2C2E',
        'ios-blue': '#0A84FF',
        'ios-text-sec': '#EBEBF599',
      },
    },
  },
  plugins: [],
}