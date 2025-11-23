import {
  faGithub,
  faLinkedin,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faSquareRss } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "./src/lib/url";

export const links: [url: string, name: string, icon?: IconDefinition][] = [
  ["https://github.com/nickradford", "GitHub", faGithub],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn", faLinkedin],
  ["/nick-radford-resume-2025-10-30.pdf", "Resume"],
  [`${BASE_URL}/feeds/atom.xml`, "Feed", faSquareRss],
];
