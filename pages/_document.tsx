// /pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    // noinspection JSUnresolvedLibraryURL,HtmlRequiredTitleElement
    return (
      <Html lang="en" className="">
        <Head>
          <script
            async
            defer
            data-domains="nickradford.dev"
            data-website-id="d9280562-fa01-4566-bc78-a5687578db60"
            src="https://stats.nickradford.dev/umami.js"
          ></script>
          <link rel="me" href="https://hachyderm.io/@nickradford" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
  // On page load or when changing themes, best to add inline in <HEAD> to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`,
            }}
          ></script>
        </Head>
        <body className="transition-colors bg-zinc-200 text-zinc-900 dark:bg-black dark:text-zinc-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
