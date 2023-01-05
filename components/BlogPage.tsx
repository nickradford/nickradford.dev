import classnames from "classnames";

import { ByLine } from "./ByLine";
import { BackButton } from "./BackButton";
import { Page } from "./Page";

import { BlogPost } from "@/lib/content";
import { H2 } from "./Typography";
import { AtomLink } from "./AtomLink";

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
    <Page>
      <article className={articleClasses}>
        <BackButton />
        <H2>{meta.title}</H2>
        <div className="my-10 space-y-2">
          <ByLine meta={meta} />
          <AtomLink />
        </div>

        {children}
      </article>
    </Page>
  );
}
