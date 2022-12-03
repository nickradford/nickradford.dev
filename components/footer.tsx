import cn from "classnames";
import { links } from "links";
import { ExternalLink } from "./ExternalLink";

export default function Footer() {
  const linkClasses = cn(
    "text-zinc-200  transition-colors p-2 inline-block",
    "hover:text-sky-600",
    "first-of-type:-ml-2"
  );

  const footerClasses = cn(
    `z-10 flex flex-col items-center justify-between w-full gap-2 py-6 mt-8 border-t border-zinc-800/75`,
    `md:flex-row`
  );
  return (
    <footer className={footerClasses}>
      <nav className="flex gap-6 text-sm text-zinc-400">
        {links.map(([href, label]) => (
          <ExternalLink key={href} href={href} className={linkClasses}>
            {label}
          </ExternalLink>
        ))}
      </nav>
      <span className="text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} Nick Radford, All rights reserved.
      </span>
    </footer>
  );
}
