import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PropertyPreviewContainer } from "app/property-preview/PropertyPreviewContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";

const Preview: NextPage = () => (
  <AppLayout>
    <PropertyPreviewContainer />
  </AppLayout>
);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "head"])),
    },
  };
}

export default Preview;
