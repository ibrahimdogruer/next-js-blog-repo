import { useEffect, useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

export default function Form({ onSubmit, text, setText }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const url = window.location.origin + window.location.pathname;
    setUrl(url);
  }, []);

  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <textarea
        rows="3"
        className="border border-gray-300 rounded w-full block px-2 py-1"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <div className="mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 px-2 py-1 rounded text-white">
              Send
            </button>
            <img src={user.picture} width={30} className="rounded-full" />
            <span>{user.name}</span>
            <button
              typeof="button"
              onClick={() =>
                logout({ returnTo: process.env.NEXT_PUBLIC_URL + "/blog" })
              }
            >
              <span className="text-red-800">x</span>
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-600 px-2 py-1 rounded text-white"
              typeof="button"
              onClick={() => loginWithRedirect({ redirectUri: process.env.NEXT_PUBLIC_URL + "/blog" })}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
