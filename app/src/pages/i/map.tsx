import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { MapContainer } from "app/map/MapContainer";
import { NearWalletContextController } from "context/near-wallet/NearWalletContextController";

const Map: NextPage = () => (
  <AppLayout>
    <NearWalletContextController>
      <MapContainer />
    </NearWalletContextController>
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

export default Map;
