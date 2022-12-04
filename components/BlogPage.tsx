import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import Page from "./page";

import headshot from "public/headshot.jpg";

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
  return (
    <Page>
      <article className="relative m-auto mt-8 prose prose-zinc dark:prose-invert prose-headings:font-plex">
        <a
          className="absolute mr-8 no-underline -translate-x-[calc(100%+32px)]  bg-zinc-800 p-2 rounded-full text-zinc-400 cursor-pointer hover:bg-zinc-700 transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </a>
        <h1>{meta.title}</h1>
        {/* TODO: Improve the byline */}
        <div className="flex items-center justify-between my-10 text-sm not-prose text-zinc-400">
          <div className="flex items-center gap-2">
            <Image
              src={headshot}
              alt={meta.author}
              className="rounded-full w-7 h-7 ring-1 ring-zinc-300/75"
            />
            <div>Nick Radford</div>
            <span>&bull;</span>
            <div>
              {Intl.DateTimeFormat("en-us", { dateStyle: "long" }).format(
                meta.date ? new Date(meta.date) : new Date()
              )}
            </div>
          </div>
          <div>
            <ul className="flex gap-2">
              <li>{meta.readingTime.words} words</li>
              <li>&bull;</li>
              <li>{meta.readingTime.text}</li>
            </ul>
          </div>
        </div>
        {children}
      </article>
    </Page>
  );
}

export default BlogPage;
