import "../styles/tailwind.css";

import { formatDate } from "@lib/format-date";
import Frame from "./Frame";

type SocialCardPost = {
  slug: string;
  data: {
    title: string;
    ogTitle?: string;
    ogSubtitle?: string;
    date: Date;
  };
};

export function SocialCard({ posts }: { posts: SocialCardPost[] }) {
  const searchParams = new URLSearchParams(window.location.search);
  const slug = searchParams.get("slug");
  const isBaseImage = searchParams.get("base") === "1";
  const post = posts.find((post) => post.slug === slug);

  if (!post && !isBaseImage) {
    return null;
  }

  const title = post?.data.ogTitle?.trim() || post?.data.title;
  const subtitle = post?.data.ogSubtitle?.trim();
  const footerText = post ? formatDate(post.data.date) : "nickradford.dev";

  return (
    <div className="w-[1200px] h-[630px] bg-zinc-950 text-zinc-50 flex font-geist-mono flex-col">
      <header className="h-24 border-b-2 border-zinc-700 flex *:border-zinc-700 relative">
        <div className="border-r-2 w-24" />
        <div className="border-r-2 flex-1 px-12 flex items-center text-5xl">
          <p className="text-accent">Nick Radford</p>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex-1 border-zinc-700 flex *:border-zinc-700 border-b-2">
        <div className="border-r-2 w-24"></div>

        <div className="text-start flex-1 px-12 border-r-2 relative flex items-center">
          <Frame corners={["all"]} />
          <div className="flex w-full min-w-0 flex-col gap-7">
            {post ? (
              <>
                <h1
                  className={`min-w-0 font-bold leading-tight text-balance ${
                    subtitle ? "text-6xl" : "text-8xl"
                  }`}
                >
                  {title}
                </h1>
                {subtitle && (
                  <p className="max-w-[900px] text-4xl font-medium leading-snug text-zinc-400 text-balance">
                    {subtitle}
                  </p>
                )}
              </>
            ) : (
              <h1 className="text-7xl/normal font-bold">
                Making <mark className="">Complex&nbsp;Workflows</mark> Feel
                Effortless
              </h1>
            )}
          </div>
        </div>
        <div className="w-24" />
      </main>

      <footer className="h-24 border-zinc-700 flex *:border-zinc-700">
        <div className="border-r-2 w-24" />
        <div className="border-r-2 flex-1 flex items-center px-12 text-3xl justify-end text-zinc-500">
          <p>{footerText}</p>
        </div>
        <div className="w-24" />
      </footer>
    </div>
  );
}
