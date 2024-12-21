/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Arvo', ...defaultTheme.fontFamily.sans],
        body: ['Syne Variable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: '#FA347B',
        darkest: '#0B0E16',
        dark: '#111622',
        mid: '#A4A5A8',
        light: '#E1E2E3',
        lightest: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
