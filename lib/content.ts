import fs from "fs/promises";
import path from "path";

import slugify from "slugify";

import { bundleMDX } from "mdx-bundler";
import { remark } from "remark";
import strip from "strip-markdown";
import readingTime from "reading-time";

// Rehype plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodetitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";

const removeMarkdown = remark().use(strip).process;

export type BlogPost = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
  code: string;
  draft?: boolean;
  tags?: string[];
};

export type TagEntry = {
  label: string;
  slug: string;
  count: number;
};

export async function getFiles(filePath: string) {
  return (await fs.readdir(path.join(process.cwd(), filePath))).filter((p) =>
    p.endsWith(".mdx")
  );
}

export async function getFileBySlug(slug: string): Promise<BlogPost> {
  const source = await fs.readFile(
    path.join(process.cwd(), "posts", `${slug}.mdx`),
    "utf8"
  );

  const { code, frontmatter, matter } = await bundleMDX({
    source,
    cwd: process.cwd(),
    grayMatterOptions(options) {
      options.excerpt = true;
      options.excerpt_separator = "{/* excerpt */}";
      return options;
    },
    mdxOptions(options) {
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodetitles,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            properties: {
              className: ["prose-anchor"],
            },
          },
        ],
        [rehypePrism, { showLineNumbers: true }],
        [rehypeExternalLinks, { target: "_blank", rel: ["nofollow noopener"] }],
      ];

      return options;
    },
  });
  const excerpt = (await removeMarkdown(matter.excerpt)).toString();

  const meta = {
    title: frontmatter.title,
    date: frontmatter.date,
    draft: frontmatter.draft ?? false,
    tags: frontmatter.tags ?? [],
  };

  return {
    code,
    ...meta,
    readingTime: readingTime(source),
    slug,
    excerpt,
  };
}

export async function getLatestPosts(count: number = -1): Promise<{
  posts: BlogPost[];
  hasMore: boolean;
  tagMap: Record<string, TagEntry>;
  postsByTag: Record<string, BlogPost[]>;
}> {
  const slugs = (await getFiles("posts")).map((file) =>
    file.replace(".mdx", "")
  );

  const contentArr: BlogPost[] = [];
  const tags: Set<string> = new Set();
  const postsByTag: Record<string, BlogPost[]> = {};

  for (const slug of slugs) {
    const content = await getFileBySlug(slug);

    if (content.draft) {
      // Return early if the article isn't ready to be posted
      return;
    }

    contentArr.push(content);

    content.tags.forEach((tag) => {
      tags.add(tag);
      const tagSlug = slugify(tag).toLocaleLowerCase();

      if (!Array.isArray(postsByTag[tagSlug])) {
        postsByTag[tagSlug] = [];
      }
      postsByTag[tagSlug].push(content);
    });
  }

  contentArr.sort(sortByPublishDate);

  Object.keys(postsByTag).forEach((tag) =>
    postsByTag[tag].sort(sortByPublishDate)
  );

  const tagMap = Array.from(tags).reduce((prev, item) => {
    const slug = slugify(item).toLocaleLowerCase();
    return {
      ...prev,
      [slug]: {
        label: item,
        slug: slug,
        count: prev[slug]?.count + 1 || 1,
      },
    };
  }, {});

  return {
    posts: count > 0 ? contentArr.slice(0, count) : contentArr,
    hasMore: count > 0 && contentArr.length > count,
    postsByTag,
    tagMap,
  };
}

function sortByPublishDate(a: BlogPost, b: BlogPost) {
  if (a.date < b.date) {
    return 1;
  } else if (a.date > b.date) {
    return -1;
  }
}
