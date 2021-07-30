import "../styles/tailwind.css";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";

import PageHeader from "../components/pageHeader";
import Footer from "../components/footer";

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
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:url"
          property="og:url"
          content="https://nickradford.dev/"
        />
        <meta
          key="og:title"
          property="og:title"
          content="Nick Radford | Available for Work | Software Engineer in San Francisco"
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
          content="Nick Radford | Available for Work | Software Engineer in San Francisco"
        />
        <meta
          property="twitter:description"
          content="10 years of frontend & full stack software engineering experience. Currently available for full time remote job opportunities."
        />
      </Head>
      <div className="flex flex-col items-center w-full min-h-screen bg-gray-800 min-h-fill-available">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage:
              "linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))",
          }}
        ></div>
        <PageHeader />
        <AnimatePresence exitBeforeEnter>
          <motion.main
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative flex flex-col flex-1 w-screen max-w-4xl px-4 py-6 text-white md:px-0"
          >
            <Component {...pageProps} />
          </motion.main>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default MyApp;
