import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
// @ts-ignore
import sanitizeHtml from "sanitize-html";
// @ts-ignore
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "Nick Radford (dot) Dev",
    description:
      "A collection of my random musings; usually centered around frontend topics. Join me as I explore new technologies, share my experiences, and learn from others.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.body.slice(0, 300),
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
    })),
    customData: `<language>en</language><copyright>© ${new Date().getFullYear()} Nick Radford • All rights reserved</copyright>`,
  });
}
