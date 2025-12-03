import { useEffect, useState } from "react";
import classNames from "classnames";
import { ThemeToggle } from "./ThemeToggle";

export const PageHeader = () => {
  return (
    <>
      {/* Desktop Header */}
      <div className="sticky top-0 z-20 w-full bg-ivory/70 dark:bg-zinc-950/70  backdrop-blur-md border-b border-l  border-r border-yellow/20 dark:border-zinc-800 hidden md:flex">
        <div className="flex-1 pt-6 px-8 md:px-16 border-r border-yellow/20 dark:border-zinc-800"></div>
        <nav className="max-w-4xl w-full flex items-stretch relative divide-x divide-yellow/20 dark:divide-zinc-800 border-r border-yellow/20 dark:border-zinc-800">
          <div className="flex items-center border-yellow/20 dark:border-zinc-800">
            <a
              href="/"
              className="text-lg px-8 md:px-16 h-full flex justify-center items-center font-geist-mono font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors hover:bg-yellow/5 "
            >
              Nick&nbsp;Radford
            </a>
          </div>
          <div className="flex-grow flex items-center justify-center border-r border-yellow/20 dark:border-zinc-800">
            <ul
              className={
                "flex px-0 *:py-4 space-x-8 md:space-x-0 text-sm w-full *:flex-1 *:text-center *:px-4"
              }
            >
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
      <div className="sticky top-0 z-20 w-full bg-ivory/70 dark:bg-zinc-950/70 backdrop-blur-md border-b border-yellow/20 dark:border-zinc-800 md:hidden px-6 pt-6">
        <nav className="flex items-center justify-between relative">
          <a
            href="/"
            className="absolute -top-3  text-sm font-geist-mono font-medium text-zinc-600 hover:text-yellow dark:text-zinc-400 dark:hover:text-yellow transition-colors"
          >
            Nick Radford
          </a>
          <ul className={"flex px-0 py-4 space-x-8 text-sm"}>
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
    `relative inline-block transition-colors text-sm font-geist-mono font-medium`,
    `text-zinc-600 hover:text-yellow`,
    `dark:text-zinc-400 dark:hover:text-yellow`,
    `md:border-r md:border-yellow/20 dark:md:border-zinc-800 md:last:border-none`,
    {
      "text-yellow dark:text-yellow md:bg-yellow/5": isActive,
    },
  );

  return (
    <a className={classes} href={href}>
      {label}
      {isActive && (
        <span className="md:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-yellow" />
      )}
    </a>
  );
}
