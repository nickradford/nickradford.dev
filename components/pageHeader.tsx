import Link from "next/link";
import { useRouter } from "next/router";

import cn from "classnames";

const PageHeader = () => {
  return (
    <div className="absolute top-0 z-20 w-full">
      <nav className="flex justify-center">
        <ul className="flex px-8 mt-6 space-x-3 text-sm border rounded-full shadow-md bg-zinc-800 border-zinc-700/75">
          <NavItem label="Home" href="/" />
          <NavItem label="Blog" href="/blog" />
          <NavItem label="Projects" href="/projects" />
          <NavItem label="Contact" href="/contact" />
        </ul>
      </nav>
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

  const classes = cn(
    `relative inline-block h-full px-2 py-2 text-zinc-400 transition-colors`,
    `hover:text-zinc-300`,
    {
      "text-zinc-100": isActive,
    }
  );

  return (
    <li>
      <Link className={classes} href={href}>
        {label}
        {isActive && (
          <span className="absolute inset-x-0 h-[1px] -bottom-[1px] bg-gradient-to-r via-zinc-400 from-transparent to-transparent" />
        )}
      </Link>
    </li>
  );
}

export default PageHeader;
