import Page from "../../components/page";
import { getAllPosts } from "../../lib/api";

function BlogPage({ posts }: { posts: BlogPost[] }) {
    return <Page>
        <h1 className='text-3xl font-thin'>Blog</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.sys.id}>
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                </li>
            ))}
        </ul>

    </Page>
}

export const getStaticProps = async () => {
    const posts = await getAllPosts();

    console.log(posts)

    return { props: { posts } };
};


export default BlogPage