import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";

import { SubmitProperty } from "./SubmitProperty";

export const SubmitPropertyContainer = () => {
  const { t } = useTranslation("property-submission");
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
      <SubmitProperty />
    </>
  );
};
