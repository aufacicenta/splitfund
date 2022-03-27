import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertiesExplorerContainer } from "app/properties-explorer/PropertiesExplorerContainer";
import { EscrowFactory } from "providers/near/escrow-factory";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import { PropertiesExplorerProps } from "app/properties-explorer/PropertiesExplorer.types";

const Explorer: NextPage<PropertiesExplorerProps> = ({ properties }) => (
  <AppLayout>
    <PropertiesExplorerContainer properties={properties} />
  </AppLayout>
);

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  const contract = await EscrowFactory.getFromConnection();
  const escrowFactory = new EscrowFactory(contract);
  const conditionalEscrowContractIds = await escrowFactory.getConditionalEscrowContractsList();

  // @TODO pagination
  const properties = await Promise.all(
    conditionalEscrowContractIds.map((contractAddress) => ConditionalEscrow.getPropertyCard(contractAddress)),
  );

  return {
    props: {
      properties,
      ...(await serverSideTranslations(locale!, ["common", "head", "properties-explorer"])),
    },
  };
}

export default Explorer;
