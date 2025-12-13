import slugify from "slugify";
import { calculateReadingTime, toExcerpt, type BlogPost, type TagEntry } from "./content";
import { getCollection } from "astro:content";

export async function getLatestPosts(options?: { includeDrafts?: boolean }): Promise<{
  posts: BlogPost[];
  hasMore: boolean;
  tagMap: Record<string, TagEntry>;
  postsByTag: Record<string, BlogPost[]>;
}> {
  // import { getCollection, getEntry } from "astro:content";

  const entries = await getCollection("blog", ({ data }) =>
    options?.includeDrafts ? true : !data.draft,
  );

  const posts: BlogPost[] = entries.map((e) => ({
    title: e.data.title,
    date: e.data.date,
    draft: e.data.draft ?? false,
    tags: e.data.tags ?? [],
    slug: e.slug,
    excerpt: toExcerpt(e.body),
    readingTime: calculateReadingTime(e.body),
  }));

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  const postsByTag: Record<string, BlogPost[]> = {};
  const tagMap: Record<string, TagEntry> = {};

  for (const post of posts) {
    (post.tags ?? []).forEach((tag) => {
      const tagSlug = slugify(tag).toLowerCase();
      (postsByTag[tagSlug] ||= []).push(post);
    });
  }

  for (const [slug, arr] of Object.entries(postsByTag)) {
    arr.sort((a, b) => (a.date < b.date ? 1 : -1));
    tagMap[slug] = {
      label: arr[0].tags?.find((t) => slugify(t).toLowerCase() === slug) || slug,
      slug,
      count: arr.length,
    };
  }

  return { posts, hasMore: false, postsByTag, tagMap };
}
