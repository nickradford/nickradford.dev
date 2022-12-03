import Head from "next/head";
import Footer from "./footer";

export default function Page({
  children,
  pageTitle = "Nick Radford",
  includeNameInpageTitle = true,
}) {
  const title = `${pageTitle} | ${
    includeNameInpageTitle ? " Nick Radford |" : ""
  } Software Engineer in San Francisco`;
  return (
    <div className="flex flex-col w-full min-h-screen px-10 pt-20 max-w-7xl bg-zinc-900 border-x border-zinc-800/75">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
