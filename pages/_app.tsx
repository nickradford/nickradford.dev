import { IBM_Plex_Sans as Plex } from "@next/font/google";
import "../styles/tailwind.css";

import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";

import MDXProvider from "components/MDXProvider";
import PageHeader from "components/pageHeader";

const plex = Plex({
  variable: "--font-plex",
  weight: ["400", "500", "600", "700"],
});

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps, router }) {
  if (router.route === "/blog/preview") {
    return <Component {...pageProps} />;
  }
  return (
    <>
      <Head>
        {/* Todo: Replace w/ next-seo */}
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* <!-- Primary Meta Tags --> */}
        <title>Nick Radford | Software Engineer in San Francisco</title>
        <meta
          name="title"
          content="Nick Radford | Software Engineer in San Francisco"
        />
        <meta
          name="description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:url"
          property="og:url"
          content="https://nickradford.dev/"
        />
        <meta
          key="og:title"
          property="og:title"
          content="Nick Radford | Software Engineer in San Francisco"
        />
        <meta
          key="og:description"
          property="og:description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />
        <meta
          key="og:image"
          property="og:image"
          content="https://nickradford.dev/social.png?v=3"
        />
        <meta key="og:image:width" property="og:image:width" content="1200" />
        <meta key="og:image:height" property="og:image:height" content="628" />

        {/* <!-- Twitter --> */}
        <meta
          key="twitter:image"
          property="twitter:image"
          content="https://nickradford.dev/social.png?v=3"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nickradford.dev/" />
        <meta
          property="twitter:title"
          content="Nick Radford | Software Engineer in San Francisco"
        />
        <meta
          property="twitter:description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />
      </Head>
      <div
        className={`flex flex-col items-center w-full min-h-screen min-h-fill-available ${plex.variable}`}
      >
        <PageHeader />

        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
