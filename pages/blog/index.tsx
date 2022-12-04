import { Page } from "@/components";

function Index() {
  return <Page>List of posts</Page>;
}

export default Index;

export async function getStaticProps() {
  return {
    props: {},
  };
}
