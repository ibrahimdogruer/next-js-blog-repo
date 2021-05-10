import { useEffect, useState } from "react";

import Link from "next/link";
import Loading from "../../components/loading";
import { getAllNodes } from "next-mdx/server";
import { useRouter } from "next/router";

export default function BlogPage({ posts }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPosts, setShowPosts] = useState([]);

  const getPostsByCategory = async (category) => {
    setLoading(true);
    const postsByCategory = category
      ? posts.filter((post) => post.frontMatter.category.includes(category))
      : null;
    setShowPosts(postsByCategory);
    setLoading(false);
  };

  useEffect(() => {
    setShowPosts(posts);
    if (router?.query?.category) {
      getPostsByCategory(router?.query?.category);
    }
  }, [router]);

  if (loading) return <Loading />;

  if (router?.query?.redirectUrl) {
    router.push(router.query.redirectUrl);
    return <Loading />;
  } else {
    return (
      <div className="site-container">
        <div className="space-y-4">
          {showPosts?.map((post) => {
            return (
              <article key={post.url}>
                <h2 className="text-xl font-bold">
                  <Link href={post.url}>
                    <a>{post.frontMatter.title}</a>
                  </Link>
                </h2>
                <p>{post.frontMatter.excerpt}</p>
                <div className="text-gray-400">
                  <span>{post.frontMatter.date}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    );
  }
}

export async function getStaticProps() {
  return {
    props: {
      posts: await getAllNodes("post"),
    },
  };
}
