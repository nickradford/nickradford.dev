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
      <section className="pb-8 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-end mb-4">
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
              I&apos;m currently <Bold>available for remote work</Bold>.
            </p>
          </div>
        </div>
        <hr className="border-dashed" />

        <h2 className="font-scp font-bold text-2xl mt-6 mb-2">
          Latest Blog Posts
        </h2>
        {posts.map((post) => (
          <article className="flex flex-col" key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <a className="group">
                <div className="group-hover:bg-gray-700 group-hover:bg-opacity-50 p-4 transition-colors">
                  <h3 className="font-scp font-bold text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="font-scp text-sm">
                    <TimeAgo date={post.date} />
                  </div>
                  <div className="flex prose sm:prose-lg pt-4">
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
