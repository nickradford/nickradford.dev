import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Button, LinkButton } from "./button";

type ProjectProps = {
  title: string;
  url: string;
  technologiesUsed: string[];
  sourceUrl: string;
  image: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
  description: any;

  showSource: boolean;
};

const byLength = (a: string, b: string) =>
  a.length < b.length ? -1 : a.length > b.length ? 1 : 0;

const Project = ({
  title,
  image,
  description,
  url,
  technologiesUsed,
  sourceUrl,
  showSource,
}: ProjectProps) => (
  <div className="mb-2 p-4 bg-black bg-opacity-70 sm:grid grid-cols-4 relative">
    <div className="col-span-3">
      <h2 className="text-2xl font-scp pb-4">{title}</h2>
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        layout="responsive"
        alt={image.description}
        loading="eager"
      />

      <article className="prose p-2">
        {documentToReactComponents(description.json)}
      </article>
    </div>
    <div className="sm:pl-4 pt-4 sm:pt-0 relative">
      <div className="sticky top-20">
        <LinkButton href={url} className="border hover:border-primary mb-4">
          View Site
        </LinkButton>
        {showSource ? (
          <LinkButton
            href={sourceUrl}
            className="border hover:border-primary mb-4"
          >
            View Source
          </LinkButton>
        ) : null}
        <h3 className="font-scp">Technologies Used</h3>
        <div className="pt-2 sm:flex sm:flex-col sm:items-start">
          {technologiesUsed.sort(byLength).map((tech) => (
            <span
              className="py-1 px-2 border border-primary border-opacity-50 mb-2 font-scp text-sm inline-block mr-2"
              key={tech}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Project;
