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
    topics: z.string().array().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    url: z.string(),
    github_url: z.string().optional(),
    tech: z.string().array(),
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

export const collections = { blog, technicalWriting, projects }
