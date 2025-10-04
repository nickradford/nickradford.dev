import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

import { BlogPost } from "@/src/lib/content";
import { H3 } from "./Typography";
import { motion } from "framer-motion";

type BlogPostPreviewProps = {
  post: BlogPost;
  animate?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "GMT",
});

export function BlogPostPreview({
  post,
  animate = false,
}: BlogPostPreviewProps) {
  return (
    <motion.article
      key={post.slug}
      className="relative space-y-4 group isolate"
      initial={animate && { opacity: 0 }}
      animate={animate && { opacity: 1 }}
      exit={animate && { opacity: 0 }}
      layoutId={animate && post.slug}
    >
      <>
        <div className="absolute transition-all scale-95 rounded-2xl -z-10 group-hover:bg-zinc-200/75 dark:group-hover:bg-zinc-800/50 -inset-6 group-hover:scale-100"></div>
        <time className="px-4 text-sm border-l-4 dark:border-zinc-500 border-zinc-600 dark:text-zinc-500 text-zinc-600 ">
          {dateFormatter.format(new Date(post.date))}
        </time>
        <a href={`/blog/${post.slug}`} className="block">
          <span className="absolute -inset-5" />
          <H3 className="text-base font-semibold tracking-tight">
            {post.title}
          </H3>
        </a>
        <p className="text-sm whitespace-pre-line text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>

        <p className="flex items-center gap-1 text-sm pointer-events-none text-sky-600">
          Read article{" "}
          <ChevronRightIcon className="relative w-4 h-4 top-[0.5px]" />
        </p>
      </>
    </motion.article>
  );
}
