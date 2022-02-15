import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { BusinessDetailsProps } from "app/business/BusinessDetails/BusinessDetails.types";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";

const Index: NextPage<BusinessDetailsProps> = () => (
  <AppLayout>
    <PropertyDetailsContainer />
  </AppLayout>
);

export async function getStaticPaths() {
  // @TODO get all active campaigns' slug and render dynamically
  return {
    paths: [
      { params: { propertySlug: "ce_4f0psbxazblxwqyhpz4f0p.escrowfactory3.nearholdings.testnet" }, locale: "en" },
      {
        params: { propertySlug: "ce_4f0psbxazblxwqyhpz4f0p.escrowfactory3.nearholdings.testnet" },
        locale: "es",
      },
    ],
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
