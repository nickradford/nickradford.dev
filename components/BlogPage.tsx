import classnames from "classnames";

import { ByLine } from "./ByLine";
import { BackButton } from "./BackButton";
import { Page } from "./Page";

import { BlogPost } from "@/lib/content";
import { H2 } from "./Typography";

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPost;
};

export function BlogPage({ children, meta }: BlogPageProps) {
  const articleClasses = classnames(
    `relative m-auto mt-8 prose prose-zinc dark:prose-invert`,
    `prose-headings:font-plex",
    "dark:prose-headings:!text-zinc-100`
  );
  return (
    <Page pageTitle={meta.title}>
      <article className={articleClasses}>
        <BackButton />
        <H2>{meta.title}</H2>
        <ByLine meta={meta} />
        {children}
      </article>
    </Page>
  );
}
