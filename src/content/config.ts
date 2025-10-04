import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
