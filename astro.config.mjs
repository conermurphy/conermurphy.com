// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import node from '@astrojs/node'

export default defineConfig({
  site: import.meta.env.PROD
    ? 'https://conermurphy.com'
    : 'http://localhost:4321',
  integrations: [mdx(), sitemap(), tailwind()],
  adapter: node({
    mode: 'standalone',
  }),
})
