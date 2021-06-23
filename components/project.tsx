import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

type ProjectProps = {
  title: string;
  image: {
    title: string;
    description: string;
    url: string;
    width: number;
    height: number;
  };
  description: any;
};

const Project = ({ title, image, description }: ProjectProps) => (
  <div className="mb-2 p-4 bg-black bg-opacity-70">
    <h2 className="text-2xl font-scp pb-4">{title}</h2>
    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      layout="responsive"
      alt={image.description}
    />
    <article className="prose p-2">
      {documentToReactComponents(description.json)}
    </article>
  </div>
);

export default Project;
