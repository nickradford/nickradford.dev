import { remark } from "remark";
import strip from "strip-markdown";

type ReadingTime = {
  text: string;
  minutes: number;
  time: number;
  words: number;
};

export function calculateReadingTime(text: string): ReadingTime {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = words / wordsPerMinute;
  const time = minutes * 60 * 1000; // in milliseconds
  const readingText = `${Math.ceil(minutes)} min read`;
  return { text: readingText, minutes, time, words };
}

export type BlogPost = {
  title: string;
  date: Date;
  slug: string;
  excerpt: string;
  readingTime: ReadingTime;
  draft?: boolean;
  tags?: string[];
};

export type TagEntry = {
  label: string;
  slug: string;
  count: number;
};

export function toExcerpt(md: string, maxLen = 200) {
  // Get the first paragraph (content before first double newline or first maxLen characters)
  const firstParagraph = md.split("\n\n")[0] || md;
  const stripped = String(remark().use(strip).processSync(firstParagraph)).trim();

  if (stripped.length > maxLen) {
    return stripped.substring(0, maxLen).trim() + "...";
  }
  return stripped;
}
