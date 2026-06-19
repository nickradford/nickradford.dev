import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { calculateReadingTime } from "../../lib/content";
import { formatDate } from "@lib/format-date";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const entry = await getEntry("blog", slug);

  if (!entry || entry.data.draft) {
    return new Response("Not found", { status: 404 });
  }

  const baseUrl = "https://nickradford.dev";
  const canonicalUrl = `${baseUrl}/blog/${entry.slug}`;
  const markdownUrl = `${canonicalUrl}.md`;
  const ogImageUrl = `${baseUrl}/og/${entry.slug}.png`;
  const sitemapUrl = `${baseUrl}/sitemap-index.xml`;
  const readtime = calculateReadingTime(entry.body).text;
  const yamlString = (value: string) => JSON.stringify(value);

  const endMatter = [
    "<!--",
    `title: ${yamlString(`${entry.data.title} | Nick Radford`)}`,
    `canonical_url: ${yamlString(canonicalUrl)}`,
    `markdown_url: ${yamlString(markdownUrl)}`,
    `og_image: ${yamlString(ogImageUrl)}`,
    `readtime: ${yamlString(readtime)}`,
    `sitemap: ${yamlString(sitemapUrl)}`,
    ...(entry.data.changelog
      ? [
          "changelog:",
          ...entry.data.changelog.map(
            (c) =>
              `  - ${formatDate(c.date, { dateStyle: "medium" })}: ${
                c.description
              }`
          ),
        ]
      : []),
    "-->",
  ].join("\n");

  const bodyHeader = `# ${entry.data.title}\nby Nick Radford\n---\n\n`;

  return new Response(`${bodyHeader}${entry.body}\n\n${endMatter}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${canonicalUrl}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
    },
  });
};
