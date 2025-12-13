import { RssIcon } from "@phosphor-icons/react";
import { SITE } from "../lib/site";
import { ExternalLink } from "./ExternalLink";

export function AtomLink() {
  return (
    <ExternalLink href={`${SITE}/feeds/atom.xml`} className="inline-block p-2 -ml-2 group">
      <RssIcon
        className="transition-colors text-zinc-600 dark:text-zinc-300 group-hover:text-yellow size-5"
        aria-labelledby="rss-feed"
      />
      <span className="sr-only" id="rss-feed">
        RSS Feed
      </span>
    </ExternalLink>
  );
}
