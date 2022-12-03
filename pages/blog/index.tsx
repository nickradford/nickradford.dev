import Page from "@/components/page";
import { getContent } from "lib/content";

function Index() {
  return <Page>List of posts</Page>;
}

export default Index;

export async function getStaticProps() {
  const files = await getContent();
  console.log(files);
  return {
    props: {},
  };
}
