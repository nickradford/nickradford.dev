import Head from "next/head";

import { Footer } from "./index";

export function Page({
  children,
  pageTitle = "Nick Radford",
  includeNameInpageTitle = true,
}) {
  const title = `${pageTitle} | ${
    includeNameInpageTitle ? " Nick Radford |" : ""
  } Software Engineer in San Francisco`;
  return (
    <div className="flex flex-col w-full min-h-screen px-8 pt-20 md:px-16 max-w-7xl bg-zinc-900 border-x border-zinc-800/75">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
