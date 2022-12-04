import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import cn from "classnames";

import Page from "./page";
import ByLine from "./byLine";

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
  const router = useRouter();

  const backBtnClasses = cn(
    "fixed bottom-8 right-0 mr-8 z-50 no-underline bg-black p-2 rounded-full text-zinc-200 cursor-pointer hover:bg-zinc-700 transition-colors",
    "md:absolute md:top-0 md:left-0 md:bottom-auto md:right-auto md:bg-zinc-800 md:-translate-x-[calc(100%+2rem)]"
  );

  const articleClasses = cn(
    `relative m-auto mt-8 prose prose-zinc !prose-invert`,
    `prose-headings:font-plex prose-headings:text-zinc-100`
  );
  return (
    <Page>
      <article className={articleClasses}>
        <a className={backBtnClasses} onClick={() => router.back()}>
          <ArrowLeftIcon className="w-6 h-6" />
        </a>
        <h1 className="font-plex">{meta.title}</h1>
        <ByLine meta={meta} />
        {children}
      </article>
    </Page>
  );
}

export default BlogPage;
