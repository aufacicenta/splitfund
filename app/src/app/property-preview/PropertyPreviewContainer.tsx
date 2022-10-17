import { useRouter } from "next/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import { useRoutes } from "hooks/useRoutes/useRoutes";
import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { PropertyPreview } from "./PropertyPreview";

export const PropertyPreviewContainer = () => {
  const router = useRouter();
  const routes = useRoutes();
  const { t } = useTranslation("head");

  if (!router.isReady) {
    return <GenericLoader />;
  }

  const responseId = router.query?.responseId;

  if (!responseId) {
    router.push(routes.notFound);

    return null;
  }

  return (
    <>
      <Head>
        <title>{t("head.og.title")}</title>
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:image" content={`/shared/og-image_${router.locale}.png`} />
      </Head>
      <PropertyPreview responseId={responseId as string} />
    </>
  );
};
