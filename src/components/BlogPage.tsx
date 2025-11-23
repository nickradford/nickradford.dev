import classnames from "classnames";

import { ByLine } from "./ByLine";
import { BackButton } from "./BackButton";
import { Page } from "./Page";

import { BlogPost } from "../lib/content";
import { H2 } from "./Typography";
import { AtomLink } from "./AtomLink";

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPost;
};

export function BlogPage({ children, meta }: BlogPageProps) {
  const articleClasses = classnames(
    `relative mt-8 prose prose-zinc dark:prose-invert max-w-4xl`,
    `prose-headings:font-scp prose-headings:font-bold`,
    "dark:prose-headings:!text-zinc-100"
  );
  return (
    <Page>
      <article className={articleClasses}>
        <BackButton />
        <div className="mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-scp font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {meta.title}
          </h1>
          <ByLine meta={meta} />
          <AtomLink />
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-zinc-700 to-transparent"></div>

        {children}
      </article>
    </Page>
  );
}
