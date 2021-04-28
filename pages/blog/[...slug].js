import { getMdxNode, getMdxPaths } from "next-mdx/server";

import PostMeta from "../../components/post-meta";
import { mdxComponents } from "../../components/mdx-component";
import { useAuth0 } from "@auth0/auth0-react";
import { useHydrate } from "next-mdx/client";

export default function PostPage({ post }) {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const content = useHydrate(post, {
    components: mdxComponents,
  });
  console.log(post);
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

        <div className="prose">{content}</div>
      </article>

      <div>
        <form action="" className="mt-10">
          <textarea rows="3" className="border border-gray-300 rounded w-full block px-2 py-1" />

          <div className="mt-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <button className="bg-blue-600 px-2 py-1 rounded text-white">Send</button>
                <img src={user.picture} width={30} className="rounded-full" />
                <span>{user.name}</span>
                <button
                  typeof="button"
                  onClick={() =>
                    logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })
                  }
                >
                  x
                </button>
              </div>
            ) : (
              <div>
                <button className="bg-blue-600 px-2 py-1 rounded text-white" typeof="button" onClick={() => loginWithRedirect()}>
                  Login
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
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
