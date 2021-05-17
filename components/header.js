import { useEffect, useState } from "react";

import Light from "../icons/light";
import Link from "next/link";
import Moon from "../icons/moon";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

const MENU = [
  { id: 1, url: "/", text: "Hakkımda" },
  { id: 2, url: "/blog", text: "Yazılar" },
];

export default function Header() {
  const router = useRouter();
  const splitPath = router.pathname.split("/");
  const pathname = splitPath.length > 2 ? `/${splitPath[1]}` : router.pathname;

  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  return (
    <header className="site-container pt-6 pb-4">
      <nav className="space-x-4">
        {MENU.map(({ id, url, text }) => {
          return (
            <Link href={url} key={id}>
              <a
                className={`hover:text-gray-700 text-lg ${
                  pathname === url
                    ? "text-blue-500 dark:text-yellow-500"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {text}
              </a>
            </Link>
          );
        })}
        <button
          className="flex justify-center items-center float-right p-1 bg-yellow-500 text-white border border-yellow-500 rounded-full
          focus:outline-none hover:bg-black hover:border-black
        dark:bg-black dark:border-white dark:hover:bg-yellow-500"
          onClick={switchTheme}
        >
          {theme === "dark" ? <Light size={16} /> : <Moon size={16} />}
        </button>
      </nav>
    </header>
  );
}
