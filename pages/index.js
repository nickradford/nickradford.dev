import Image from "next/image";
import Link from "next/link";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";

import { getAllPostsForHome } from "../lib/api";
import Page from "../components/page";
import { Bold } from "../components/typography";

export default function Home({ posts }) {
  return (
    <Page includeNameInpageTitle={false}>
      <section className="flex flex-col pb-8">
        <div className="flex flex-col mb-4 sm:flex-row sm:items-end">
          <div className="m-auto sm:m-0">
            <Image
              src="/me.png"
              layout="intrinsic"
              width={240}
              height={240}
              loading="eager"
              priority={true}
              alt="My MeMoji waving to you :D"
            />
          </div>
          <div className="text-lg">
            <p className="mb-2">
              Hey there! I&apos;m Nick Radford and I&apos;m a{" "}
              <Bold>Software Engineer</Bold> and <Bold>Web Developer</Bold> from{" "}
              <Bold>San Francisco, California</Bold>.
            </p>
            <p>
              I&apos;m currently making digital gifting better with{" "}
              <Link href="https://govalo.com">
                <Bold>Govalo</Bold>
              </Link>
            </p>
          </div>
        </div>
        <hr className="border-dashed" />

        <h2 className="mt-6 mb-2 text-2xl font-bold font-scp">
          Latest Blog Posts
        </h2>
        {posts.map((post) => (
          <article className="flex flex-col" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="group">
                <div className="p-4 transition-colors group-hover:bg-gray-700 group-hover:bg-opacity-50">
                  <h3 className="text-xl font-bold transition-colors font-scp group-hover:text-primary">
                    {post.title}
                  </h3>
                  <div className="text-sm font-scp">
                    <TimeAgo date={post.date} />
                  </div>
                  <div className="flex pt-4 prose sm:prose-lg">
                    <ReactMarkdown>
                      {post.content.split("\n")[0].substring(0, 325) + "..."}
                    </ReactMarkdown>
                  </div>
                  <p className="text-right font-scp">Read more...</p>
                </div>
              </a>
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
