import classnames from "classnames";

import { ByLine } from "./ByLine";
import { BackButton } from "./BackButton";
import { Page } from "./Page";

import { type BlogPost } from "../lib/content";
import { AtomLink } from "./AtomLink";
import { DecodeText } from "./DecodeText";

type BlogPageProps = {
  children: React.ReactNode;
  meta: BlogPost;
};

export function BlogPage({ children, meta }: BlogPageProps) {
  const articleClasses = classnames(
    `relative prose prose-zinc dark:prose-invert max-w-4xl`,
    `prose-headings:font-geist-mono prose-headings:font-bold font-geist text-lg`,
    "dark:prose-headings:!text-zinc-100",
  );
  return (
    <Page>
      {/* Desktop Layout */}
      <article className="border-l border-r border-yellow/20 dark:border-zinc-800 w-full hidden md:flex flex-col divide-y divide-yellow/20 dark:divide-zinc-800">
        {/* Header Section */}
        <div className="flex divide-x divide-yellow/20 dark:divide-zinc-800">
          <div className="flex-1 pt-8 px-8 md:px-16"></div>
          <div className="max-w-4xl w-full px-8 md:px-16 pt-8">
            <BackButton />
            <div className="mb-8 space-y-4">
              <DecodeText
                decodeByWord
                initialDelay={0}
                revealInterval={40}
                className="text-3xl md:text-4xl font-geist-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
                value={meta.title}
              />
              <ByLine meta={meta} />
              <AtomLink />
            </div>
          </div>
          <div className="flex-1 pt-8 px-8 md:px-16"></div>
        </div>

        {/* Content Section */}
        <div className="flex divide-x divide-yellow/20 dark:divide-zinc-800">
          <div className="flex-1"></div>
          <div className="max-w-4xl w-full px-8 md:px-16 py-8 pb-12">
            <div className={articleClasses}>{children}</div>
          </div>
          <div className="flex-1"></div>
        </div>
      </article>

      {/* Mobile Layout */}
      <article className="md:hidden w-full border-l border-r border-yellow/20 dark:border-zinc-800 space-y-0 divide-y divide-yellow/20 dark:divide-zinc-800">
        {/* Header Section */}
        <div className="px-8 py-8">
          <BackButton />
          <div className=" space-y-4">
            <h1 className="text-3xl md:text-4xl font-geist-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {meta.title}
            </h1>
            <ByLine meta={meta} />
            <AtomLink />
          </div>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          <div className={articleClasses}>{children}</div>
        </div>
      </article>
    </Page>
  );
}
