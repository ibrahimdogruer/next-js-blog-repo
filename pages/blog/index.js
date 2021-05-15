import { useEffect, useState } from "react";

import { DateTime } from "luxon";
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
          className="space-x-4 flex whitespace-nowrap overflow-x-auto py-2 mb-4 md:px-6"
          id="category-list"
        >
          <button
            type="button"
            className={`py-1 px-4 rounded-2xl border border-gray-300 focus:outline-none
            ${
              selectedCategory === "all"
                ? "bg-trueGray-500 text-white dark:bg-trueGray-300 dark:text-trueGray-800 dark:border-trueGray-300"
                : "bg-trueGray-100 text-trueGray-800 dark:bg-trueGray-700 dark:text-trueGray-300 dark:border-trueGray-500"
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
                    ? "bg-trueGray-500 text-white dark:bg-trueGray-300 dark:text-trueGray-800 dark:border-trueGray-300"
                    : "bg-trueGray-100 text-trueGray-800 dark:bg-trueGray-700 dark:text-trueGray-300 dark:border-trueGray-500"
                }`}
                onClick={() => getPostsByCategory(category.slug)}
              >
                <span>{category.frontMatter.name}</span>
              </button>
            );
          })}
        </div>
        <div className="space-y-4 md:px-6">
          {showPosts?.map((post) => {
            return (
              <Link href={post.url}>
                <article
                  key={post.url}
                  className="shadow-md rounded transition duration-500 ease-in-out
                transform hover:scale-1025 cursor-pointer
                dark:bg-trueGray-700"
                >
                  {post.frontMatter.image && (
                    <img
                      src={post.frontMatter.image}
                      alt=""
                      className="rounded-t"
                    />
                  )}
                  <div className="float-right py-1 px-3">
                    <span className="text-gray-400">
                      {DateTime.fromSQL(post.frontMatter.date).toFormat("DDD", {
                        locale: "tr",
                      })}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold">
                      <a>{post.frontMatter.title}</a>
                    </h2>
                    <p>{post.frontMatter.excerpt}</p>
                  </div>
                </article>
              </Link>
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
