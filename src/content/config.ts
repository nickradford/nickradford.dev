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
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    screenshots: z.array(z.string()).default([]),
    publicUrl: z.string().url().optional().nullable(),
    githubUrl: z.string().url().optional().nullable(),
  }),
});

const projectOrder = defineCollection({
  type: "data",
  schema: z.object({
    slugs: z.array(z.string()),
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

export const collections = { blog, project, projectOrder, inspoLinks };
