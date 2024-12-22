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
        brand: 'var(--brand-color)',
        darkest: 'var(--darkest-color)',
        dark: 'var(--dark-color)',
        mid: 'var(--mid-color)',
        light: 'var(--light-color)',
        lightest: 'var(--lightest-color)',
      },
    },
  },
  plugins: [],
}
