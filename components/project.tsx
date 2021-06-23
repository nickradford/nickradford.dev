import Image from "next/image";

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
    <h2 className="text-xl font-scp">{title}</h2>
    <Image
      src={image.url}
      width={image.width}
      height={image.height}
      layout="responsive"
      alt={image.description}
    />
  </div>
);

export default Project;
