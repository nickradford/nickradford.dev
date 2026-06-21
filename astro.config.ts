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
import rehypeCodeBlocks from "./src/lib/rehype-code-blocks";
import keystatic from "@keystatic/astro";
import markdoc from "@astrojs/markdoc";

import metaTags from "astro-meta-tags";
import { astroGrab } from "astro-grab";
import whichly from "@whichly/astro";

const showWhichlyPicker =
  process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";

export default defineConfig({
  site: "https://nickradford.dev",
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@keystatic/core",
        "@keystatic/core/content-components",
        "@keystatic/core/ui",
        "@keystatic/astro/ui",
        "@keystatic/astro/api",
      ],
    },
    resolve: {
      alias: {
        "@": "./src",
      },
    },
  },
  adapter: vercel(),
  output: "static",
  devToolbar: { enabled: false },
  integrations: [
    react(),
    mdx({
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          { behavior: "append", properties: { className: ["prose-anchor"] } },
        ],
        [rehypePrism, { showLineNumbers: true }],
        rehypeCodeBlocks,
        [rehypeExternalLinks, { target: "_blank", rel: ["noopener"] }],
      ],
    }),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, "");
        return (
          !pathname.endsWith(".md") &&
          !["/open-graph", "/search"].includes(pathname) &&
          !pathname.startsWith("/search-index")
        );
      },
    }),
    markdoc(),
    keystatic(),
    metaTags(),
    astroGrab(),
    whichly({ floating: showWhichlyPicker }),
  ],
});
