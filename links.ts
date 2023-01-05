import {
  faMastodon,
  faGithub,
  faLinkedin,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faSquareRss } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "./lib/url";

import { BASE_URL } from "./lib/url";

export const links: [url: string, name: string, icon?: IconDefinition][] = [
  ["https://hachyderm.io/@nickradford", "Mastodon", faMastodon],
  ["https://github.com/nickradford", "GitHub", faGithub],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn", faLinkedin],
  [`${BASE_URL}/api/feeds/atom.xml`, "Feed", faSquareRss],
];
