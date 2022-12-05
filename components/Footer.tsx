import cn from "classnames";
import { links } from "links";

import { ExternalLink } from "./ExternalLink";
import { NowPlaying } from "./NowPlaying";

export function Footer() {
  const linkClasses = cn(
    "text-zinc-600 transition-colors p-2 inline-block",
    "dark:text-zinc-200",
    "hover:text-sky-600",
    "first-of-type:-ml-2"
  );

  const footerClasses = cn(
    `z-10 flex flex-col items-center justify-between w-full gap-4 py-6 mt-8 border-t border-t-zinc-300`,
    `md:flex-row`,
    `dark:border-zinc-800/75`
  );

  return (
    <footer className={footerClasses}>
      <nav className="flex flex-wrap justify-center text-sm gap-x-6 gap-y-1 text-zinc-400">
        {links.map(([href, label]) => (
          <ExternalLink key={href} href={href} className={linkClasses}>
            {label}
          </ExternalLink>
        ))}

        <NowPlaying interval={10000} />
      </nav>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        &copy; {new Date().getFullYear()} Nick Radford &bull; All rights
        reserved
      </span>
    </footer>
  );
}
