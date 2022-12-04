import fs from "fs/promises";
import path from "path";

import { bundleMDX } from "mdx-bundler";

import readingTime from "reading-time";

import { remark } from "remark";
import strip from "strip-markdown";

// Remark plugins
import embedImages from "remark-embed-images";

// Rehype plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodetitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";
import { parseWithOptions } from "date-fns/fp";

const removeMarkdown = remark().use(strip);

export async function getFiles(filePath: string) {
  return fs.readdir(path.join(process.cwd(), filePath));
}

export async function getFileBySlug(slug: string) {
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
      // options.remarkPlugins = [...(options.remarkPlugins ?? []), embedImages];

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
  const excerpt = await (
    await removeMarkdown.process(matter.excerpt)
  ).toString();

  return {
    code,
    frontmatter: {
      ...frontmatter,
      readingTime: readingTime(source),
      slug,
      excerpt,
    },
  };
}

export async function getLatestPosts(count: number = 5) {
  const slugs = (await getFiles("posts")).map((file) =>
    file.replace(".mdx", "")
  );

  const contentArr = [];

  for (const slug of slugs) {
    const content = await getFileBySlug(slug);

    contentArr.push(content.frontmatter);
  }

  contentArr.sort(comparator);

  return contentArr.slice(0, count);
}

function comparator(a, b) {
  if (a.date < b.date) {
    return 1;
  } else if (a.date > b.date) {
    return -1;
  }
}
