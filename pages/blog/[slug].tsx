import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { NextSeo } from "next-seo";

import { BlogPage, H1, H2 } from "@/components";
import { BlogPost, getFileBySlug, getFiles } from "@/lib/content";

import "prism-themes/themes/prism-vsc-dark-plus.css";

const Components = {
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  a: (props) => (
    <a
      {...props}
      className={`no-underline text-sky-500 background-transparent border-b-2 border-b-transparent pb-1 hover:border-b-sky-400 hover:text-sky-400 transition-colors ${props.className}`}
    />
  ),
};

type BlogPostProps = {
  post: BlogPost;
};

function BlogPost({ post }: BlogPostProps) {
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <BlogPage meta={post}>
      <NextSeo
        title={post.title}
        description={post.excerpt}
        openGraph={{
          title: post.title,
          description: post.excerpt,
          url: `https://nickradford.dev/blog/${post.slug}`,
          type: "article",
          article: {
            publishedTime: post.date,
            authors: [
              "https://nickradford.dev",
              "https://twitter.com/nick_radford",
            ],
          },
          images: [
            {
              url: encodeURI(
                `${
                  process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
                }/api/og?title=${post.title}&date=${post.date}&readTime=${
                  post.readingTime.text
                }`
              ),
              width: 800,
              height: 400,
            },
          ],
        }}
      />
      <Component components={Components} />
    </BlogPage>
  );
}
export default BlogPost;

export async function getStaticPaths() {
  const posts = await getFiles("posts");

  return {
    paths: posts.map((file) => ({
      params: {
        slug: file.replace(/\.mdx?$/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug(params.slug);

  return { props: { post } };
}
