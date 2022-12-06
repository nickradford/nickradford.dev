import { DefaultSeoProps } from "next-seo";

const config: DefaultSeoProps = {
  defaultTitle: "Nick Radford | Software Engineer in San Francisco",
  titleTemplate: "%s | Nick Radford | Software Engineer in San Francisco",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nickradford.dev/",
    siteName: "Nick Radford (dot) dev",
  },
  twitter: {
    handle: "@nickradford",
    site: "@nickradford",
    cardType: "summary_large_image",
  },
  defaultOpenGraphImageWidth: 800,
  defaultOpenGraphImageHeight: 400,
};

export default config;
