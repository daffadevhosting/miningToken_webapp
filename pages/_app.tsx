import Head from "next/head";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import * as Popper from "@popperjs/core"

function MyApp({ Component, pageProps }: AppProps) {

useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
}, []);

  return (
<>
<Head>
<meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="PWA App" />
<meta name="description" content="Best PWA App in the world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/fav/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />
<meta
  name='viewport'
  content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
/>
<link rel="icon" type="image/png" sizes="32x32" href="/icons/fav/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/fav/favicon-16x16.png" />
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/fav/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="/" />
<meta name="twitter:title" content="Mining App" />
<meta name="twitter:description" content="Best PWA App in the world" />
<meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
<meta name="twitter:creator" content="@unangningEU" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best Mining App" />
<meta property="og:site_name" content="Mining App" />
<meta property="og:url" content="/" />
<meta property="og:image" content="/icons/apple-touch-icon.png" />
</Head>
    <ThirdwebProvider desiredChainId={ChainId.FantomTestnet}>
      <Component {...pageProps} />
    </ThirdwebProvider>
</>
  );
}

export default MyApp;
