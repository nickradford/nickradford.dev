import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    lastUpdated: z.date().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    changelog: z
      .array(z.object({ description: z.string(), date: z.date() }))
      .optional(),
  }),
});

const project = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const inspoLinks = defineCollection({
  type: "data",
  schema: z.object({
    links: z.array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        authorName: z.string(),
        twitterUsername: z.string(),
        imageUrl: z.string().url().optional().nullable(),
        notes: z.string().optional().nullable(),
      }),
    ),
  }),
});

export const collections = { blog, project, inspoLinks };
