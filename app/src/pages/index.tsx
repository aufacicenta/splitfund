import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HomeContainer } from "app/home/home/HomeContainer";
import { AppLayout } from "layouts/app-layout/AppLayout";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import near from "providers/near";
import { HomeProps } from "app/home/home/Home.types";
import { DEFAULT_NETWORK_ENV } from "providers/near/getConfig";
import { EscrowFactory } from "providers/near/escrow-factory";

const Index: NextPage<HomeProps> = ({ featuredActiveHoldings, totalValueLocked }) => (
  <AppLayout>
    <HomeContainer featuredActiveHoldings={featuredActiveHoldings} totalValueLocked={totalValueLocked} />
  </AppLayout>
);

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const { featuredActiveHoldings: featuredActiveHoldingsIds } = near.getConfig(DEFAULT_NETWORK_ENV);

  const featuredActiveHoldings = (
    await Promise.all(
      featuredActiveHoldingsIds.map((contractAddress) => ConditionalEscrow.getPropertyCard(contractAddress)),
    )
  ).filter(Boolean);

  const contract = await EscrowFactory.getFromConnection();
  const escrowFactory = new EscrowFactory(contract);
  const conditionalEscrowContractIds = await escrowFactory.getConditionalEscrowContractsList();

  const totalValueLocked = (
    await Promise.all(
      conditionalEscrowContractIds.map(async (contractAddress) => {
        try {
          const instance = await ConditionalEscrow.getFromConnection(contractAddress);
          const conditionalEscrow = new ConditionalEscrow(instance);
          const funds = await conditionalEscrow.getTotalFunds();

          return funds;
        } catch {
          // @TODO log error
          return 0;
        }
      }),
    )
  ).reduce((curr, next) => curr + next, 0);

  return {
    props: {
      featuredActiveHoldings,
      totalValueLocked: near.formatAccountBalance(BigInt(totalValueLocked).toString(), 8),
      ...(await serverSideTranslations(locale!, ["common", "home", "head"])),
    },
  };
}

export default Index;
