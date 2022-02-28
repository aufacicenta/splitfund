import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PropertyCard } from "api/codegen";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import { PropertyDetailsContainerProps } from "app/property-details/PropertyDetails2.types";

const PropertyDetails: NextPage<PropertyDetailsContainerProps> = ({ property }) => (
  <AppLayout>
    <PropertyDetailsContainer property={property} />
  </AppLayout>
);

export async function getServerSideProps({ params, locale }: GetServerSidePropsContext<{ contractAddress: string }>) {
  const contractAddress = params?.contractAddress;

  const property: PropertyCard = await ConditionalEscrow.getPropertyCard(contractAddress!);

  return {
    props: {
      property,
      ...(await serverSideTranslations(locale!, ["common", "head"])),
    },
  };
}

export default PropertyDetails;
