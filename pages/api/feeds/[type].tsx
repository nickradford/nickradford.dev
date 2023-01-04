import { NextApiRequest, NextApiResponse } from "next";
import ReactDOMServer from "react-dom/server";
import { Feed, Item } from "feed";
import { getLatestPosts } from "@/lib/content";
import { BASE_URL } from "@/lib/url";

import { getMDXComponent } from "mdx-bundler/client";

type Type = "rss" | "atom" | "json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const feed = new Feed({
    title: "Nick Radford (dot) Dev",
    description:
      "A collection of my random musings; usually centered around frontend topics. Join me as I explore new technologies, share my experiences, and learn from others.",
    copyright: `© ${new Date().getFullYear()} Nick Radford • All rights reserved`,
    id: "https://nickradford.dev",
    link: "https://nickradford.dev",
  });

  const { posts } = await getLatestPosts();

  for (let post of posts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    const date = new Date(`${post.date}T12:00-0800`);
    const Component = getMDXComponent(post.code);
    const htmlContent = ReactDOMServer.renderToStaticMarkup(<Component />);
    feed.addItem({
      title: post.title,
      description: post.excerpt,
      content: htmlContent,
      link: url,
      id: url,
      date: date,
      published: date,
    } as Item);
  }

  const type = req.query.type as Type;

  let retValue: string;

  switch (type) {
    case "atom":
      retValue = feed.atom1();
      break;
    case "json":
      retValue = feed.json1();
      break;
    case "rss":
    default:
      retValue = feed.rss2();
  }

  res.send(retValue);
}
