/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0D0909',
        purple: '#979EDD',
        green: '#98D989',
        blue: '#A1BBDE',
        grey: '#CED5D8',
        yellow: '#D5DB35',
        lightpurple: '#D6DAFC',
        lightgreen: '#D8F9D0',
        palegreen: '#E0E2BC',
        bradley: '#E53B45',
        skyblue: '#E6F4FD',
        lightbradley: '#F5D3D9',
        white: '#FFFFFF',
        lightgrey: '#F8F8F8',
      },
      fontFamily: {
        'base': ["Roboto Condensed"],
        'calm': ["Jockey One"]
      },
    },
  },
  plugins: [],
}

