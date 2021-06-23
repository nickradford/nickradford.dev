import Image from "next/image";
import Link from "next/link";
import Page from "../components/page";

// import memoji from "../public/me.png";

const Bold = ({ children }) => (
  <span className="text-primary font-bold whitespace-nowrap">{children}</span>
);

export default function Home({ projects }) {
  return (
    <Page includeNameInpageTitle={false}>
      <section className="pb-8 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-end mb-4">
          <Image
            src="/me.png"
            className="w-1/2 self-center sm:w-32"
            width={240}
            height={240}
            loading="eager"
            priority={true}
          />
          <div className="text-lg">
            <p className="mb-2">
              Hey there! I'm Nick Radford and I'm a{" "}
              <Bold>Software Engineer</Bold> and <Bold>Web Developer</Bold> from{" "}
              <Bold>San Francisco, California</Bold>.
            </p>
            <p>
              I'm currently <Bold>available for remote work</Bold>.
            </p>
          </div>
        </div>
        <hr className="border-dashed" />

        <h2 className="font-scp font-bold text-2xl mt-6 mb-2">
          Latest Blog Post
        </h2>
        <article className="flex flex-col">
          <Link href="/blog/post">
            <a className="group">
              <div className="group-hover:bg-gray-700 group-hover:bg-opacity-50 p-4 transition-colors">
                <h3 className="font-scp font-bold text-lg group-hover:text-primary transition-colors">
                  Post Title
                </h3>
                <div className="font-scp italic font-extralight">
                  3 hours ago...
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  consectetur nisi quae temporibus veritatis rerum, repellat
                  optio omnis minus maxime sit doloribus sapiente voluptas
                  quisquam error, pariatur accusantium consequuntur corrupti.
                </p>
              </div>
            </a>
          </Link>
        </article>
      </section>
    </Page>
  );
}

export const getStaticProps = async () => {
  const { createClient } = require("contentful");
  const config = require("../contentful.json");

  const client = createClient(config);

  const projects = await client.getEntry("6mYI8AwTSfEL6L9rolYP1p");

  return { props: { projects: projects.fields.project } };
};
