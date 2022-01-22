import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { BusinessDetailsProps } from "app/business/BusinessDetails/BusinessDetails.types";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";
import { NearWalletContextController } from "context/near-wallet/NearWalletContextController";

const Index: NextPage<BusinessDetailsProps> = () => (
  <AppLayout>
    <NearWalletContextController>
      <PropertyDetailsContainer />
    </NearWalletContextController>
  </AppLayout>
);

export async function getStaticPaths() {
  // @TODO get all active campaigns' slug and render dynamically
  return {
    paths: [{ params: { propertySlug: "example-property-slug_gt" }, locale: "es" }],
    fallback: false,
  };
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  await i18n?.reloadResources();

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "campaign", "head"])),
    },
  };
}

export default Index;
