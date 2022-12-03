import Image from "next/image";
import Link from "next/link";

import {
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ReactMarkdown from "react-markdown";
import unlink from "remark-unlink";

import { Button } from "@/components/button";
import { ExternalLink } from "@/components/ExternalLink";
import { JobItem } from "@/components/jobItem";
import Page from "@/components/page";

import { getAllPostsForHome } from "lib/api";
import type { BlogPost } from "lib/api";

import headshot from "public/headshot.jpg";
import jobs from "jobs";
import { links } from "links";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default function Home({ posts }: { posts: BlogPost[] }) {
  return (
    <Page includeNameInpageTitle={false}>
      {/* Hero section */}
      <header className="mb-16 space-y-6">
        <Image
          src={headshot}
          alt="me"
          className="w-20 rounded-full shadow-md bg-zinc-700 ring-2 ring-zinc-300"
        />
        <h1 className="text-2xl tracking-tighter md:text-6xl">
          Software engineer, pool shark, and
          <br className="hidden md:block" /> amateur improviser.
        </h1>

        <p className="max-w-[80ch] leading-8  text-zinc-400">{`I'm Nick, a software engineer from San Francisco with over 10 years of experience building compelling user interfaces and products that people love to use. With a passion for clean code and thoughtful design, I enjoy building intuitive interfaces that make complex problems easy to solve.`}</p>

        <ul className="flex">
          {links.map(([href, label, icon]) => (
            <ExternalLink
              key={href}
              href={href}
              className="p-2 first-of-type:-ml-2 group"
            >
              <FontAwesomeIcon
                icon={icon}
                className="transition-colors text-zinc-300 group-hover:text-sky-600"
                size="lg"
              />
            </ExternalLink>
          ))}
        </ul>
      </header>

      <div className="flex flex-col grid-cols-5 gap-20 md:grid">
        <section className="col-span-3 space-y-12">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="relative space-y-4 group isolate"
            >
              <div className="absolute transition-all scale-95 rounded-2xl -z-10 group-hover:bg-zinc-800/50 -inset-6 group-hover:scale-100"></div>
              <time className="px-4 text-sm border-l-4 border-zinc-500 text-zinc-500 ">
                {dateFormatter.format(new Date(post.date))}
              </time>
              <Link href={`/posts/${post.slug}`} className="block">
                <span className="absolute -inset-5" />
                <h3 className="text-base font-semibold tracking-tight text-zinc-100">
                  {post.title}
                </h3>
              </Link>
              <ReactMarkdown
                remarkPlugins={[unlink]}
                className="text-sm text-zinc-400"
              >
                {post.content.split(/\n/)[0]}
              </ReactMarkdown>
              <p className="flex items-center gap-1 text-sm pointer-events-none text-zinc-300 text-sky-600">
                Read article{" "}
                <ChevronRightIcon className="relative w-4 h-4 top-[0.5px]" />
              </p>
            </article>
          ))}
        </section>
        <section className="col-span-2">
          <div className="sticky p-5 space-y-8 border shadow-md rounded-2xl border-zinc-700/75 top-16">
            <h3 className="flex items-end gap-4">
              <BuildingOffice2Icon className="w-6 h-6" />
              <span className="text-sm font-semibold text-zinc-100">Work</span>
            </h3>
            <ol className="space-y-4">
              {jobs.map((job) => (
                <JobItem key={job.company} {...job} />
              ))}
            </ol>
            <Button>
              Download Resume <ArrowDownTrayIcon className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPostsForHome();

  return { props: { posts } };
};
