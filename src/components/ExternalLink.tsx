import Link from "next/link";

export function ExternalLink({ href, children, className, title = "" }) {
  return (
    <Link
      href={href}
      className={className}
      target="_blank"
      rel="noopener nofollow"
      title={title}
    >
      {children}
    </Link>
  );
}
