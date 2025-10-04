import type { APIRoute } from "astro";
import { Feed, Item } from "feed";
import { getCollection } from "astro:content";

export const prerender = true;

export const GET: APIRoute = async () => {
  const site = "https://nickradford.dev";
  const feed = new Feed({
    title: "Nick Radford (dot) Dev",
    description:
      "A collection of my random musings; usually centered around frontend topics. Join me as I explore new technologies, share my experiences, and learn from others.",
    copyright: `© ${new Date().getFullYear()} Nick Radford • All rights reserved`,
    id: site,
    link: site,
    image: `${site}/favicon.ico`,
    generator: "Astro + feed",
    author: { name: "Nick Radford", link: site },
    language: "en",
  });

  const posts = await getCollection("blog");
  for (const p of posts) {
    const url = `${site}/blog/${p.slug}`;
    const date = new Date(`${p.data.date}T12:00:00Z`);
    const html = p.body; // raw markdown body; replace with rendered HTML if desired
    feed.addItem({
      title: p.data.title as string,
      description: p.body.slice(0, 300),
      content: html,
      link: url,
      id: url,
      date,
      author: [{ name: "Nick Radford", link: site }],
    } as Item);
  }

  return new Response(feed.atom1(), {
    headers: { "Content-Type": "text/xml", "Cache-Control": "s-maxage=86400" },
  });
};
