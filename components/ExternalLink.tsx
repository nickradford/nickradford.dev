import Link from "next/link";

export function ExternalLink({ href, children, className }) {
  return (
    <Link
      href={href}
      className={className}
      target="_blank"
      rel="noopener nofollow"
    >
      {children}
    </Link>
  );
}
