import {
  faMastodon,
  faGithub,
  faLinkedin,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";

export const links: [url: string, name: string, icon?: IconDefinition][] = [
  ["https://hachyderm.io/@nickradford", "Mastodon", faMastodon],
  ["https://github.com/nickradford", "GitHub", faGithub],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn", faLinkedin],
];
