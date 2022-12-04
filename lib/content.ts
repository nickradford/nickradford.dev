import fs from "fs/promises";
import path from "path";

import { bundleMDX } from "mdx-bundler";

import readingTime from "reading-time";

// Remark plugins
import embedImages from "remark-embed-images";

// Rehype plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodetitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";

export async function getFiles(filePath: string) {
  return fs.readdir(path.join(process.cwd(), filePath));
}

export async function getFileBySlug(slug: string) {
  const source = await fs.readFile(
    path.join(process.cwd(), "posts", `${slug}.mdx`),
    "utf8"
  );

  const { code, frontmatter } = await bundleMDX({
    source,
    cwd: process.cwd(),
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), embedImages];

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

  return {
    code,
    frontmatter: {
      ...frontmatter,
      readingTime: readingTime(source),
    },
  };
}
