import { DateTime } from "luxon";
import Link from "next/link";

export default function PostMeta({ post }) {
  return (
    <div className="flex text-gray-500 mt-2 justify-between flex-col md:flex-row">
      <div className="flex-row">
        {post.frontMatter.author.length ? (
          <span className="inline-block mr-2 md:mr-4 dark:text-gray-500">
            Yazar{" "}
            {post.frontMatter.author.map((author, index) => (
              <strong
                className="font-semibold text-blue-500 dark:text-yellow-500"
                key={index}
              >
                {index !== 0 && " and "} <a>{author}</a>
              </strong>
            ))}
          </span>
        ) : null}
        <span className="inline-block mr-2 md:mr-4 dark:text-gray-500">
          Kategori{" "}
          {post.frontMatter.category.map((category, index) => (
            <span
              className="font-semibold text-blue-500 dark:text-yellow-500"
              key={index}
            >
              {index !== 0 && " and "}{" "}
              <Link href={`/blog?category=${category}`}>
                <a>{category}</a>
              </Link>
            </span>
          ))}
        </span>
      </div>
      <span className="mx-6 text-right">
        <span>
          {DateTime.fromSQL(post.frontMatter.date).toFormat("DDD", {
            locale: "tr",
          })}
        </span>
      </span>
    </div>
  );
}
