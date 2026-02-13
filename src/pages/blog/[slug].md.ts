import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, getEntry } from "astro:content";
import { calculateReadingTime } from "../../lib/content";

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog");
  return posts.map((post) => ({ params: { slug: post.slug } }));
};

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const entry = await getEntry("blog", slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const baseUrl = "https://nickradford.dev";
  const canonicalUrl = `${baseUrl}/blog/${entry.slug}`;
  const markdownUrl = `${canonicalUrl}.md`;
  const ogImageUrl = `${baseUrl}/og/${entry.slug}.png`;
  const sitemapUrl = `${baseUrl}/sitemap-index.xml`;
  const readtime = calculateReadingTime(entry.body).text;
  const yamlString = (value: string) => JSON.stringify(value);

  const frontmatter = [
    "---",
    `title: ${yamlString(`${entry.data.title} | Nick Radford`)}`,
    `canonical_url: ${yamlString(canonicalUrl)}`,
    `markdown_url: ${yamlString(markdownUrl)}`,
    `og_image: ${yamlString(ogImageUrl)}`,
    `readtime: ${yamlString(readtime)}`,
    `sitemap: ${yamlString(sitemapUrl)}`,
    "---",
    "",
  ].join("\n");

  return new Response(`${frontmatter}${entry.body}`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
};
