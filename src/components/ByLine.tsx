import { type BlogPost } from "../lib/content";

type ByLineProps = {
  meta: BlogPost;
};

export function ByLine({ meta }: ByLineProps) {
  const getLocalDate = (date: Date) => {
    // Adjust for timezone offset to prevent UTC offset issues
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
  };

  const displayDate = meta.date ? getLocalDate(new Date(meta.date)) : new Date();

  return (
    <div className="flex items-center justify-between text-sm not-prose">
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-geist-mono text-xs md:text-sm">
        <span>Nick Radford</span>
        <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
        <time dateTime={meta.date ? new Date(meta.date).toISOString() : undefined}>
          <span className="hidden md:block">
            {Intl.DateTimeFormat("en-us", { dateStyle: "long" }).format(displayDate)}
          </span>
          <span className="md:hidden">
            {Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(displayDate)}
          </span>
        </time>
        <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>

        <div className="font-geist-mono text-yellow">{meta.readingTime.text}</div>
      </div>
    </div>
  );
}
