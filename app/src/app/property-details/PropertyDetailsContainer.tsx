import { PropertyCard } from "api/codegen";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import {
  CHANGE_METHODS,
  getConstantValues,
  getDefaultContractValues,
  VIEW_METHODS,
} from "providers/near/contract/conditional-escrow";
import { ConditionalEscrowMethods, ConditionalEscrowValues } from "providers/near/contract/conditional-escrow.types";
import { Typography } from "ui/typography/Typography";

import { PropertyDetails2 } from "./PropertyDetails2";

async function getPropertyFromMetadataUrl(url: string) {
  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  return data;
}

export const PropertyDetailsContainer = () => {
  const [contractData, setContractData] = useState<ConditionalEscrowValues>(getDefaultContractValues());
  const [isContractDataLoading, setIsContractDataLoading] = useState(false);
  const [property, setProperty] = useState<PropertyCard>({
    title: "Loading",
    price: 0,
    shortDescription: "Loading",
    longDescription: "Loading",
    category: "Loading",
    expirationDate: "MM/DD/YYYY",
    media: { featuredImageUrl: "/property-details/near-holdings-icon-loading-template.jpg", ipfsURL: "ipfs://" },
  });

  const router = useRouter();
  const wallet = useWalletSelectorContext();
  const toast = useToastContext();

  const contractAddress = router.query.propertySlug;

  const contract = useNearContract<ConditionalEscrowMethods>(wallet, contractAddress as string, {
    viewMethods: VIEW_METHODS,
    changeMethods: CHANGE_METHODS,
  });

  useEffect(() => {
    if (!contract) {
      setContractData(getDefaultContractValues());

      return;
    }

    (async () => {
      try {
        setIsContractDataLoading(true);

        const values = await getConstantValues(contract, wallet);
        const propertyData = await getPropertyFromMetadataUrl(values.metadataURL);

        setContractData(values);
        setProperty(propertyData);

        setIsContractDataLoading(false);
      } catch {
        toast.trigger({
          variant: "error",
          title: "Failed to load contract data",
          withTimeout: true,
          children: <Typography.Text>An error occurred while loading the contract data.</Typography.Text>,
        });
      }
    })();
  }, [contract, toast, wallet]);

  return (
    <PropertyDetails2
      contractData={contractData}
      contract={contract}
      property={property}
      isContractDataLoading={isContractDataLoading}
      contractAddress={contractAddress as string}
    />
  );
};
