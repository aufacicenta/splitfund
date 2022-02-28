import Head from "next/head";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { PropertiesExplorer } from "./PropertiesExplorer";
import { PropertiesExplorerProps } from "./PropertiesExplorer.types";

export const PropertiesExplorerContainer = ({ properties }: PropertiesExplorerProps) => {
  const { t } = useTranslation("properties-explorer");
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>{t("head.og.title")}</title>
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:image" content={`/shared/og-image_${locale}.png`} />
      </Head>
      <PropertiesExplorer properties={properties} />
    </>
  );
};
