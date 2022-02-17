import { useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { ConditionalEscrowMethods } from "providers/near/contract/conditional-escrow.types";
import {
  CHANGE_METHODS,
  getMetadataUrl,
  getPropertyFromMetadataUrl,
  VIEW_METHODS,
} from "providers/near/contract/conditional-escrow";
import { useRoutes } from "hooks/useRoutes/useRoutes";

import { PropertyCard, DEFAULT_PROPERTY_CARD_PROPS } from "./PropertyCard";
import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.scss";

export const PropertyCardContainer = ({ contractAddress }: { contractAddress: string }) => {
  const [isContractDataLoading, setIsContractDataLoading] = useState(true);
  const [property, setProperty] = useState<PropertyCardProps["property"]>();

  const wallet = useWalletSelectorContext();
  const routes = useRoutes();

  const contract = useNearContract<ConditionalEscrowMethods>(wallet, contractAddress as string, {
    viewMethods: VIEW_METHODS,
    changeMethods: CHANGE_METHODS,
  });

  useEffect(() => {
    if (!contract) {
      return;
    }

    (async () => {
      try {
        const metadataURL = await getMetadataUrl(contract);
        const propertyData = await getPropertyFromMetadataUrl(metadataURL);

        setProperty(propertyData);
        setIsContractDataLoading(false);
      } catch {
        setIsContractDataLoading(false);
      }
    })();
  }, [contract, wallet]);

  if (isContractDataLoading || !property) {
    return (
      <PropertyCard
        minimal
        property={DEFAULT_PROPERTY_CARD_PROPS}
        action={
          <Button isLoading disabled>
            See Details
          </Button>
        }
      />
    );
  }

  return (
    <PropertyCard
      minimal
      property={property}
      action={
        <Typography.Link href={routes.property.index(contractAddress)} className={styles["property-card__cta"]}>
          See Details
        </Typography.Link>
      }
    />
  );
};
