import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

export default function Form({ onSubmit, text, setText }) {
  const { loginWithPopup, loginWithRedirect, logout, isAuthenticated, user } =
    useAuth0();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const url = window.location.pathname;
    setUrl(url);
  }, []);

  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <textarea
        rows="3"
        placeholder="Mesaj yaz..."
        className="border border-tureGray-300 rounded w-full block px-2 py-1
        dark:border-trueGray-700"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <button
              className="bg-blue-600 px-2 py-1 rounded text-white
            dark:bg-yellow-500"
            >
              Send
            </button>
            <img
              src={user.picture}
              width={30}
              className="rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/avatar.jpeg";
              }}
            />
            <span>{user.name}</span>
            <button
              typeof="button"
              onClick={() =>
                logout({
                  returnTo:
                    process.env.NEXT_PUBLIC_URL + "/blog?redirectUrl=" + url,
                })
              }
            >
              <span className="text-red-800">x</span>
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-600 px-2 py-1 rounded text-white
              dark:bg-yellow-500"
              typeof="button"
              onClick={() =>
                loginWithRedirect({
                  redirectUri:
                    process.env.NEXT_PUBLIC_URL + "/blog?redirectUrl=" + url,
                })
              }
            >
              Login
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
