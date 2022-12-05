import classNames from "classnames";
import Head from "next/head";

import { Footer } from "./Footer";

export function Page({
  children,
  pageTitle = "Nick Radford",
  includeNameInpageTitle = true,
}) {
  const title = `${pageTitle} | ${
    includeNameInpageTitle ? " Nick Radford |" : ""
  } Software Engineer in San Francisco`;

  const classes = classNames(
    "flex flex-col w-full min-h-screen px-8 pt-20 max-w-7xl bg-zinc-100 border-x border-zinc-300/75 ",
    "md:px-16",
    "dark:bg-zinc-900 dark:border-zinc-800/75"
  );
  return (
    <div className={classes}>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
