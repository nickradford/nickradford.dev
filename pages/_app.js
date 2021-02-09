import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />

        {/* <!-- Primary Meta Tags --> */}
        <title>
          Nick Radford | Available for Work | Software Engineer in San Francisco
        </title>
        <meta
          name="title"
          content="Nick Radford | Available for Work | Software Engineer in San Francisco"
        />
        <meta
          name="description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nickradford.dev/" />
        <meta
          property="og:title"
          content="Nick Radford | Available for Work | Software Engineer in San Francisco"
        />
        <meta
          property="og:description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />
        <meta
          property="og:image"
          content="https://nickradford.dev/social.png?v=3"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://nickradford.dev/" />
        <meta
          property="twitter:title"
          content="Nick Radford | Available for Work | Software Engineer in San Francisco"
        />
        <meta
          property="twitter:description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />
        <meta
          property="twitter:image"
          content="https://nickradford.dev/social.png?v=3"
        />
        <script
          async
          defer
          data-domains="nickradford.dev"
          data-website-id="d9280562-fa01-4566-bc78-a5687578db60"
          src="https://stats.nickradford.dev/umami.js"
        ></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
