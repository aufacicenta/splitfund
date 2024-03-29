import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";
import { StableEscrow } from "providers/near/stable-escrow";
import { PropertyDetailsContainerProps } from "app/property-details/PropertyDetails.types";

const PropertyDetails: NextPage<PropertyDetailsContainerProps> = ({ property }) => (
  <AppLayout>
    <PropertyDetailsContainer property={property} />
  </AppLayout>
);

export async function getServerSideProps({ params, locale }: GetServerSidePropsContext<{ contractAddress: string }>) {
  const contractAddress = params?.contractAddress;
  const serverSideTranslationsProps = await serverSideTranslations(locale!, ["common", "head"]);

  try {
    const property = await StableEscrow.getProperty(contractAddress!);

    return {
      props: {
        property,
        ...serverSideTranslationsProps,
      },
    };
  } catch {
    // @TODO log error
  }

  return { props: { property: null, ...serverSideTranslationsProps } };
}

export default PropertyDetails;
