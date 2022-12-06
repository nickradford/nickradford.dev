import { BlogPostPreview, H1, Page, Text } from "@/components";
import { BlogPost, getLatestPosts } from "@/lib/content";
import { getImage } from "@/lib/og";
import { NextSeo } from "next-seo";

const description = `A collection of my random musings; usually centered around frontend
topics. Join me as I explore new technologies, share my experiences,
and learn from others.`;
function Index({ posts }: { posts: BlogPost[] }) {
  return (
    <Page>
      <NextSeo
        title="Blog"
        description={description}
        openGraph={{
          images: [
            {
              url: getImage({
                title: "Blog",
                subtitle:
                  "A collection of my writing on software engineering, tech, and things I've recently learned.",
                showSubtitle: true,
              }),
            },
          ],
        }}
      />
      <header className="mb-16 space-y-6">
        <H1>All posts</H1>
        <Text>{description}</Text>
      </header>
      <div className="flex flex-col grid-cols-5 md:grid">
        <section className="col-span-3 space-y-12">
          {posts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
        </section>
      </div>
    </Page>
  );
}

export default Index;

export async function getStaticProps() {
  const { posts } = await getLatestPosts();
  return {
    props: { posts },
  };
}
