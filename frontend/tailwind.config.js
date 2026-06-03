export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        ios: {
          bg: '#000000',
          surface: '#1C1C1E',
          'surface-2': '#2C2C2E',
          blue: '#0A84FF',
          'text-sec': '#EBEBF599',
        },
      },
    },
  },
  plugins: [],
}
