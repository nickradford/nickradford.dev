import fs from "fs/promises";
import path from "path";

export async function getContent() {
  const allPosts = (
    await fs.readdir(path.join(process.cwd(), "pages/blog"))
  ).filter((p) => p.endsWith(".mdx"));

  // read the frontmatter of each post
  const posts = await Promise.all(
    allPosts.map(async (p) => {
      const filePath = path.join(process.cwd(), `pages/blog/${p}`);
    })
  );

  console.log(allPosts);
}
