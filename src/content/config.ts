import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const project = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    url: z.string().url(),
    showUrl: z.boolean(),
    gitRepo: z.string().url().startsWith("https://github.com/"),
    showGitRepo: z.boolean(),
  }),
});

export const collections = { blog, project };
