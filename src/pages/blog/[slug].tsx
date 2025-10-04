import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import { BlogPage, H1, H2 } from "@/src/components";
import { BlogPost, getFileBySlug, getFiles } from "@/src/lib/content";

import "prism-themes/themes/prism-vsc-dark-plus.css";
import { getImage } from "@/src/lib/og";

const Components = {
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  a: (props) => (
    <a
      {...props}
      className={`no-underline text-sky-500 background-transparent border-b-2 border-b-transparent pb-1 hover:border-b-sky-400 hover:text-sky-400 transition-colors ${props.className}`}
    />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="image"
      className="border-8 rounded border-zinc-300 dark:border-zinc-800"
      {...props}
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
      {/* SEO handled in Astro layout */}
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
