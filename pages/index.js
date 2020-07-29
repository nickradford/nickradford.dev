import Head from "next/head";
import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import ParticleSystem from "../components/particleSystem";
import BlackWave from "../components/blackWave";
import styles from "../styles/Home.module.css";

import config from "../contentful.json";

const client = createClient(config);

const Emphasis = (props) => (
  <span className="text-white border-b-4 pb-1 border-white">
    {props.children}
  </span>
);

const Tag = (props) => (
  <span
    className="text-sm mr-2 bg-gray-900 px-2 py-1 bg-opacity-50 rounded last:mr-0 font-mono flex-shrink mb-2"
    {...props}
  />
);

export default function Home({ projects }) {
  console.log(projects);
  return (
    <>
      <div className={`${styles.container} w-full relative overflow-hidden `}>
        <Head>
          <title>
            Nick Radford | Available for Work | Software Engineer in San
            Francisco
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
              <h1 className="text-3xl md:text-6xl mb-8">
                Hi, I'm Nick Radford <div className="wave inline-block">👋</div>
              </h1>
              <h2 className="text-2xl text-gray-200 leading-loose">
                I'm a <Emphasis>software engineer</Emphasis> based in{" "}
                <Emphasis>San Francisco, California</Emphasis>, and I am
                currently <Emphasis>available for remote work</Emphasis>.
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
                className="header-link-button blue"
              >
                My LinkedIn
              </a>

              <a
                href="https://standardresume.co/nickradford"
                className="header-link-button purple"
              >
                My Résumé
              </a>

              <a
                href="https://github.com/nickradford"
                className="header-link-button red"
              >
                Contact Me
              </a>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-black text-white px-3">
        <section className="container m-auto min-h-screen pb-12">
          <div>
            <h2 className="text-4xl mb-8 border-b-4 inline-block fancy-border">
              Projects
            </h2>

            {projects &&
              projects.map((project) => (
                <div
                  key={project.sys.id}
                  className="flex flex-col border border-gray-900 bg-blue-900 p-6 rounded items-center shadow-inner mb-8"
                >
                  <div className="text-3xl mb-4 w-full flex flex-col md:flex-row justify-between">
                    <a
                      href={project.fields.url}
                      className="transition duration-100 hover:text-pink"
                    >
                      {project.fields.title}
                    </a>
                    <div
                      className="flex flex-wrap md:items-center"
                      style={{ position: "relative", top: 6 }}
                    >
                      {project.fields.technologiesUsed.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 mb-4 lg:mb-0 flex flex-col">
                      <div
                        className="prose flex-1 mb-4"
                        dangerouslySetInnerHTML={{
                          __html: documentToHtmlString(
                            project.fields.description
                          ),
                        }}
                      ></div>

                      <div className="mt-6 mb-2 flex flex-col md:block">
                        {project.fields.url ? (
                          <a
                            href={project.fields.url}
                            className="header-link-button"
                          >
                            open {project.fields.title}
                          </a>
                        ) : null}
                        {project.fields.sourceUrl ? (
                          <a
                            href={project.fields.sourceUrl}
                            className="header-link-button"
                          >
                            view source
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="lg:pl-8">
                      <a href={project.fields.url}>
                        <img
                          className="h-auto max-w-full lg:max-w-md xl:max-w-xl border-4 border-gray-900 rounded shadow-2xl"
                          src={project.fields.image.fields.file.url}
                        />
                      </a>
                    </div>
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

  const projectList = projects.items.sort((a, b) =>
    a.fields.sortOrder < b.fields.sortOrder
      ? -1
      : a.fields.sortOrder === b.fields.sortOrder
      ? 0
      : 1
  );

  return { props: { projects: projectList } };
};
