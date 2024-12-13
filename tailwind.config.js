/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0D0909',
        purple: '#3e236e',
        green: '#98D989',
        blue: '#A1BBDE',
        grey: '#CED5D8',
        yellow: '#D5DB35',
        lightpurple: '#979EDD',
        lightgreen: '#D8F9D0',
        palegreen: '#E0E2BC',
        bradley: '#E53B45',
        skyblue: '#E6F4FD',
        lightbradley: '#F5D3D9',
        white: '#FFFFFF',
        lightgrey: '#F8F8F8',
        darkBg: '#27282B',
        darkInner: '#111111',
        darkBorder :'#25262D',
        lightBorder : '#F3F3F4',
        leftBar : '#F4F4F4',
        darkLeftBar : '#1E1F22',
        text : '#616970'
      },
      fontFamily: {
        'base': ["Roboto Condensed"],
        'calm': ["Jockey One"],
        'joan': ["Joan"]
      },
    },
  },
  plugins: [],
}

