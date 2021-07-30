import { getPostBySlug } from "../../lib/api";
import { getImage } from "../../lib/og-image-generator";

export default async function GeneratePreviewImage(req, res) {
  const { slug } = req.query;

  const post = await getPostBySlug(slug);

  const params = new URLSearchParams({
    slug,
    title: post[0].title,
    date: post[0].date,
  });

  console.log(params);

  const image = await getImage(`/blog/preview?${params.toString()}`);

  res.setHeader("Content-Type", "image/png");
  res.setHeader(
    "Cache-Control",
    "s-maxage=86400, stale-while-revalidate=86400"
  );

  res.send(image);
}
