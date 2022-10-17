import { GetStaticPropsContext, NextPage } from "next";
import { i18n } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { BusinessDetailsContainer } from "app/business/BusinessDetails/BusinessDetailsContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { AuthLayout } from "layouts/auth-layout/AuthLayout";
import { BusinessDetailsProps } from "app/business/BusinessDetails/BusinessDetails.types";
import { CheckoutContextController } from "context/checkout/CheckoutContextController";

const Index: NextPage<BusinessDetailsProps> = () => (
  <AppLayout>
    <AuthLayout>
      <CheckoutContextController>
        {/* @TODO We may need to rename this to BusinessCampaignContainer */}
        <BusinessDetailsContainer />
      </CheckoutContextController>
    </AuthLayout>
  </AppLayout>
);

export async function getStaticPaths() {
  // @TODO get all active campaigns' slug and render dynamically
  return {
    paths: [
      { params: { campaignSlug: "el-comalote-gt" }, locale: "es" },
      { params: { campaignSlug: "el-comalote-gt" }, locale: "en" },
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
