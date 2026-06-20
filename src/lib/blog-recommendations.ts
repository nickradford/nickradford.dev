import type { BlogPost } from "./content";

export type RelatedPost = {
  post: BlogPost;
  sharedTags: string[];
};

export type AdjacentPosts = {
  newer?: BlogPost;
  older?: BlogPost;
};

function byNewestFirst(posts: BlogPost[]) {
  return [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());
}

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function getLatestReadMorePosts(
  posts: BlogPost[],
  currentSlug: string,
  limit = 3,
) {
  return byNewestFirst(posts)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);
}

export function getAdjacentPosts(
  posts: BlogPost[],
  currentSlug: string,
): AdjacentPosts {
  const sortedPosts = byNewestFirst(posts);
  const currentIndex = sortedPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return {};
  }

  return {
    newer: sortedPosts[currentIndex - 1],
    older: sortedPosts[currentIndex + 1],
  };
}

export function getRelatedPostsByTags(
  posts: BlogPost[],
  currentPost: BlogPost,
  limit = 3,
): RelatedPost[] {
  const currentTags = new Set((currentPost.tags ?? []).map(normalizeTag));

  if (currentTags.size === 0) {
    return [];
  }

  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = (post.tags ?? []).filter((tag) =>
        currentTags.has(normalizeTag(tag)),
      );

      return { post, sharedTags };
    })
    .filter(({ sharedTags }) => sharedTags.length > 0)
    .sort((a, b) => {
      const scoreDelta = b.sharedTags.length - a.sharedTags.length;

      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return b.post.date.getTime() - a.post.date.getTime();
    })
    .slice(0, limit);
}
