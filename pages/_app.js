import "../styles/global.css";

import { Auth0Provider } from "@auth0/auth0-react";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="ibrahimdogruer-blog.eu.auth0.com"
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_URL}
    >
      <div className="antialiased text-grey-700">
        <Header />
        <main className="mt-6 mb-20">
          <Component {...pageProps} />
        </main>
      </div>
    </Auth0Provider>
  );
}

export default MyApp;
