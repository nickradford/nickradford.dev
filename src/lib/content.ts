import { remark } from "remark";
import strip from "strip-markdown";
import slugify from "slugify";

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export function calculateReadingTime(text: string): ReadingTime {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  const time = minutes * 60 * 1000; // in milliseconds
  const readingText = `${Math.ceil(minutes)} min read`;
  return { text: readingText, minutes, time, words };
}

export type BlogPost = {
  title: string;
  date: Date;
  slug: string;
  excerpt: string;
  readingTime: ReadingTime;
  draft?: boolean;
  tags?: string[];
};

export type TagEntry = {
  label: string;
  slug: string;
  count: number;
};

export function toExcerpt(md: string) {
  // Get the first paragraph (content before first double newline or first 200 characters)
  const firstParagraph = md.split("\n\n")[0] || md;
  const stripped = String(remark().use(strip).processSync(firstParagraph)).trim();

  // Limit to 160 characters for a nice excerpt length
  if (stripped.length > 160) {
    return stripped.substring(0, 160).trim() + "...";
  }
  return stripped;
}

export async function getLatestPosts(options?: { includeDrafts?: boolean }): Promise<{
  posts: BlogPost[];
  hasMore: boolean;
  tagMap: Record<string, TagEntry>;
  postsByTag: Record<string, BlogPost[]>;
}> {
  // import { getCollection, getEntry } from "astro:content";
  const getCollection = (await import("astro:content")).getCollection;

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
