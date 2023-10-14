import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      "hxl": ['24px', { lineHeight: '35px', letterSpacing: '-0.33px', fontWeight: 'bold' }],
      "hl": ['20px', { lineHeight: '29px', letterSpacing: '-0.25px', fontWeight: 'bold' }],
      "hm": ['18px', { lineHeight: '26px', letterSpacing: '-0.25px', fontWeight: 'bold' }],
      "hs": ['14px', { lineHeight: '20px', letterSpacing: '-0.2px', fontWeight: 'bold' }],
      "b1": ['16px', { lineHeight: '23px', fontWeight: 'normal' }],
      "b2": ['15px', { lineHeight: '22px', fontWeight: 'normal' }],
      "b3": ['13px', { lineHeight: '19px', fontWeight: 'semibold' }],
    },
    screens: {
      xs: { max: "480px" },
      sm: { min: "481px", max: "768px" },
      md: { min: "769px", max: "1024px" },
      lg: { min: "1025px", max: "1280px" },
      xl: { min: "1281px" },
    },
    extend: {
      colors: {
        'purple-light': '#AD1FEA',
        'blue-primary': '#4661E6',
        'blue-secondary': '#373F68',
        'gray-light': '#F2F4FF',
        'gray-background': '#F7F8FD',
        'blue-dark': '#3A4374',
        'gray-text': '#647196',
        'orange-accent': '#F49F85',
        'cyan-accent': '#62BCFA',
      },
      typography: {
        'break-word':{
          css: {
            'overflow-wrap': 'break-word',
          }
        }
      },
    },

  },
  plugins: [],
}
export default config
