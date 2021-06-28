// /pages/_document.js
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,400;0,700;1,200;1,700&display=swap"
            rel="stylesheet"
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
