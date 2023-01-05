import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareRss } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { BASE_URL } from "@/lib/url";
import { ExternalLink } from "./ExternalLink";

export function AtomLink() {
  return (
    <ExternalLink
      href={`${BASE_URL}/api/feeds/atom.xml`}
      className="inline-block p-2 -ml-2 group"
      title="Add to your feed reader"
    >
      <FontAwesomeIcon
        icon={faSquareRss}
        className="transition-colors text-zinc-500 dark:text-zinc-300 group-hover:text-sky-600 "
        size="lg"
      />
    </ExternalLink>
  );
}
