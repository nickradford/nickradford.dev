import { IBM_Plex_Sans as Plex } from "next/font/google";
import "../styles/tailwind.css";

import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { DefaultSeo } from "next-seo";
import defaulSeoConfig from "next-seo.config";

import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";

import { PageHeader } from "@/components";

const plex = Plex({
  variable: "--font-plex",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Tell Font Awesome to skip adding the CSS automatically since it's being imported above
config.autoAddCss = false;

function MyApp({ Component, pageProps, router }) {
  if (router.route === "/blog/preview") {
    return <Component {...pageProps} />;
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <div
        className={`flex flex-col items-center w-full min-h-screen min-h-fill-available ${plex.variable}`}
      >
        <DefaultSeo {...defaulSeoConfig} />
        <PageHeader />

        <Component {...pageProps} />
      </div>
      <Analytics />
    </>
  );
}

export default MyApp;
