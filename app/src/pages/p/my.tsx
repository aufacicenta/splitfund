import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertiesExplorerProps } from "app/properties-explorer/PropertiesExplorer.types";
import { MyPropertiesContainer } from "app/property-preview/my-properties/my-properties/MyPropertiesContainer";

const MyProperties: NextPage<PropertiesExplorerProps> = () => (
  <AppLayout>
    <MyPropertiesContainer />
  </AppLayout>
);

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "head"])),
    },
  };
}

export default MyProperties;
