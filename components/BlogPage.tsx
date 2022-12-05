import classnames from "classnames";

import { ByLine } from "./ByLine";
import { BackButton } from "./BackButton";
import { Page } from "./Page";

import { BlogPost } from "@/lib/content";

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPost;
};

export function BlogPage({ children, meta }: BlogPageProps) {
  const articleClasses = classnames(
    `relative m-auto mt-8 prose prose-zinc !prose-invert`,
    `prose-headings:font-plex prose-headings:!text-zinc-100`
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
