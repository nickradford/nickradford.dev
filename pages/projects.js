import Page from "../components/page";
import Project from "../components/project";

export default function Projects({ projects }) {
  return (
    <Page pageTitle="Personal Projects">
      <h1 className="font-scp text-2xl mb-6">{projects.name}</h1>
      <ul>
        {projects.projectCollection.items.map((project) => (
          <li>
            <Project
              {...project}
              showSource={
                project.sourceUrl !== null && project.sourceUrl !== undefined
              }
            />
          </li>
        ))}
      </ul>
      {/* <pre>{JSON.stringify(projects, null, 4)}</pre> */}
    </Page>
  );
}

const gql = `query PersonalProjects {
  projects(id: "6mYI8AwTSfEL6L9rolYP1p") {
    name
    projectCollection{
      items {
        ...on Project{
          title
          url
          technologiesUsed
          sourceUrl
          image {
            title
            description
            url
            width
            height
          }
          description {
            json
          }
        }
      }
    }
  }
}`;

export async function getStaticProps() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  const url = `https://graphql.contentful.com/content/v1/spaces/${space}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ query: gql }),
  };

  const resp = await fetch(url, options);
  const { data } = await resp.json();

  console.log(data);

  return { props: data };
}
