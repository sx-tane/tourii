import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
        white: '#EEEEFA',
        black: '#1E1E29',
        charcoal:'#21211b',
        red: '#ae3111',
        warmGrey: '#e3e3dc',
        warmGrey2: '#d6d6cc',
        warmGrey3: '#bfbfac',
        mustard: '#b6ad33',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        secondary: ['LibertinusSans', 'sans-serif'],
      },
      scale: {
        '110': '1.1',
        '120': '1.2',
        '130': '1.3',
        '140': '1.4',
        '150': '1.5',
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
} satisfies Config;
