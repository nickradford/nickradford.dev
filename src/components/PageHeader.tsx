import { useEffect, useState } from "react";
import classNames from "classnames";
import { ThemeToggle } from "./ThemeToggle";

export const PageHeader = () => {
  const ulClasses = classNames("flex px-0 py-3 space-x-8 text-sm");
  return (
    <>
      {/* Desktop Header */}
      <div className="sticky top-0 z-20 w-full bg-ivory/70 dark:bg-zinc-950/70  backdrop-blur-md border-b border-l border-r border-stone-200 dark:border-zinc-800 hidden md:flex">
        <div className="flex-1 pt-6 px-8 md:px-16 border-r dark:border-zinc-800"></div>
        <nav className="max-w-4xl w-full flex items-stretch relative divide-x divide-stone-200 dark:divide-zinc-800 border-r border-stone-200 dark:border-zinc-800">
          <div className="flex items-center border-stone-200 dark:border-zinc-800">
            <a
              href="/"
              className="text-sm px-8 md:px-16 h-full flex justify-center items-center font-scp font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors"
            >
              Nick Radford
            </a>
          </div>
          <div className="flex-grow flex items-center justify-center border-r border-stone-200 dark:border-zinc-800">
            <ul className={ulClasses}>
              <NavItem label="home" href="/" />
              <NavItem label="writing" href="/blog" />
              <NavItem label="work" href="/work" />
            </ul>
          </div>
          <div className="flex items-center justify-end ">
            <ThemeToggle />
          </div>
        </nav>
        <div className="flex-1 pt-6 px-8 md:px-16"></div>
      </div>

      {/* Mobile Header */}
      <div className="sticky top-0 z-20 w-full bg-ivory/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-stone-200 dark:border-zinc-800 md:hidden px-6 pt-6">
        <nav className="flex items-center justify-between relative">
          <a
            href="/"
            className="absolute -top-3 left-1 text-sm font-scp font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors"
          >
            Nick Radford
          </a>
          <ul className={ulClasses}>
            <NavItem label="home" href="/" />
            <NavItem label="writing" href="/blog" />
            <NavItem label="work" href="/work" />
          </ul>
          <div>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </>
  );
};

type NavItemProps = {
  label: string;
  href: string;
};
function NavItem({ label, href }: NavItemProps) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const active =
      (window.location.pathname === "/" && href === "/") ||
      (window.location.pathname.startsWith(href) && href !== "/");
    setIsActive(active);
  }, [href]);

  const classes = classNames(
    `relative inline-block py-2 px-1 transition-colors text-sm font-scp font-medium`,
    `text-zinc-600 hover:text-yellow`,
    `dark:text-zinc-400 dark:hover:text-yellow`,
    {
      "text-yellow dark:text-yellow": isActive,
    },
  );

  return (
    <li>
      <a className={classes} href={href}>
        {label}
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow" />
        )}
      </a>
    </li>
  );
}
