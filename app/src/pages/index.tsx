import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HomeContainer } from "app/home/home/HomeContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import near from "providers/near";
import { HomeProps } from "app/home/home/Home.types";
import { DEFAULT_NETWORK_ENV } from "providers/near/getConfig";

const Index: NextPage<HomeProps> = ({ featuredActiveHoldings }) => (
  <AppLayout>
    <HomeContainer featuredActiveHoldings={featuredActiveHoldings} />
  </AppLayout>
);

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const { featuredActiveHoldings: featuredActiveHoldingsIds } = near.getConfig(DEFAULT_NETWORK_ENV);

  const featuredActiveHoldings = await Promise.all(
    featuredActiveHoldingsIds.map((contractAddress) => ConditionalEscrow.getPropertyCard(contractAddress)),
  );

  return {
    props: {
      featuredActiveHoldings,
      ...(await serverSideTranslations(locale!, ["common", "head"])),
    },
  };
}

export default Index;
