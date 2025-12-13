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
    <div className="w-[1200px] h-[630px] bg-zinc-950 text-zinc-50 flex font-geist-mono flex-col">
      <header className="h-24 border-b-2 border-zinc-700 flex *:border-zinc-700 relative">
        <div className="border-r-2 w-24" />
        <div className="border-r-2 flex-1 px-12 flex items-center text-5xl">
          <p className="text-yellow">Nick Radford</p>
        </div>
        <div className="w-24" />
      </header>

      <main className="flex-1 border-zinc-700 flex *:border-zinc-700 border-b-2">
        <div className="border-r-2 w-24"></div>

        <div className="text-8xl font-bold leading-tight text-start flex-1 px-12 border-r-2 relative flex items-center">
          <h1>{post.data.title}</h1>
        </div>
        <div className="w-24" />
      </main>

      <footer className="h-24 border-zinc-700 flex *:border-zinc-700">
        <div className="border-r-2 w-24" />
        <div className="border-r-2 flex-1 flex items-center px-12 text-3xl justify-end text-zinc-500">
          <p>
            {getLocalDate(new Date(post.data.date)).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="w-24" />
      </footer>
    </div>
  );
}
