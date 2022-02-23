import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { CHANGE_METHODS, VIEW_METHODS } from "providers/near/conditional-escrow/constants";
import {
  ConditionalEscrowMethods,
  ConditionalEscrowValues,
} from "providers/near/conditional-escrow/conditional-escrow.types";
import { Typography } from "ui/typography/Typography";
import { DEFAULT_PROPERTY_CARD_PROPS } from "app/properties-explorer/property-card/PropertyCard";
import { PropertyCardProps } from "app/properties-explorer/property-card/PropertyCard.types";
import { ConditionalEscrow } from "providers/near/conditional-escrow";

import { PropertyDetails2 } from "./PropertyDetails2";

export const PropertyDetailsContainer = () => {
  const [contractData, setContractData] = useState<ConditionalEscrowValues>(
    ConditionalEscrow.getDefaultContractValues(),
  );
  const [isContractDataLoading, setIsContractDataLoading] = useState(true);
  const [property, setProperty] = useState<PropertyCardProps["property"]>(DEFAULT_PROPERTY_CARD_PROPS);

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
        const propertyData = await ConditionalEscrow.getPropertyFromMetadataUrl(values.metadataURL);

        setContractData(values);
        setProperty(propertyData);

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
    <PropertyDetails2
      contractData={contractData}
      contract={contract}
      property={property}
      isContractDataLoading={isContractDataLoading}
      contractAddress={contractAddress as string}
    />
  );
};
