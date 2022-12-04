import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

import BlogPage from "@/components/BlogPage";
import { getFileBySlug, getFiles } from "@/lib/content";

import "prism-themes/themes/prism-vsc-dark-plus.css";

function BlogPost(props) {
  const Component = useMemo(
    () => getMDXComponent(props.post.code),
    [props.post.code]
  );

  return (
    <BlogPage meta={props.post}>
      <Component />
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
