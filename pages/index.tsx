import Image from "next/image";
import {
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";

import ReactMarkdown from "react-markdown";
import unlink from "remark-unlink";

import { Button } from "../components/button";
import { JobItem } from "../components/jobItem";
import Page from "../components/page";

import { BlogPost, getAllPostsForHome } from "../lib/api";

import jobs from "../jobs";
import headshot from "../public/headshot.jpg";

const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

export default function Home({ posts }: { posts: BlogPost[] }) {
  return (
    <Page includeNameInpageTitle={false}>
      {/* Hero section */}
      <Image
        src={headshot}
        alt="me"
        className="w-20 mb-6 rounded-full shadow-md bg-zinc-700"
      />
      <h1 className="mb-6 text-5xl">
        Software engineer, pool player,
        <br /> and improviser.
      </h1>

      <p className="max-w-[60ch] leading-8 mb-20">{`I'm Nick, a software engineer based in San Francisco. I'm currently looking for full time, remote work, and I have 10 years experience working with teams small and large. Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi deleniti reprehenderit quidem? `}</p>

      <div className="grid grid-cols-5 gap-5">
        <section className="col-span-3 space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="space-y-2">
              <time className="px-4 text-sm border-l-4 border-zinc-500 text-zinc-500">
                {dateFormatter.format(new Date(post.date))}
              </time>
              <h3 className="text-sm font-semibold text-zinc-100">
                {post.title}
              </h3>
              <ReactMarkdown remarkPlugins={[unlink]}>
                {post.content}
              </ReactMarkdown>
            </article>
          ))}
        </section>
        <section className="col-span-2">
          <div className="sticky p-5 space-y-8 border shadow-md rounded-2xl border-zinc-700/75 top-16">
            <h3 className="flex items-end gap-4">
              <BuildingOffice2Icon className="w-6 h-6" />
              <span className="text-sm font-semibold text-zinc-100">Work</span>
            </h3>
            <ol className="space-y-4">
              {jobs.map((job) => (
                <JobItem key={job.company} {...job} />
              ))}
            </ol>
            <Button>
              Download Resume <ArrowDownTrayIcon className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const posts = await getAllPostsForHome();

  return { props: { posts } };
};
