import { type BlogPost } from "../lib/content";

type BlogPostPreviewProps = {
  post: BlogPost;
  animate?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
});

function getLocalDate(date: Date) {
  // Adjust for timezone offset to prevent UTC offset issues
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  const displayDate = getLocalDate(new Date(post.date));

  return (
    <a
      href={`/blog/${post.slug}`}
      key={post.slug}
      className="block group px-8 md:px-16 py-6 no-underline hover:text-inherit hover:bg-yellow/5 transition-colors"
    >
      <article className="flex flex-col space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <time className="text-xs uppercase tracking-widest text-yellow/75 dark:text-zinc-500 font-geist-mono">
              {dateFormatter.format(displayDate)}
            </time>
            {post.draft && (
              <span className="text-xs uppercase tracking-widest font-geist-mono font-medium px-2 py-1 bg-yellow/20 dark:bg-yellow/10 text-yellow rounded">
                Draft
              </span>
            )}
          </div>
          <h3 className="text-2xl font-geist-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-yellow dark:group-hover:text-yellow transition-colors">
            {post.title}
          </h3>
        </div>
        <p className="leading-relaxed text-zinc-700 dark:text-zinc-300 prose font-geist">
          {post.excerpt}
        </p>
        <span className="text-sm font-geist-mono font-medium text-zinc-600 group-hover:text-yellow dark:text-zinc-400 dark:group-hover:text-yellow transition-colors pt-2">
          Read more →
        </span>
      </article>
    </a>
  );
}
