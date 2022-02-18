import { ReactNode, useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { ConditionalEscrowMethods } from "providers/near/contract/conditional-escrow.types";
import {
  CHANGE_METHODS,
  getCurrentPriceEquivalence,
  getMetadataUrl,
  getPropertyFromMetadataUrl,
  VIEW_METHODS,
} from "providers/near/contract/conditional-escrow";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";

import { PropertyCard, DEFAULT_PROPERTY_CARD_PROPS } from "./PropertyCard";
import { PropertyCardProps } from "./PropertyCard.types";
import styles from "./PropertyCard.module.scss";

export const PropertyCardContainer = ({
  contractAddress,
  action,
  minimal = true,
}: {
  contractAddress: string;
  action?: ReactNode;
  minimal?: boolean;
}) => {
  const [isContractDataLoading, setIsContractDataLoading] = useState(true);
  const [property, setProperty] = useState<PropertyCardProps["property"]>();
  const [priceEquivalence, setPriceEquivalence] = useState<PropertyCardProps["priceEquivalence"]>("USD 0.00");

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
        const priceEquivalenceResponse = await getCurrentPriceEquivalence(propertyData.price);

        setProperty(propertyData);
        setPriceEquivalence(`USD ${formatFiatCurrency(priceEquivalenceResponse)}`);
        setIsContractDataLoading(false);
      } catch {
        setIsContractDataLoading(false);
      }
    })();
  }, [contract, wallet]);

  if (isContractDataLoading || !property) {
    return (
      <PropertyCard
        minimal={minimal}
        property={DEFAULT_PROPERTY_CARD_PROPS}
        priceEquivalence={priceEquivalence}
        action={
          action || (
            <Button isLoading disabled>
              See Details
            </Button>
          )
        }
      />
    );
  }

  return (
    <PropertyCard
      minimal={minimal}
      property={property}
      priceEquivalence={priceEquivalence}
      action={
        action || (
          <Typography.Link href={routes.property.index(contractAddress)} className={styles["property-card__cta"]}>
            See Details
          </Typography.Link>
        )
      }
    />
  );
};
