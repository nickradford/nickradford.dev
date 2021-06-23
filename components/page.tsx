import Head from "next/head";

import PageHeader from "./pageHeader";
import { LinkButton } from "./button";

export default function Page({
  children,
  pageTitle = "Nick Radford | Available for Work",
  includeNameInpageTitle = true,
}) {
  return (
    <>
      <Head>
        <title>
          {pageTitle} |{includeNameInpageTitle ? " Nick Radford |" : null}{" "}
          Software Engineer in San Francisco
        </title>
      </Head>

      {children}
    </>
  );
}
