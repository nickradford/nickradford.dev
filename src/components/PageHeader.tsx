import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
// Removed react-headroom; using CSS sticky header instead
import { ThemeToggle } from "./ThemeToggle";

export const PageHeader = () => {
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const downThreshold = 2; // small nudge hides when scrolling down past header
  const upThreshold = 2; // small nudge shows when scrolling up

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const delta = y - lastYRef.current;

        // show when near top
        if (y < 16) {
          setIsHidden(false);
          lastYRef.current = y;
          ticking = false;
          return;
        }

        if (delta > downThreshold && y > 48) {
          // scrolling down
          setIsHidden(true);
        } else if (delta < -upThreshold) {
          // scrolling up
          setIsHidden(false);
        }

        lastYRef.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClasses = classNames(
    "relative flex items-center justify-center w-full transition-transform ease-in-out"
  );
  const ulClasses = classNames(
    "flex px-2 space-x-3 text-sm border rounded-full shadow-2xl bg-zinc-50/80 border-zinc-200 backdrop-blur backdrop-saturate-150 ",
    "dark:bg-zinc-800/70 dark:border-zinc-700/75"
  );
  return (
    <div className="fixed top-0 z-20 w-full">
      <nav
        className={classNames(
          navClasses,
          "transform transition-transform duration-300 will-change-transform",
          isHidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <ul className={ulClasses}>
          <NavItem label="Home" href="/" />
          <NavItem label="Blog" href="/blog" />
          {/* <NavItem label="Projects" href="/projects" /> */}
          {/* <NavItem label="Contact" href="/contact" /> */}
        </ul>
        <ThemeToggle />
      </nav>
    </div>
  );
};

type NavItemProps = {
  label: string;
  href: string;
};
function NavItem({ label, href }: NavItemProps) {
  const isActive =
    typeof window !== "undefined"
      ? (window.location.pathname === "/" && href === "/") ||
        (window.location.pathname.startsWith(href) && href !== "/")
      : false;

  const classes = classNames(
    `relative inline-block h-full px-2 py-2 transition-colors `,
    `text-zinc-500 hover:text-zinc-700`,
    `dark:text-zinc-400 dark:hover:text-zinc-300 `,
    {
      "dark:!text-zinc-100": isActive,
      "!text-zinc-900": isActive,
    }
  );

  return (
    <li>
      <a className={classes} href={href}>
        {label}
        {isActive && (
          <span className="absolute inset-x-0  h-[2px] -bottom-[1px]  bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        )}
      </a>
    </li>
  );
}
