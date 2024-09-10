/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        dark: '#0D0909',  // Very dark red/black
        darker: '#111111', // Almost pure black
        navy: '#1A2431',   // Navy
        maroon: '#230607', // Dark maroon
        charcoal: '#28292C', // Dark gray/charcoal
        sky: '#A1BBDE',    // Light sky blue
        red: '#E53B45',    // Vibrant red
        white: '#FFFFFF'   // Pure white
      },
      fontFamily: {
        'base': ["Roboto Condensed"],
        'calm': ["Jockey One"]
      },
    },
  },
  plugins: [],
}

