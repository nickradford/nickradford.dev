import React from "react";

import headshot from "../images/headshot.jpg";
import { BlogPost } from "../lib/content";

type ByLineProps = {
  meta: BlogPost;
};

export function ByLine({ meta }: ByLineProps) {
  return (
    <div className="flex items-center justify-between text-sm not-prose">
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-scp">
        <span>Nick Radford</span>
        <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
        <time dateTime={meta.date ? new Date(meta.date).toISOString() : undefined}>
          {Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(
            meta.date ? new Date(meta.date) : new Date()
          )}
        </time>
      </div>
      <div className="hidden md:block text-xs font-scp text-yellow">
        {meta.readingTime.text}
      </div>
    </div>
  );
}
