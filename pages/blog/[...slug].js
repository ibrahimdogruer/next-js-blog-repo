import { getMdxNode, getMdxPaths } from "next-mdx/server";

import Comments from "../../components/comments";
import Form from "../../components/form";
import PostMeta from "../../components/post-meta";
import { mdxComponents } from "../../components/mdx-component";
import useComments from "../../hooks/useComments";
import { useHydrate } from "next-mdx/client";

export default function PostPage({ post }) {
  const [comments, onSubmit, text, setText] = useComments();

  const content = useHydrate(post, {
    components: mdxComponents,
  });

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <PostMeta post={post} />
        <hr className="my-4" />

        {post.frontMatter.image && (
          <div className="site-4xl-container my-8">
            <img src={post.frontMatter.image} alt="" />
          </div>
        )}

        <div className="prose site-4xl-container">{content}</div>
      </article>

      <Form onSubmit={onSubmit} setText={setText} text={text} />
      <Comments comments={comments} />
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
