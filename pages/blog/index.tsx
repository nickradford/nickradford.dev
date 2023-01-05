import { GetServerSideProps } from "next";

import { BlogPostPreview, H1, Page, Text } from "@/components";
import { BlogPost, getLatestPosts, TagEntry } from "@/lib/content";
import { getImage } from "@/lib/og";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "@heroicons/react/24/outline";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { AtomLink } from "@/components/AtomLink";

function sortByCount(a: TagEntry, b: TagEntry) {
  return a.count > b.count
    ? -1
    : a.count < b.count
    ? 1
    : a.label < b.label
    ? -1
    : 1;
}

const description = `A collection of my random musings; usually centered around frontend
topics. Join me as I explore new technologies, share my experiences,
and learn from others.`;

function filterByTag(tag: string) {
  return (post: BlogPost) => {
    if (!tag) {
      return true;
    } else {
      return post.tags.includes(tag);
    }
  };
}

function Index({
  posts,
  tagMap,
  tag,
  postsByTag,
}: {
  posts: BlogPost[];
  tagMap: Record<string, TagEntry>;
  postsByTag: Record<string, BlogPost[]>;
  tag?: string;
}) {
  const [selectedTag, setSelectedTag] = useState<string>(tag);
  const router = useRouter();

  useEffect(() => {
    if (tag !== selectedTag) {
      // router.push(new URL({ ...router.querysearch: `tag=${selectedTag}` }));
      router.push({
        pathname: "/blog",
        query: selectedTag ? { tag: selectedTag } : null,
      });
    }
  }, [router, selectedTag, tag]);

  let filteredPosts = posts;

  if (selectedTag) {
    filteredPosts = postsByTag[selectedTag];
  }

  return (
    <Page>
      <NextSeo
        title="Blog"
        description={description}
        openGraph={{
          images: [
            {
              url: getImage({
                title: "Blog",
                subtitle:
                  "A collection of my writing on software engineering, tech, and things I've recently learned.",
                showSubtitle: true,
              }),
            },
          ],
        }}
      />
      <header className="mb-16 space-y-6">
        <H1>All posts</H1>
        <div>
          <Text>{description}</Text>
          <AtomLink />
        </div>
      </header>
      <div className="flex flex-col grid-cols-5 md:grid">
        <motion.section className="col-span-3 space-y-12" layout>
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <BlogPostPreview key={post.slug} post={post} animate />
            ))}
          </AnimatePresence>
        </motion.section>
        <aside className="self-start hidden w-1/2 col-span-2 col-start-4 p-4 mx-auto space-y-6 border shadow-md md:block rounded-2xl dark:border-zinc-700 border-zinc-300">
          <h3 className="flex items-center gap-4 text-sm font-semibold font-plex dark:text-zinc-100 text-zinc-700">
            <TagIcon className="w-6" />
            Tags
          </h3>
          <ul className="space-y-1 text-sm text-zinc-500 dark:text-zinc-500">
            {Object.keys(tagMap)
              .map((key) => tagMap[key])
              .sort(sortByCount)
              .map((tag) => (
                <li
                  key={tag.slug}
                  className={`flex justify-between px-3 py-2 transition-colors rounded cursor-pointer dark:hover:bg-zinc-800 dark:hover:text-zinc-300 group hover:bg-zinc-200 ${
                    selectedTag === tag.slug &&
                    "dark:bg-zinc-800 dark:text-zinc-300 bg-zinc-200"
                  }`}
                  onClick={() =>
                    setSelectedTag((slug) =>
                      tag.slug === slug ? null : tag.slug
                    )
                  }
                >
                  <span className="font-semibold">{tag.label}</span>
                  <div className="relative">
                    <span
                      className={`absolute right-0 transition-opacity ${
                        selectedTag == tag.slug && "group-hover:opacity-0"
                      }`}
                    >
                      {tag.count}
                    </span>
                    <span
                      className={`absolute right-0 transition-opacity opacity-0 ${
                        selectedTag == tag.slug && "group-hover:opacity-100"
                      }`}
                    >
                      <XMarkIcon className="relative w-5 left-1.5" />
                    </span>
                  </div>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </Page>
  );
}

export default Index;
const ONE_DAY_IN_SECONDS = 24 * 60 * 60;
const THIRTY_DAYS_IN_SECONDS = 30 * ONE_DAY_IN_SECONDS;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${THIRTY_DAYS_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
  );

  const { posts, tagMap, postsByTag } = await getLatestPosts();
  return {
    props: { posts, tagMap, postsByTag, tag: query?.tag ?? null },
  };
};
