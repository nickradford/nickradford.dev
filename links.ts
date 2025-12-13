import { type Icon, GithubLogoIcon, LinkedinLogoIcon, RssIcon } from "@phosphor-icons/react";
import { BASE_URL } from "./src/lib/url";

export const links: [url: string, name: string, icon?: Icon][] = [
  ["https://github.com/nickradford", "GitHub", GithubLogoIcon],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn", LinkedinLogoIcon],
  ["/nick-radford-resume-2025-10-30.pdf", "Resume"],
  [`${BASE_URL}/feeds/atom.xml`, "Feed", RssIcon],
];
