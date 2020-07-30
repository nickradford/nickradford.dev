import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
          rel="stylesheet"
        />

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
          content="https://nickradford.dev/social.png?v=2"
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
          content="https://nickradford.dev/social.png?v=2"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
