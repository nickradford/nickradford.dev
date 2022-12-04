import { BlogPost } from "@/lib/content";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type BlogPostPreviewProps = {
  post: BlogPost;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "GMT",
});

function BlogPostPreview({ post }: BlogPostPreviewProps): JSX.Element {
  return (
    <article key={post.slug} className="relative space-y-4 group isolate">
      <>
        <div className="absolute transition-all scale-95 rounded-2xl -z-10 group-hover:bg-zinc-800/50 -inset-6 group-hover:scale-100"></div>
        <time className="px-4 text-sm border-l-4 border-zinc-500 text-zinc-500 ">
          {dateFormatter.format(new Date(post.date))}
        </time>
        <Link href={`/blog/${post.slug}`} className="block">
          <span className="absolute -inset-5" />
          <h3 className="text-base font-semibold tracking-tight text-zinc-100 font-plex">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm whitespace-pre-line text-zinc-400">
          {post.excerpt}
        </p>

        <p className="flex items-center gap-1 text-sm pointer-events-none text-sky-600">
          Read article{" "}
          <ChevronRightIcon className="relative w-4 h-4 top-[0.5px]" />
        </p>
      </>
    </article>
  );
}

export default BlogPostPreview;
