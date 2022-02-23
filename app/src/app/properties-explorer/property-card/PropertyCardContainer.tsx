import { ReactNode, useEffect, useState } from "react";

import { useNearContract } from "hooks/useNearContract/useNearContract";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { Typography } from "ui/typography/Typography";
import { Button } from "ui/button/Button";
import { ConditionalEscrowMethods } from "providers/near/conditional-escrow/conditional-escrow.types";
import { CHANGE_METHODS, VIEW_METHODS } from "providers/near/conditional-escrow/constants";
import { useRoutes } from "hooks/useRoutes/useRoutes";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";
import { ConditionalEscrow } from "providers/near/conditional-escrow";

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
  const [fundedPercentage, setFundedPercentage] = useState<PropertyCardProps["fundedPercentage"]>("0");

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
        const conditionalEscrow = new ConditionalEscrow(contract);

        const metadataURL = await conditionalEscrow.getMetadataUrl();
        const propertyData = await ConditionalEscrow.getPropertyFromMetadataUrl(metadataURL);
        const priceEquivalenceResponse = await ConditionalEscrow.getCurrentPriceEquivalence(propertyData.price);
        const fundedPercentageResponse = await conditionalEscrow.getTotalFundedPercentage();

        setProperty(propertyData);
        setPriceEquivalence(`USD ${formatFiatCurrency(priceEquivalenceResponse)}`);
        setFundedPercentage(fundedPercentageResponse.toString());
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
      fundedPercentage={fundedPercentage}
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
