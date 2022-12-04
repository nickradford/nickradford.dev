// /pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // noinspection JSUnresolvedLibraryURL,HtmlRequiredTitleElement
    return (
      <Html lang="en">
        <Head>
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
