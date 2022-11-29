import { GetServerSidePropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MarketContainer } from "app/market/MarketContainer";
import { MarketContainerProps } from "app/market/Market.types";

import { AppLayout } from "layouts/app-layout/AppLayout";
import { StableEscrow } from "providers/near/stable-escrow";

const Market: NextPage<MarketContainerProps> = ({ property }) => (
  <AppLayout>
    <MarketContainer property={property} />
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

export default Market;
