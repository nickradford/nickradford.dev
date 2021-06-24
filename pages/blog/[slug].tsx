import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import TimeAgo from "react-timeago";

import Page from "../../components/page";
import {
  getAllPostsWithSlug,
  getPostAndMorePosts,
  getPostBySlug,
} from "../../lib/api";
import { renderOptions } from "../../lib/contentful";

const Blog = ({ preview, post }) => (
  <Page pageTitle="This is the blog">
    <h1 className="text-2xl font-scp capitalize mb-2">{post.title}</h1>
    <p className="font-scp mb-2 text-sm">
      Published <TimeAgo date={post.date} />
    </p>
    <div className="prose">
      {documentToReactComponents(
        post.content.json,
        renderOptions(post.content.links)
      )}
    </div>
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
    fallback: true,
  };
}

export default Blog;
