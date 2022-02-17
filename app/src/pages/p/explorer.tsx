import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertiesExplorerContainer } from "app/properties-explorer/PropertiesExplorerContainer";

const Explorer: NextPage = () => (
  <AppLayout>
    <PropertiesExplorerContainer />
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

export default Explorer;
