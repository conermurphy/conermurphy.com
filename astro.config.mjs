// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import aws from 'astro-sst'

export default defineConfig({
  site: import.meta.env.PROD
    ? 'https://conermurphy.com'
    : 'http://localhost:4321',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: aws(),
  output: 'server',
  // NOTE: Astro 7 defaults to JSX whitespace rules which strip spaces between
  // inline elements (e.g. inline code in posts, pagination text).
  compressHTML: true,
})
