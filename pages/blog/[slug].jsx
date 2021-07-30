import Head from "next/head";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import Highlight from "rehype-highlight";
import removeMarkdown from "remove-markdown";

import "highlight.js/styles/a11y-dark.css";

import Page from "../../components/page";
import { getAllPostsWithSlug, getPostBySlug } from "../../lib/api";

const Blog = ({ preview, post }) => (
  <Page pageTitle={post.title}>
    <Head>
      <meta
        name="description"
        content={removeMarkdown(post.content.split("\n")[0]).substring(0, 200)}
      />
      <meta name="author" content="Nick Radford" />

      <meta property="og:title" content={post.title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:image"
        content={`/api/generate-preview-image?slug=${post.slug}`}
      />
      <meta property="twitter:image" />
      <meta
        property="og:description"
        content={removeMarkdown(post.content.split("\n")[0]).substring(0, 200)}
      />
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content="Nick Radford" />

      <meta property="twitter:title" content={post.title} />
      <meta
        property="twitter:description"
        content={removeMarkdown(post.content.split("\n")[0]).substring(0, 200)}
      />
    </Head>
    <article className="p-4 bg-black bg-opacity-70 sm:p-8">
      <h1 className="mb-2 text-2xl capitalize font-scp">{post.title}</h1>
      <p className="mb-2 text-sm font-scp">
        Published <TimeAgo date={post.date} />
      </p>
      <div className="prose sm:prose-lg">
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
  const url = `${process.env.VERCEL_URL}/api/generate-preview-image?slug=${data[0]?.slug}`;

  if (process.env.NODE_ENV === "production") {
    // Cause the image to be generated during the build
    await fetch(url);
  }

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
