import { MDXProvider as BaseProvier } from "@mdx-js/react";

export function MDXProvider({ children }) {
  return <BaseProvier>{children}</BaseProvier>;
}
