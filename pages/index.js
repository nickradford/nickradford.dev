import Link from "next/link";

import LinkButton from "../components/linkButton";

const LightGray = ({ children }) => (
  <span className="text-gray-400 text-base">{children}</span>
);

const Bold = ({ children }) => (
  <span className="text-primary text-base font-bold whitespace-nowrap">
    {children}
  </span>
);

export default function Home({ projects }) {
  return (
    <div
      className="bg-gray-800 flex flex-col min-h-screen items-center"
      style={{
        backgroundImage:
          "linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))",
      }}
    >
      <div
        className="text-2xl text-white font-scp bg-black bg-opacity-60 sticky backdrop-filter backdrop-blur-md top-0 right-0 left-0 px-4 py-3 w-screen text-center shadow"
        style={{ textShadow: "0 0 6px rgba(255, 255, 255, .75)" }}
      >
        <LightGray>&lt;</LightGray> Nick Radford <LightGray>&gt;</LightGray>
      </div>
      <main className="w-screen text-white px-4 py-6 flex flex-col max-w-xl">
        <section className="pb-8 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-end mb-4">
            <img src="/me.png" className="w-1/2 self-center sm:w-32" />
            <div>
              <p className="mb-2">
                Hey there! I'm Nick Radford and I'm a{" "}
                <Bold>Software Engineer</Bold> and <Bold>Web Developer</Bold>{" "}
                from <Bold>San Francisco, California</Bold>.
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
                <div className="group-hover:bg-gray-700 group-hover:bg-opacity-50 p-4">
                  <h3 className="font-scp font-bold text-lg group-hover:text-primary">
                    Post Title
                  </h3>
                  <div className="font-scp italic font-extralight">
                    3 hours ago...
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dicta consectetur nisi quae temporibus veritatis rerum,
                    repellat optio omnis minus maxime sit doloribus sapiente
                    voluptas quisquam error, pariatur accusantium consequuntur
                    corrupti.
                  </p>
                </div>
              </a>
            </Link>
          </article>
        </section>
        <div className="grid grid-rows-4 gap-3">
          <LinkButton href="https://github.com/nickradford">
            My Github
          </LinkButton>
          <LinkButton href="https://www.linkedin.com/in/nickradford">
            My LinkedIn
          </LinkButton>
          <LinkButton href="https://standardresume.co/r/nickradford">
            My Résumé
          </LinkButton>
          <Link href="/contact" passHref>
            <LinkButton target={null}>Contact Me</LinkButton>
          </Link>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const { createClient } = require("contentful");
  const config = require("../contentful.json");

  const client = createClient(config);

  const projects = await client.getEntry("6mYI8AwTSfEL6L9rolYP1p");

  return { props: { projects: projects.fields.project } };
};
