export {};
// import Image from "next/legacy/image";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { Button, LinkButton } from "./button";

// type ProjectProps = {
//   title: string;
//   url: string;
//   technologiesUsed: string[];
//   sourceUrl: string;
//   image: {
//     title: string;
//     description: string;
//     url: string;
//     width: number;
//     height: number;
//   };
//   description: any;

//   showSource: boolean;
// };

// const byLength = (a: string, b: string) =>
//   a.length < b.length ? -1 : a.length > b.length ? 1 : 0;

// const Project = ({
//   title,
//   image,
//   description,
//   url,
//   technologiesUsed,
//   sourceUrl,
//   showSource,
// }: ProjectProps) => (
//   <div className="relative grid-cols-4 p-6 rounded-lg bg-crust bg-opacity-70 sm:grid">
//     <div className="col-span-3">
//       <h2 className="pb-4 text-2xl font-scp">{title}</h2>
//       <Image
//         src={image.url}
//         width={image.width}
//         height={image.height}
//         layout="responsive"
//         alt={image.description}
//         loading="eager"
//       />

//       <article className="p-2 prose">
//         {documentToReactComponents(description.json)}
//       </article>
//     </div>
//     <div className="relative pt-4 sm:pl-4 sm:pt-0">
//       <div className="sticky top-20">
//         <LinkButton href={url} className="mb-4 border hover:border-red">
//           View Site
//         </LinkButton>
//         {showSource ? (
//           <LinkButton
//             href={sourceUrl}
//             className="mb-4 border hover:border-red"
//           >
//             View Source
//           </LinkButton>
//         ) : null}
//         <h3 className="font-scp">Technologies Used</h3>
//         <div className="pt-2 sm:flex sm:flex-col sm:items-start">
//           {technologiesUsed.sort(byLength).map((tech) => (
//             <span
//               className="inline-block px-2 py-1 mb-2 mr-2 text-sm border border-opacity-50 border-yellow font-scp"
//               key={tech}
//             >
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default Project;
