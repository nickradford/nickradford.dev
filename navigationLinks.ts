import { BASE_URL } from "./src/lib/url";

export const links: [url: string, name: string, icon?: string][] = [
  ["https://github.com/nickradford", "GitHub"],
  ["https://www.linkedin.com/in/nickradford/", "LinkedIn"],
  ["/nick-radford-resume-2025-10-30.pdf", "Resume", "file-pdf"],
  [`${BASE_URL}/feeds/atom.xml`, "Feed"],
];
