import Head from "next/head";

export default function Page({
  children,
  pageTitle = "Nick Radford",
  includeNameInpageTitle = true,
}) {
  const title = `${pageTitle} | ${
    includeNameInpageTitle ? " Nick Radford |" : ""
  } Software Engineer in San Francisco`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {children}
    </>
  );
}
