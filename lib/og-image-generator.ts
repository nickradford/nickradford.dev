import { launchChromium } from "playwright-aws-lambda";

export async function getImage(
  path = "",
  baseUrl = `https://${process.env.VERCEL_URL || "http://localhost:3000"}`
) {
  //if (process.env.NODE_ENV === "development") {
  //return "OG image will only be generated in prod";
  //}

  const url = `${baseUrl}${path}`;

  const browser = await launchChromium({ headless: true });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 628 });
  await page.goto(url, {});

  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  return buffer;
}
