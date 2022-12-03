// /pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // noinspection JSUnresolvedLibraryURL,HtmlRequiredTitleElement
    return (
      <Html lang="en">
        <Head>
          {/* <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;800&family=Source+Code+Pro&display=swap"
            rel="stylesheet"
          /> */}
          <script
            async
            defer
            data-domains="nickradford.dev"
            data-website-id="d9280562-fa01-4566-bc78-a5687578db60"
            src="https://stats.nickradford.dev/umami.js"
          ></script>
          <link rel="me" href="https://hachyderm.io/@nickradford" />
        </Head>
        <body className="">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
