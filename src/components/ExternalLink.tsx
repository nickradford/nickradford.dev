import React from "react";

export function ExternalLink({ href, children, className, title = "" }) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener nofollow"
      title={title}
    >
      {children}
    </a>
  );
}
