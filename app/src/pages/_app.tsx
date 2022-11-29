import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import { setConfiguration } from "react-grid-system";

import { GenericLoader } from "ui/generic-loader/GenericLoader";
import "../theme/globals.scss";
import "src/styles/globals.css";

setConfiguration({ containerWidths: [540, 740, 960, 1280, 1540], gutterWidth: 32 });

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (loading) {
    return <GenericLoader />;
  }

  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
