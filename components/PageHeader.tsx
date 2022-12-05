import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import Headroom from "react-headroom";
import { ThemeToggle } from "./ThemeToggle";

export const PageHeader = () => {
  const navClasses = classNames(
    "relative flex items-center justify-center w-full mt-6 transition-transform ease-in-out"
  );
  const ulClasses = classNames(
    "flex px-2 space-x-3 text-sm border rounded-full shadow-2xl bg-zinc-50/80 border-zinc-200 backdrop-blur backdrop-saturate-150 ",
    "dark:bg-zinc-800/70 dark:border-zinc-700/75"
  );
  return (
    <div className="fixed top-0 z-20">
      <Headroom downTolerance={200} upTolerance={25} disableInlineStyles>
        <nav className={navClasses}>
          <ul className={ulClasses}>
            <NavItem label="Home" href="/" />
            <NavItem label="Blog" href="/blog" />
            {/* <NavItem label="Projects" href="/projects" /> */}
            {/* <NavItem label="Contact" href="/contact" /> */}
          </ul>
          <ThemeToggle />
        </nav>
      </Headroom>
    </div>
  );
};

type NavItemProps = {
  label: string;
  href: string;
};
function NavItem({ label, href }: NavItemProps) {
  const router = useRouter();
  const isRoot = router.pathname === "/" && href === "/";
  const startsWith = router.pathname.startsWith(href) && href !== "/";

  const isActive = isRoot || startsWith;

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
      <Link className={classes} href={href}>
        {label}
        {isActive && (
          <span className="absolute inset-x-0  h-[2px] -bottom-[1px]  bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
        )}
      </Link>
    </li>
  );
}
