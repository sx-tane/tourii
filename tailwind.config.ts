import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors:{
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
    },
  },
} satisfies Config;
