import { useEffect, useState } from "react";

import Link from "next/link";
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
                  pathname === url ? "text-blue-500 dark:text-yellow-500" : "text-gray-800 dark:text-white"
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
          {theme === "dark" ? (
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-54dw7o-DefaultMode e1llm6650"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Switch to light mode</title>
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="css-11fnkgj-DarkMode e1llm6651"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Switch to dark mode</title>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
