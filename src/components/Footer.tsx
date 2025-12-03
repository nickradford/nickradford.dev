import cn from "classnames";
import { links } from "links";

import { ExternalLink } from "./ExternalLink";

export function Footer() {
  const linkClasses = cn(
    "text-sm font-geist-mono font-medium text-zinc-600 transition-colors hover:text-yellow",
    "dark:text-zinc-400 dark:hover:text-yellow",
  );

  return (
    <>
      {/* Desktop Footer */}
      <footer className="w-full hidden md:flex border border-yellow/20 dark:border-zinc-800 divide-x divide-yellow/20 dark:divide-zinc-800">
        <div className="flex-1 px-8 md:px-16 py-6"></div>
        <div className="max-w-4xl w-full flex divide-x divide-yellow/20 dark:divide-zinc-800">
          <nav className="flex-1 flex border-yellow/20 dark:divide-zinc-800 px-8 md:px-16">
            {links.map(([href, label]) => (
              <ExternalLink
                key={href}
                href={href}
                className="block py-6 px-8 md:px-4 text-sm font-geist-mono font-medium text-zinc-600 transition-colors hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow border-l last:border-r hover:bg-yellow/5 border-yellow/20 dark:border-zinc-800"
              >
                {label}
              </ExternalLink>
            ))}
          </nav>
          <span className="flex items-center px-8 md:px-16 py-6 text-sm text-yellow dark:text-zinc-400 border-l border-yellow/20 dark:border-zinc-800">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
        <div className="flex-1 px-8 md:px-16 py-6"></div>
      </footer>

      {/* Mobile Footer */}
      <footer className="w-full md:hidden border-t border-yellow/20 dark:border-zinc-800 px-8 py-6">
        <nav className="flex flex-wrap justify-center gap-8 mb-4">
          {links.map(([href, label]) => (
            <ExternalLink key={href} href={href} className={linkClasses}>
              {label}
            </ExternalLink>
          ))}
        </nav>
        <div className="text-center">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            &copy; {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </>
  );
}
