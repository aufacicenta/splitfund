import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "next-i18next";
import { HomeContainer } from "src/components/home/HomeContainer";
import { HomeProps } from "src/components/home/Home.types";

import { AppLayout } from "layouts/app-layout/AppLayout";
import near from "providers/near";

const Index: NextPage<HomeProps> = ({ featuredActiveHoldings, totalValueLocked }) => (
  <AppLayout>
    <HomeContainer featuredActiveHoldings={featuredActiveHoldings} totalValueLocked={totalValueLocked} />
  </AppLayout>
);

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const featuredActiveHoldings = null;

  const totalValueLocked = 0;

  await i18n?.reloadResources();

  return {
    props: {
      featuredActiveHoldings,
      totalValueLocked: near.formatAccountBalance(BigInt(totalValueLocked).toString(), 8),
      ...(await serverSideTranslations(locale!, ["common", "home", "head"])),
    },
  };
}

export default Index;
