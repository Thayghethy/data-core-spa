/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-purple': '#BB86FC',
        'dark-bg': '#240151',
        'card-bg': '#240151',
        'app-background': '#240151', 
        'app-border': 'rgba(187,134,252,0.3)', 
      },
      boxShadow: {
        'card-glow': '0 0 15px rgba(187, 134, 252, 0.7), 0 0 30px rgba(187, 134, 252, 0.4)',
      },
    },
  },
  plugins: [],
}