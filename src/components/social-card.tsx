import "../styles/tailwind.css";

function getLocalDate(date: Date) {
  // Adjust for timezone offset to prevent UTC offset issues
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
}

export function SocialCard({ posts }: { posts: any[] }) {
  const searchParams = new URLSearchParams(window.location.search);
  const slug = searchParams.get("slug");
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return null;
  }

  return (
    <div className="flex h-[630px] w-[1200px] flex-col bg-zinc-950 font-geist-mono text-zinc-50">
      <header className="relative flex h-24 border-b-2 border-zinc-700 *:border-zinc-700">
        <div className="w-24 border-r-2" />
        <div className="flex flex-1 items-center border-r-2 px-12 text-5xl">
          <p className="text-orange">Nick Radford</p>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex flex-1 border-b-2 border-zinc-700 *:border-zinc-700">
        <div className="w-24 border-r-2"></div>

        <div className="relative flex flex-1 items-center border-r-2 px-12 text-start text-8xl font-bold leading-tight">
          <h1>{post.data.title}</h1>
        </div>
        <div className="w-24" />
      </main>

      <footer className="flex h-24 border-zinc-700 *:border-zinc-700">
        <div className="w-24 border-r-2" />
        <div className="flex flex-1 items-center justify-end border-r-2 px-12 text-3xl text-zinc-500">
          <p>
            {getLocalDate(new Date(post.data.date)).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            )}
          </p>
        </div>
        <div className="w-24" />
      </footer>
    </div>
  );
}
