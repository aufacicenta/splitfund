import { ApolloProvider } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GQLClient } from "src/providers/graphql/client";

import { ToastContextController } from "context/toast/ToastContextController";
import { LocaleSelector } from "ui/locale-selector/LocaleSelector";
import { NearWalletContextController } from "context/near-wallet/NearWalletContextController";

import { AppLayoutProps } from "./AppLayout.types";

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { t } = useTranslation("head");
  const { locale } = useRouter();

  useEffect(() => {
    // @todo set with a toggle button from navbar or footer
    document.body.dataset.theme = "light";
  }, []);

  return (
    <>
      <Head>
        <title>{t("head.og.title")}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:image" content={`/shared/og-image_${locale}.png`} />
        <meta property="og:url" content="https://aufacicenta.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <link rel="preload" href="/icons/icomoon.eot" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.svg" as="font" crossOrigin="" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2BT20MG97S" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-2BT20MG97S');
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied'
                });
            `,
          }}
        />
      </Head>
      <ApolloProvider client={GQLClient}>
        <ToastContextController>
          <LocaleSelector>
            <NearWalletContextController>
              <div id="modal-root" />
              <main>{children}</main>
            </NearWalletContextController>
          </LocaleSelector>
        </ToastContextController>
      </ApolloProvider>
    </>
  );
};
