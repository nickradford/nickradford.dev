import Image from "next/image";

import headshot from "public/headshot.jpg";
import { BlogPost } from "@/src/lib/content";

type ByLineProps = {
  meta: BlogPost;
};

export function ByLine({ meta }: ByLineProps) {
  return (
    <div className="flex items-center justify-between text-sm not-prose text-zinc-500 dark:text-zinc-400">
      <div className="flex items-center gap-2 ">
        <Image
          src={headshot}
          alt="Nick Radford"
          className="rounded-full w-7 h-7 ring-1 ring-zinc-500 dark:ring-zinc-300/75"
        />
        <div>Nick Radford</div>
        <span>&bull;</span>
        <div className="md:hidden">
          {Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(
            meta.date ? new Date(meta.date) : new Date()
          )}
        </div>
        <div className="hidden md:block">
          {Intl.DateTimeFormat("en-us", { dateStyle: "long" }).format(
            meta.date ? new Date(meta.date) : new Date()
          )}
        </div>
      </div>
      <div>
        <ul className="flex gap-2">
          <li className="hidden md:block">{meta.readingTime.words} words</li>
          <li className="hidden md:block">&bull;</li>
          <li>{meta.readingTime.text}</li>
        </ul>
      </div>
    </div>
  );
}
