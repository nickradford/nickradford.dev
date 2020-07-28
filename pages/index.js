import Head from "next/head";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import ParticleSystem from "../components/particleSystem";
import BlackWave from "../components/blackWave";
import styles from "../styles/Home.module.css";

import config from "../contentful.json";

const client = createClient(config);

export default function Home({ projects }) {
  console.log(projects);
  return (
    <>
      <div className={`${styles.container} w-full relative overflow-hidden `}>
        <Head>
          <title>
            Nick Radford | Hire Me! | Software Engineer in San Francisco
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ParticleSystem />
        <BlackWave
          style={{
            position: "absolute",
            width: "calc(100% + 20px)",
            zIndex: 10,
            bottom: -5,
            left: -10,
            right: -10,
          }}
        />
        <div className="container m-auto relative z-50">
          <main
            className="text-white text-xl px-3 flex flex-col justify-center"
            style={{
              minHeight: "calc(100vh - 100px)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, .2)",
            }}
          >
            <div className="">
              <h1 className="text-3xl md:text-5xl mb-4">
                Hi, I'm Nick Radford 👋
              </h1>
              <h2>
                I'm a software engineer based in San Francisco, California, and
                I am currently available for remote work.
              </h2>
            </div>
            <div className="flex flex-col md:flex-row mt-20">
              <a
                href="https://github.com/nickradford"
                className="header-link-button"
              >
                My Github
              </a>
              <a
                href="https://www.linkedin.com/in/nickradford"
                className="header-link-button"
              >
                My LinkedIn
              </a>

              <a
                href="https://standardresume.co/nickradford"
                className="header-link-button"
              >
                My Resume
              </a>

              <a
                href="https://github.com/nickradford"
                className="header-link-button"
              >
                Contact Me
              </a>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-black text-white px-3">
        <section className="container m-auto min-h-screen">
          <div>
            <h2 className="text-4xl mb-3">Projects</h2>

            {projects.items &&
              projects.items.map((project) => (
                <div
                  key={project.sys.id}
                  className="flex flex-col lg:flex-row border border-gray-900 p-3 rounded"
                >
                  <div className="flex-1 mb-4">
                    <div className="text-2xl mb-4">{project.fields.name}</div>
                    <div
                      className="prose"
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(
                          project.fields.description
                        ),
                      }}
                    ></div>
                  </div>

                  <div className="lg:pl-8">
                    <img
                      className="h-auto max-w-full lg:max-w-xl rounded"
                      src={project.fields.image.fields.file.url}
                    />
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const projects = await client.getEntries({
    content_type: "project",
  });

  return { props: { projects } };
};
