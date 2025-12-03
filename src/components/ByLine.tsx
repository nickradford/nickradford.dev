import { BlogPost } from "../lib/content";

type ByLineProps = {
  meta: BlogPost;
};

export function ByLine({ meta }: ByLineProps) {
  const getLocalDate = (date: Date) => {
    // Adjust for timezone offset to prevent UTC offset issues
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() + offset);
  };

  const displayDate = meta.date
    ? getLocalDate(new Date(meta.date))
    : new Date();

  return (
    <div className="flex items-center justify-between text-sm not-prose">
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-geist-mono">
        <span>Nick Radford</span>
        <span className="text-zinc-300 dark:text-zinc-600">&bull;</span>
        <time
          dateTime={meta.date ? new Date(meta.date).toISOString() : undefined}
        >
          {Intl.DateTimeFormat("en-us", { dateStyle: "medium" }).format(
            displayDate,
          )}
        </time>
      </div>
      <div className="hidden md:block text-xs font-geist-mono text-yellow">
        {meta.readingTime.text}
      </div>
    </div>
  );
}
