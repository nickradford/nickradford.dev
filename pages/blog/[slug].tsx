import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import Highlight from "rehype-highlight";

import "highlight.js/styles/a11y-dark.css";

import Page from "../../components/page";
import { getAllPostsWithSlug, getPostBySlug } from "../../lib/api";

const Blog = ({ preview, post }) => (
  <Page pageTitle={post.title}>
    <article className="bg-black bg-opacity-70 p-8">
      <h1 className="text-2xl font-scp capitalize mb-2">{post.title}</h1>
      <p className="font-scp mb-2 text-sm">
        Published <TimeAgo date={post.date} />
      </p>
      <div className="prose-lg">
        <ReactMarkdown rehypePlugins={[Highlight]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
    {/* <pre>{JSON.stringify(post.content.json, null, 4)}</pre> */}
  </Page>
);

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostBySlug(params.slug, preview);

  // console.log(preview, data, params.slug);

  return {
    props: {
      preview,
      post: data[0] ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths: allPosts?.map(({ slug }) => `/blog/${slug}`) ?? [],
    fallback: false,
  };
}

export default Blog;
