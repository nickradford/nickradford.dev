// /pages/_document.js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/merriweather-regular-webfont.woff2"
            as="font"
            crossOrigin=""
          />
          <script
            async
            defer
            data-domains="nickradford.dev"
            data-website-id="d9280562-fa01-4566-bc78-a5687578db60"
            src="https://stats.nickradford.dev/umami.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
