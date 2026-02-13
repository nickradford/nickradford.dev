import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeExternalLinks from "rehype-external-links";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

import metaTags from "astro-meta-tags";
import { astroGrab } from "astro-grab";

export default defineConfig({
  site: "https://nickradford.dev",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": "./src",
      },
    },
  },
  adapter: vercel(),
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
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, "");
        return !["/open-graph", "/search"].includes(pathname);
      },
    }),
    markdoc(),
    keystatic(),
    metaTags(),
    astroGrab(),
  ],
});
