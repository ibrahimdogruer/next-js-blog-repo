import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

const MENU = [
  { id: 1, url: "/", text: "Hakkımda" },
  { id: 2, url: "/blog", text: "Yazılar" },
];

export default function Header() {
  const router = useRouter();
  const splitPath = router.pathname.split("/");
  const pathname = splitPath.length > 2 ? `/${splitPath[1]}` : router.pathname;

  useEffect(() => {
    console.log(MENU);
  }, []);

  return (
    <header className="site-container pt-6 pb-4">
      <nav className="space-x-4">
        {MENU.map(({ id, url, text }) => {
          return (
            <Link href={url} key={id}>
              <a
                className={`hover:text-gray-700 text-lg ${
                  pathname === url ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {text}
              </a>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
