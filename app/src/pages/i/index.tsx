import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertiesIndexContainer } from "app/properties-explorer/PropertiesIndex/PropertiesIndexContainer";

const BusinessCampaigns: NextPage = () => (
  <AppLayout>
    <PropertiesIndexContainer />
  </AppLayout>
);

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "i", "head"])),
    },
  };
};

export default BusinessCampaigns;
