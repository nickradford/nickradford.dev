import Page from "./page";

export type BlogPageMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
};

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPageMeta;
};

function BlogPage({ children, meta }: BlogPageProps) {
  return (
    <Page>
      <time>{meta.date}</time>
      <article className="prose prose-zinc dark:prose-invert">
        {children}
      </article>
    </Page>
  );
}

export default BlogPage;
