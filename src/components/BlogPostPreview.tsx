import React from "react";
import { BlogPost } from "../lib/content";
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
    <motion.a
      href={`/blog/${post.slug}`}
      key={post.slug}
      className="block group px-8 md:px-16 py-6 no-underline hover:text-inherit"
      initial={false}
      animate={{ opacity: 1 }}
      layoutId={animate ? post.slug : undefined}
    >
      <article className="space-y-3">
        <div className="space-y-2">
          <time className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-500 font-scp font-medium">
            {dateFormatter.format(new Date(post.date))}
          </time>
          <h3 className="text-lg md:text-xl font-scp font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-yellow dark:group-hover:text-yellow transition-colors">
            {post.title}
          </h3>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-2xl pt-1">
          {post.excerpt}
        </p>
        <span className="inline-block text-sm font-scp font-medium text-zinc-600 group-hover:text-yellow dark:text-zinc-400 dark:group-hover:text-yellow transition-colors pt-2">
          Read more →
        </span>
      </article>
    </motion.a>
  );
}
