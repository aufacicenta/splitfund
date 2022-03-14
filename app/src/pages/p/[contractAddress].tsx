import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Property } from "api/codegen";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { PropertyDetailsContainer } from "app/property-details/PropertyDetailsContainer";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import { PropertyDetailsContainerProps } from "app/property-details/PropertyDetails2.types";
import { PropertyPreviewError } from "app/property-preview/property-preview-error/PropertyPreviewError";

const PropertyDetails: NextPage<PropertyDetailsContainerProps> = ({ property }) => {
  if (!property) {
    return (
      <AppLayout>
        <PropertyPreviewError />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PropertyDetailsContainer property={property} />
    </AppLayout>
  );
};

export async function getServerSideProps({ params, locale }: GetServerSidePropsContext<{ contractAddress: string }>) {
  const contractAddress = params?.contractAddress;
  const serverSideTranslationsProps = await serverSideTranslations(locale!, ["common", "head"]);

  try {
    const property: Property = await ConditionalEscrow.getPropertyCard(contractAddress!);

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
