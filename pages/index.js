import { useState, useRef } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import ParticleSystem from "../components/particleSystem";
import BlackWave from "../components/blackWave";
import styles from "../styles/Home.module.css";

import { ContactModal } from "../components/contactModal";
import StickyHeader from "../components/stickyHeader";

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
  // console.log(projects);
  const [modalShowing, setModalShowing] = useState(false);

  const projectsRef = useRef(null);

  return (
    <>
      <div className={`${styles.container} w-full relative overflow-hidden`}>
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
        <div className="container m-auto relative z-30" id="#">
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
                target="_blank"
                rel="noopener"
              >
                My Github
              </a>
              <a
                href="https://www.linkedin.com/in/nickradford"
                className="header-link-button blue"
                target="_blank"
                rel="noopener"
              >
                My LinkedIn
              </a>

              <a
                href="https://standardresume.co/r/nickradford"
                className="header-link-button purple"
                target="_blank"
                rel="noopener"
              >
                My Résumé
              </a>

              <button
                className="header-link-button red"
                onClick={() => {
                  setModalShowing(!modalShowing);
                }}
              >
                Contact Me
              </button>
            </div>
          </main>
        </div>
      </div>
      <StickyHeader domRef={projectsRef} threshold={200}>
        <span className="lowercase">
          <a
            href="https://github.com/nickradford"
            className="hidden lg:inline-block border-4 border-black rounded whitespace-no-wrap px-3 py-2 transition duration-100 hover:bg-black hover:text-white mr-2"
            target="_blank"
            rel="noopener"
          >
            My Github
          </a>
          <a
            href="https://www.linkedin.com/in/nickradford"
            className="hidden md:inline-block border-4 border-black rounded whitespace-no-wrap px-3 py-2 transition duration-100 hover:bg-black hover:text-white mr-2"
            target="_blank"
            rel="noopener"
          >
            My LinkedIn
          </a>

          <a
            href="https://standardresume.co/r/nickradford"
            className="hidden sm:inline-block border-4 border-black rounded whitespace-no-wrap px-3 py-2 transition duration-100 hover:bg-black hover:text-white mr-2"
            target="_blank"
            rel="noopener"
          >
            My Résumé
          </a>
          <button
            onClick={() => {
              setModalShowing(!modalShowing);
            }}
            className="lowercase border-4 border-black rounded whitespace-no-wrap px-3 py-2 transition duration-100 hover:bg-black hover:text-white"
          >
            Contact Me
          </button>
        </span>
      </StickyHeader>

      <div className="bg-black text-white px-3">
        <section className="container m-auto min-h-screen pb-12">
          <div>
            <h2
              className="text-4xl mb-8 border-b-4 inline-block fancy-border group"
              id="projects"
            >
              <a href="/#projects" className="relative" ref={projectsRef}>
                <span
                  className="px-2 hidden group-hover:inline text-xl text-gray-500 absolute"
                  style={{ left: -28, top: 8 }}
                >
                  #
                </span>
                Projects
              </a>
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
                      <a
                        href={project.fields.url}
                        className="group bg-gray-900"
                      >
                        <img
                          className="h-auto max-w-full lg:max-w-md xl:max-w-xl border-4 border-gray-900 rounded transition duration-200 shadow hover:shadow-2xl hover:border-blue-500"
                          alt={project.fields.image.fields.description}
                          src={`${project.fields.image.fields.file.url}?fm=webp&w=576&q=100`}
                          loading="lazy"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
      <ContactModal
        visible={modalShowing}
        onModalHide={() => setModalShowing(false)}
      />
    </>
  );
}

export const getStaticProps = async () => {
  const { createClient } = require("contentful");
  const config = require("../contentful.json");

  const client = createClient(config);

  const projects = await client.getEntry("6mYI8AwTSfEL6L9rolYP1p");

  return { props: { projects: projects.fields.project } };
};
