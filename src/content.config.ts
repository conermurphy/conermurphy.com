import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    slug: z.string(),
  }),
})

const technicalWriting = defineCollection({
  loader: glob({
    base: './src/content/technical-writing',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    client: z.enum(['PRISMIC', 'LOGROCKET', 'SNAPPIFY']),
    url: z.string(),
  }),
})

export const collections = { blog, technicalWriting }
