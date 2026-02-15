import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        date: z.string().optional(),
        readTime: z.string().optional(),
        tags: z.array(z.string()).optional(),
        icon: z.string().optional(),
        image: z.string().optional(),
      }),
    }),
    projects: defineCollection({
      type: 'data',
      source: '**/projects/**/*.yaml',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        tech: z.array(z.string()).optional(),
        images: z.array(z.string()).default([]),
        link: z.string().optional(),
        order: z.number().default(0),
      }),
    }),
  },
})
