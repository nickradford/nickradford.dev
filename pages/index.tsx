import Image from "next/image";
import Link from "next/link";

import {
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  BlogPostPreview,
  Button,
  ExternalLink,
  H1,
  JobItem,
  Page,
  Text,
} from "@/components";

import { getLatestPosts, BlogPost } from "lib/content";

import jobs from "jobs";
import { links } from "links";

import headshot from "public/headshot.jpg";
import { useEffect } from "react";
import { getNowPlaying } from "@/lib/spotify";

export default function Home({
  posts = [],
  hasMore = false,
}: {
  posts: BlogPost[];
  hasMore: boolean;
}) {
  return (
    <Page includeNameInpageTitle={false}>
      {/* Hero section */}
      <header className="mb-16 space-y-6">
        <Image
          src={headshot}
          placeholder="blur"
          alt="me"
          className="w-20 rounded-full shadow-xl dark:bg-zinc-700 ring-2 dark:ring-zinc-300 ring-zinc-500"
          priority
        />
        <H1 className="max-w-[28ch]">
          Software engineer, pool shark, and amateur improviser.
        </H1>

        <Text>{`I'm Nick, a software engineer from San Francisco with over 10 years of experience building compelling user interfaces and products that people love to use. With a passion for clean code and thoughtful design, I enjoy building intuitive interfaces that make complex problems easy to solve.`}</Text>

        <ul className="flex">
          {links.map(([href, , icon]) => (
            <ExternalLink
              key={href}
              href={href}
              className="p-2 first-of-type:-ml-2 group"
            >
              <FontAwesomeIcon
                icon={icon}
                className="transition-colors text-zinc-500 dark:text-zinc-300 group-hover:text-sky-600 "
                size="lg"
              />
            </ExternalLink>
          ))}
        </ul>
      </header>
      <div className="flex flex-col grid-cols-5 gap-20 md:grid">
        <section className="col-span-3 space-y-12">
          {posts.map((post) => (
            <BlogPostPreview key={post.slug} post={post} />
          ))}
          {hasMore && (
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-semibold text-zinc-300 font-plex"
            >
              More posts <ChevronRightIcon className="w-5 h-5" />
            </Link>
          )}
        </section>
        <section className="col-span-2">
          <div className="sticky p-5 space-y-8 border shadow-md rounded-2xl border-zinc-300/75 dark:border-zinc-700/75 top-16">
            <h3 className="flex items-end gap-4">
              <BuildingOffice2Icon className="w-6 h-6" />
              <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-100 font-plex">
                Work
              </span>
            </h3>
            <ol className="space-y-4">
              {jobs.map((job) => (
                <JobItem key={job.company} {...job} />
              ))}
            </ol>
            {/* <Button>
              Download Resume <ArrowDownTrayIcon className="w-5 h-5" />
            </Button> */}
          </div>
        </section>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const { posts, hasMore } = await getLatestPosts(3);

  return {
    props: { posts, hasMore },
  };
}
