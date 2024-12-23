/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Arvo', ...defaultTheme.fontFamily.sans],
        body: ['Syne Variable', ...defaultTheme.fontFamily.sans],
        code: ['JetBrains Mono Variable', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: 'hsl(var(--brand-color))',
        darkest: 'hsl(var(--darkest-color))',
        dark: 'hsl(var(--dark-color))',
        mid: 'hsl(var(--mid-color))',
        light: 'hsl(var(--light-color))',
        lightest: 'hsl(var(--lightest-color))',
      },
    },
  },
  plugins: [],
}
