import { getMdxNode, getMdxPaths } from "next-mdx/server";

import { mdxComponents } from "../../components/mdx-component";
import { useHydrate } from "next-mdx/client";

export default function PostPage({ post }) {
  const content = useHydrate(post, {
    components: mdxComponents,
  });
  console.log(post);
  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <p className="">{post.frontMatter.excerpt}</p>
        <hr className="my-4" />
        <div className="prose">{content}</div>
      </article>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths("post"),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const post = await getMdxNode("post", context);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
