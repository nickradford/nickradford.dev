import { useState, useEffect } from "react";
import type { BlogPost } from "../lib/content";
import { BlogPostPreview } from "./BlogPostPreview";

const STORAGE_KEY = "astro-show-drafts";

interface HomepageBlogProps {
  posts: BlogPost[];
  hasMore: boolean;
}

export function HomepageBlog({ posts, hasMore }: HomepageBlogProps) {
  const [showDrafts, setShowDrafts] = useState(false);

  useEffect(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem(STORAGE_KEY) === "true";
    setShowDrafts(stored);

    // Listen for changes from DraftToggle
    const handleToggleChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setShowDrafts(customEvent.detail.enabled);
    };

    window.addEventListener("draft-toggle-changed", handleToggleChange);
    return () => {
      window.removeEventListener("draft-toggle-changed", handleToggleChange);
    };
  }, []);

  const filteredPosts = showDrafts
    ? posts
    : posts.filter((post) => !post.draft);

  return (
    <>

      {/* Blog Section Desktop */}
      <div className="w-full hidden md:flex flex-col space-y-0 divide-y divide-zinc-200 dark:divide-zinc-800">
        {filteredPosts.map((post) => (
          <div
            key={post.slug}
            className="flex divide-x divide-zinc-200 dark:divide-zinc-800"
          >
            <div className="flex-1" />
            <div className="max-w-4xl w-full">
              <BlogPostPreview post={post} />
            </div>
            <div className="flex-1" />
          </div>
        ))}
        {hasMore && filteredPosts.length > 0 && (
          <div className="flex divide-x divide-zinc-200 dark:divide-zinc-800">
            <div className="flex-1" />
            <div className="max-w-4xl w-full px-8 md:px-16 pt-6 pb-6">
              <a
                href="/blog"
                className="inline-block text-sm font-scp font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors border-b border-zinc-300 dark:border-zinc-700 pb-1"
              >
                view all →
              </a>
            </div>
            <div className="flex-1" />
          </div>
        )}
      </div>

      {/* Blog Section Mobile */}
      <div className="w-full md:hidden space-y-0 divide-y divide-zinc-200 dark:divide-zinc-800">
        {filteredPosts.map((post) => (
          <BlogPostPreview key={post.slug} post={post} />
        ))}
        {hasMore && filteredPosts.length > 0 && (
          <div className="px-8 pt-6 pb-6">
            <a
              href="/blog"
              className="inline-block text-sm font-scp font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors border-b border-zinc-300 dark:border-zinc-700 pb-1"
            >
              view all →
            </a>
          </div>
        )}
      </div>
    </>
  );
}
