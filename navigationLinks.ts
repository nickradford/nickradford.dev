import { BASE_URL } from "./src/lib/url";

export const links: [url: string, name: string, icon?: string, download?: string][] = [
  ["https://github.com/nickradford", "GitHub"],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn"],
  ["/nick-radford-resume-2026-06-18.pdf", "Resume", "file-pdf", "Nick Radford Resume.pdf"],
  [`${BASE_URL}/feeds/atom.xml`, "Feed"],
];
