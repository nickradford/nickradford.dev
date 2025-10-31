import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'Nick Radford (dot) Dev',
    description: 'A collection of my random musings; usually centered around frontend topics. Join me as I explore new technologies, share my experiences, and learn from others.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: new Date(`${post.data.date}T12:00:00Z`),
      description: post.body.slice(0, 300),
      link: `/blog/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
    customData: `<language>en</language><copyright>© ${new Date().getFullYear()} Nick Radford • All rights reserved</copyright>`,
  });
}
