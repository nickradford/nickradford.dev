import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import cn from "classnames";

import Page from "./page";
import ByLine from "./byLine";
import BackButton from "./BackButton";

export type BlogPageMeta = {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPageMeta;
};

function BlogPage({ children, meta }: BlogPageProps) {
  const articleClasses = cn(
    `relative m-auto mt-8 prose prose-zinc !prose-invert`,
    `prose-headings:font-plex prose-headings:text-zinc-100`
  );
  return (
    <Page pageTitle={meta.title}>
      <article className={articleClasses}>
        <BackButton />
        <h1>{meta.title}</h1>
        <ByLine meta={meta} />
        {children}
      </article>
    </Page>
  );
}

export default BlogPage;
