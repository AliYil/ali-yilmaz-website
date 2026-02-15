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
  },
})
