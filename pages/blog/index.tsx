import { BlogPostPreview, H1, H2, H3, Page, Text } from "@/components";
import { BlogPost, getLatestPosts } from "@/lib/content";

function Index({ posts }: { posts: BlogPost[] }) {
  return (
    <Page pageTitle="Blog">
      <header className="mb-16 space-y-6">
        <H1>All posts</H1>
        <Text>
          A collection of my random musings; usually centered around frontend
          topics. Join me as I explore new technologies, share my experiences,
          and learn from others.
        </Text>
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
