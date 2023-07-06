import { NextApiRequest, NextApiResponse } from "next";
import ReactDOMServer from "react-dom/server";
import { Feed, Item } from "feed";
import { getLatestPosts } from "@/src/lib/content";
import { BASE_URL } from "@/src/lib/url";

import { getMDXComponent } from "mdx-bundler/client";
import { getImage } from "@/src/lib/og";

export default async function handler(_: never, res: NextApiResponse) {
  const feed = new Feed({
    title: "Nick Radford (dot) Dev",
    description:
      "A collection of my random musings; usually centered around frontend topics. Join me as I explore new technologies, share my experiences, and learn from others.",
    copyright: `© ${new Date().getFullYear()} Nick Radford • All rights reserved`,
    id: "https://nickradford.dev",
    link: "https://nickradford.dev",
    generator: "Next.js + jpmonette/feed",
    image: `${BASE_URL}/favicon.ico`,
    author: {
      name: "Nick Radford",
      link: "https://nickradford.dev",
    },
    language: "en",
  });

  const { posts } = await getLatestPosts(-1, true);

  for (const post of posts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    const date = new Date(`${post.date}T12:00-0800`);
    const Component = getMDXComponent(post.code);
    const htmlContent = ReactDOMServer.renderToStaticMarkup(<Component />);
    const [root, query] = getImage({
      title: post.title,
      date: post.date,
      readTime: post.readingTime.text,
    }).split("?");

    const image = `${root}?${encodeURIComponent(query)}`;

    feed.addItem({
      title: post.title,
      description: post.excerpt,
      image: image,
      content: htmlContent,
      link: url,
      id: url,
      date: date,
      published: date,
      author: [{ name: "Nick Radford", link: "https://nickradford.dev" }],
    } as Item);
  }

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.send(feed.atom1());
}
