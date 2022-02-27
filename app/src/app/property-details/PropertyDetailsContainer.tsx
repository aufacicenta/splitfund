import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { CHANGE_METHODS, VIEW_METHODS } from "providers/near/conditional-escrow/constants";
import {
  ConditionalEscrowMethods,
  ConditionalEscrowValues,
} from "providers/near/conditional-escrow/conditional-escrow.types";
import { Typography } from "ui/typography/Typography";
import { ConditionalEscrow } from "providers/near/conditional-escrow";
import ipfs from "providers/ipfs";

import { PropertyDetails2 } from "./PropertyDetails2";
import { PropertyDetailsContainerProps } from "./PropertyDetails2.types";

export const PropertyDetailsContainer = ({ property }: PropertyDetailsContainerProps) => {
  const [contractData, setContractData] = useState<ConditionalEscrowValues>(
    ConditionalEscrow.getDefaultContractValues(),
  );
  const [isContractDataLoading, setIsContractDataLoading] = useState(true);

  const router = useRouter();
  const wallet = useWalletSelectorContext();
  const toast = useToastContext();

  const { contractAddress } = router.query;

  const contract = useNearContract<ConditionalEscrowMethods>(wallet, contractAddress as string, {
    viewMethods: VIEW_METHODS,
    changeMethods: CHANGE_METHODS,
  });

  useEffect(() => {
    if (!contract || !router.isReady) {
      setContractData(ConditionalEscrow.getDefaultContractValues());

      return;
    }

    (async () => {
      try {
        const conditionalEscrow = new ConditionalEscrow(contract);
        const values = await conditionalEscrow.getConstantValues(wallet);

        setContractData(values);
        setIsContractDataLoading(false);
      } catch {
        setIsContractDataLoading(false);

        toast.trigger({
          variant: "error",
          title: "Failed to load contract data",
          withTimeout: true,
          children: <Typography.Text>An error occurred while loading the contract data.</Typography.Text>,
        });
      }
    })();
  }, [contract, router.isReady, toast, wallet]);

  return (
    <>
      <Head>
        <title>{property.title}</title>
        <meta name="description" content={property.shortDescription} />
        <meta property="og:title" content={property.title} />
        <meta property="og:description" content={property.shortDescription} />
        <meta property="og:image" content={ipfs.asHttpsURL(property.media.featuredImageUrl)} />
      </Head>
      <PropertyDetails2
        contractData={contractData}
        contract={contract}
        property={property}
        isContractDataLoading={isContractDataLoading}
        contractAddress={contractAddress as string}
      />
    </>
  );
};
