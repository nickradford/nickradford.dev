import Head from "next/head";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import Highlight from "rehype-highlight";
import removeMarkdown from "remove-markdown";

import Page from "../../components/page";
import { getAllPostsWithSlug, getPostBySlug } from "../../lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? "nickradford.dev"
  : "localhost:3000";

const Blog = ({ preview, post }) => {

  return (
    <Page pageTitle={post.title}>
      <Head>
        <meta
          name="description"
          content={removeMarkdown(post.content.split("\n")[0]).substring(
            0,
            200
          )}
        />
        <meta name="author" content="Nick Radford" />

        <meta key="og:title" property="og:title" content={post.title} />
        <meta key="og:type" property="og:type" content="article" />
        <meta
          key="og:url"
          property="og:url"
          content={`https://${BASE_URL}/blog/${post.slug}`}
        />
        <meta
          key="og:image"
          property="og:image"
          content={`https://${BASE_URL}/api/generate-preview-image?slug=${post.slug}`}
        />

        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="628" />

        <meta
          key="twitter:image"
          property="twitter:image"
          content={`https://${BASE_URL}/api/generate-preview-image?slug=${post.slug}`}
        />
        <meta
          key="og:description"
          property="og:description"
          content={removeMarkdown(post.content.split("\n")[0]).substring(
            0,
            200
          )}
        />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Nick Radford" />

        <meta property="twitter:title" content={post.title} />
        <meta
          property="twitter:description"
          content={removeMarkdown(post.content.split("\n")[0]).substring(
            0,
            200
          )}
        />
      </Head>
      <article className="p-4 bg-crust bg-opacity-70 sm:p-8 rounded-lg shadow-lg">
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
    </Page>
  );
};

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostBySlug(params.slug, preview);

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
