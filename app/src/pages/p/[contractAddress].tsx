import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as nearAPI from "near-api-js";
import { PropertyCard } from "api/codegen";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";
import nearUtils from "providers/near";
import { ConditionalEscrowMethods } from "providers/near/conditional-escrow/conditional-escrow.types";
import { DEFAULT_NETWORK_ENV } from "providers/near/getConfig";
import { VIEW_METHODS } from "providers/near/conditional-escrow/constants";
import { ConditionalEscrow } from "providers/near/conditional-escrow";

const PropertyDetails: NextPage<{ property: PropertyCard }> = ({ property }) => (
  <AppLayout>
    <PropertyDetailsContainer property={property} />
  </AppLayout>
);

export async function getServerSideProps({ params, locale }: GetServerSidePropsContext<{ contractAddress: string }>) {
  const contractAddress = params?.contractAddress;

  const near = await nearAPI.connect({
    keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
    headers: {},
    // @TODO DEFAULT_NETWORK_ENV should be dynamic from client headers: testnet or mainnet
    ...nearUtils.getConfig(DEFAULT_NETWORK_ENV),
  });

  const account = await near.account(nearUtils.getConfig(DEFAULT_NETWORK_ENV).guestWalletId);
  const contractMethods = { viewMethods: VIEW_METHODS, changeMethods: [] };

  const contract = nearUtils.initContract<ConditionalEscrowMethods>(
    account,
    contractAddress as string,
    contractMethods,
  );

  const conditionalEscrow = new ConditionalEscrow(contract);
  const metadataUrl = await conditionalEscrow.getMetadataUrl();
  const property = await ConditionalEscrow.getPropertyFromMetadataUrl(metadataUrl);

  return {
    props: { property, ...(await serverSideTranslations(locale!, ["common", "head"])) },
  };
}

export default PropertyDetails;
