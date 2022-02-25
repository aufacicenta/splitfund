import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import near from "providers/near";

import { Home2 } from "./Home2";

export const HomeContainer = () => {
  const { t } = useTranslation("head");
  const { locale } = useRouter();
  const wallet = useWalletSelectorContext();

  const { featuredActiveHoldings } = near.getConfig(wallet.network);

  return (
    <>
      <Head>
        <title>{t("head.og.title")}</title>
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:image" content={`/shared/og-image_${locale}.png`} />
      </Head>
      <Home2 featuredActiveHoldings={featuredActiveHoldings} />
    </>
  );
};
