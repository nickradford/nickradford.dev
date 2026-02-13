import { join } from "path";
import puppeteer from "puppeteer";
import fs from "fs";

const CARD_WIDTH = 1200;
const CARD_HEIGHT = 630;

const CONTENT_FOLDER = "src/content/blog";
const OUTPUT_FOLDER = "public/og";
const FALLBACK_IMAGE_NAME = "nick-radford-dot-dev.png";

const BASE_URL = "http://localhost:4321";
const TIMEOUT = 5000;

async function timeoutFn(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const generateSocialCards = async () => {
  const args = new Set(process.argv.slice(2));
  const generateFallback = args.has("--fallback");
  const fallbackOnly = args.has("--fallback-only");
  const force = args.has("--force");

  const contentPath = join(process.cwd(), CONTENT_FOLDER);
  const outputPath = join(process.cwd(), OUTPUT_FOLDER);

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  const postSlugs = fallbackOnly
    ? []
    : fs
        .readdirSync(contentPath, { withFileTypes: true })
        .filter((path) => {
          const isMarkdownFile = (path: string) => /\.(md|mdx)$/i.test(path);
          return path.isDirectory()
            ? ["index.md", "index.mdx"].some((file) =>
                fs.existsSync(join(contentPath, path.name, file)),
              )
            : path.isFile() && isMarkdownFile(path.name);
        })
        .map((path) => path.name.replace(/\.(md|mdx)$/i, ""));

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log(`Found ${postSlugs.length} posts to process`);
  if (generateFallback || fallbackOnly) {
    console.log(`Fallback image generation enabled: ${FALLBACK_IMAGE_NAME}`);
  }

  console.log(postSlugs);

  const CONCURRENCY = 16;

  const renderCard = async (url: string, outputFile: string, label: string) => {
    if (!force && fs.existsSync(outputFile)) {
      console.log(`Skipping ${label} - social card already exists`);
      return;
    }

    try {
      console.log(`Generating social card for ${label}`);
      const page = await browser.newPage();
      await page.setViewport({
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        deviceScaleFactor: 1,
      });

      await page.goto(url);
      await timeoutFn(TIMEOUT);

      await page.screenshot({
        path: outputFile,
        clip: {
          x: 0,
          y: 0,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        },
      });

      console.log(`Successfully generated social card for ${label}`);
      await page.close();
    } catch (error) {
      console.error(`Failed to generate social card for ${label}:`, error);
    }
  };

  if (generateFallback || fallbackOnly) {
    const fallbackOutputFile = join(outputPath, FALLBACK_IMAGE_NAME);
    const fallbackUrl = `${BASE_URL}/open-graph?base=1`;
    await renderCard(fallbackUrl, fallbackOutputFile, FALLBACK_IMAGE_NAME);
  }

  for (let i = 0; i < postSlugs.length; i += CONCURRENCY) {
    const batch = postSlugs.slice(i, i + CONCURRENCY);

    await Promise.all(
      batch.map(async (slug) => {
        const outputFile = join(outputPath, `${slug}.png`);
        const url = `${BASE_URL}/open-graph?slug=${slug}`;
        await renderCard(url, outputFile, slug);
      }),
    );
  }

  await browser.close();
  console.log("Finished generating social cards");
};

generateSocialCards().catch(console.error);
