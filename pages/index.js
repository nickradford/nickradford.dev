import Image from "next/legacy/image";
import Link from "next/link";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import unlink from "remark-unlink";

import { getAllPostsForHome } from "../lib/api";
import Page from "../components/page";
import { Bold } from "../components/typography";

export default function Home({ posts }) {
  return (
    <Page includeNameInpageTitle={false}>
      <section className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-8 py-8">
          <div className="m-auto sm:m-0 bg-gradient-to-br from-green via-teal to-sapphire rounded-full overflow-clip group">
            <span className="relative top-3 group-hover:hidden">
              <Image
                src="/wave.png"
                layout=""
                width={300}
                height={300}
                loading="eager"
                priority={true}
                alt="My MeMoji waving to you :D"
              />
            </span>
            <span className="relative top-3 hidden group-hover:block">
              <Image
                src="/heart.png"
                layout=""
                width={300}
                height={300}
                loading="eager"
                priority={true}
                alt="My MeMoji waving to you :D"
              />
            </span>
          </div>
          <div className="text-lg">
            <p className="mb-2">
              Hey there! I&apos;m Nick Radford and I&apos;m a{" "}
              <Bold>Software Engineer</Bold> and <Bold>Web Developer</Bold> from{" "}
              <Bold>San Francisco, California</Bold>.
            </p>
            <p>
              I&apos;m currently looking for full-time remote work. Check out my{" "}
              <Bold>
                <a
                  className="text-red underline"
                  href="https://standardresume.co/nickradford"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  resume
                </a>
              </Bold>
              .
            </p>
          </div>
        </div>
        <hr className="border-dashed border-surface1" />

        <h2 className="text-4xl font-inter py-4 font-thin tracking-wide">
          Latest Blog Posts
        </h2>
        {posts.map((post) => (
          <article className="flex flex-col" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <div className="p-4 transition-colors group-hover:bg-gray-700 group-hover:bg-opacity-50 group">
                <h3 className="text-2xl font-bold transition-colors font-scp text-red">
                  {post.title}
                </h3>
                <div className="text-sm font-scp mt-1">
                  <TimeAgo date={post.date} />
                </div>
                <div className="flex pt-4 prose sm:prose-lg">
                  <ReactMarkdown remarkPlugins={[unlink]}>
                    {post.content.split("\n")[0].substring(0, 325) + "..."}
                  </ReactMarkdown>
                </div>
                <p className="text-right font-scp group-hover:text-red">
                  Read more...
                </p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPostsForHome();

  return { props: { posts } };
};
