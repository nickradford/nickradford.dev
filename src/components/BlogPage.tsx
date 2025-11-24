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
    `relative prose prose-zinc dark:prose-invert max-w-4xl`,
    `prose-headings:font-scp prose-headings:font-bold`,
    "dark:prose-headings:!text-zinc-100"
  );
  return (
    <Page>
      {/* Desktop Layout */}
      <article className="border-l border-r border-stone-200 dark:border-zinc-800 w-full hidden md:flex flex-col divide-y divide-stone-200 dark:divide-zinc-800">
        {/* Header Section */}
        <div className="flex divide-x divide-stone-200 dark:divide-zinc-800">
          <div className="flex-1 pt-8 px-8 md:px-16"></div>
          <div className="max-w-4xl w-full px-8 md:px-16 pt-8 pb-8">
            <BackButton />
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl md:text-4xl font-scp font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {meta.title}
              </h1>
              <ByLine meta={meta} />
              <AtomLink />
            </div>
          </div>
          <div className="flex-1 pt-8 px-8 md:px-16"></div>
        </div>

        {/* Content Section */}
        <div className="flex divide-x divide-stone-200 dark:divide-zinc-800">
          <div className="flex-1"></div>
          <div className="max-w-4xl w-full px-8 md:px-16 py-8 pb-12">
            <div className={articleClasses}>
              {children}
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </article>

      {/* Mobile Layout */}
      <article className="md:hidden w-full border-l border-r border-stone-200 dark:border-zinc-800 space-y-0 divide-y divide-stone-200 dark:divide-zinc-800">
        {/* Header Section */}
        <div className="px-8 py-8">
          <BackButton />
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl md:text-4xl font-scp font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {meta.title}
            </h1>
            <ByLine meta={meta} />
            <AtomLink />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          <div className={articleClasses}>
            {children}
          </div>
        </div>
      </article>
    </Page>
  );
}
