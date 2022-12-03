import { MDXProvider as BaseProvier } from "@mdx-js/react";
import { H1, H2, H3 } from "components/typography";

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
};

export default function MDXProvider({ children }) {
  return <BaseProvier components={components}>{children}</BaseProvier>;
}
