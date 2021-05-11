import { useEffect, useState } from "react";

import Link from "next/link";
import Loading from "../../components/loading";
import { getAllNodes } from "next-mdx/server";
import { useRouter } from "next/router";

export default function BlogPage({ posts, categories }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPosts, setShowPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getPostsByCategory = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    const postsByCategory =
      category === "all"
        ? posts
        : posts.filter((post) => post.frontMatter.category.includes(category));
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
        <div
          className="space-x-4 flex whitespace-nowrap overflow-x-auto py-2 mb-4 px-6"
          id="category-list"
        >
          <button
            type="button"
            className={`py-1 px-4 rounded-2xl border border-gray-300 focus:outline-none
            ${
              selectedCategory === "all"
                ? "bg-gray-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => getPostsByCategory("all")}
          >
            <span>Hepsi</span>
          </button>
          {categories?.map((category) => {
            return (
              <button
                type="button"
                key={category.slug}
                className={`py-1 px-4 rounded-2xl border border-gray-300 focus:outline-none
                ${
                  selectedCategory === category.slug
                    ? "bg-gray-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => getPostsByCategory(category.slug)}
              >
                <span>{category.frontMatter.name}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-4 px-6">
          {showPosts?.map((post) => {
            return (
              <article
                key={post.url}
                className="shadow-md rounded transition duration-500 ease-in-out
                transform hover:scale-1025 cursor-pointer"
              >
                {post.frontMatter.image && (
                  <img
                    src={post.frontMatter.image}
                    alt=""
                    className="rounded-t"
                  />
                )}
                <div className="float-right py-1 px-3">
                  <span className="text-gray-400">{post.frontMatter.date}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold">
                    <Link href={post.url}>
                      <a>{post.frontMatter.title}</a>
                    </Link>
                  </h2>
                  <p>{post.frontMatter.excerpt}</p>
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
      categories: await getAllNodes("category"),
    },
  };
}
