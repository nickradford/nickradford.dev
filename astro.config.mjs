import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercelStatic from "@astrojs/vercel/static";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

export default defineConfig({
  site: "https://nickradford.dev",
  vite: {
    resolve: {
      alias: {
        "@": "./src",
      },
    },
  },
  adapter: vercelStatic(),
  output: "static",
  integrations: [
    react(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          { behavior: "wrap", properties: { className: ["prose-anchor"] } },
        ],
        [rehypePrism, { showLineNumbers: true }],
        [rehypeExternalLinks, { target: "_blank", rel: ["nofollow noopener"] }],
      ],
    }),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
    markdoc(),
    process.env.NODE_ENV === "development" ? keystatic() : null,
  ],
});
