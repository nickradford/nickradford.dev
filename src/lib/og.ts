import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const OG_DIR = path.join(process.cwd(), "public", "og");

export function getOgImageUrl(imagePath: string): string {
  // Only process relative /og/ paths; leave absolute URLs untouched.
  if (!imagePath.startsWith("/og/")) {
    return imagePath;
  }

  const filename = path.basename(imagePath);
  const filePath = path.join(OG_DIR, filename);

  if (!existsSync(filePath)) {
    return imagePath;
  }

  const hash = createHash("sha256")
    .update(readFileSync(filePath))
    .digest("hex")
    .slice(0, 8);

  return `${imagePath}?v=${hash}`;
}
