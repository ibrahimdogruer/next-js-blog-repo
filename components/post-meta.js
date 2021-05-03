import Link from "next/link";

export default function PostMeta({ post }) {
  return (
    <div className="flex text-gray-500 mt-2 justify-between">
      <div>
        {post.frontMatter.author.length ? (
          <span className="inline-block mr-4">
            Yazar{" "}
            {post.frontMatter.author.map((author, index) => (
              <strong className="font-semibold text-blue-600" key={index}>
                {index !== 0 && " and "} <a>{author}</a>
              </strong>
            ))}
          </span>
        ) : null}
        <span className="inline-block mr-2">
          Kategori{" "}
          {post.frontMatter.category.map((category, index) => (
            <span className="font-semibold text-blue-600" key={index}>
              {index !== 0 && " and "} <a>{category}</a>
            </span>
          ))}
        </span>
      </div>
      <span className="mx-6">
        <span>{post.frontMatter.date}</span>
      </span>
    </div>
  );
}
