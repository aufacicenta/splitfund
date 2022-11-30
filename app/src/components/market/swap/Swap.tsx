import clsx from "clsx";
import { useEffect } from "react";

import { useRefFinanceSdk } from "hooks/near/useRefFinanceSDK/useRefFinanceSdk";
import { RefSwapWidget } from "ui/splitfund/ref-swap-widget/RefSwapWidget";

import { SwapProps } from "./Swap.types";
import styles from "./Swap.module.scss";

export const Swap: React.FC<SwapProps> = ({ className, property }) => {
  const refSDK = useRefFinanceSdk();

  useEffect(() => {
    refSDK.getTokenMetadata(property.contract.id);
  }, []);

  console.log(refSDK.ftMetadata);

  return <RefSwapWidget className={clsx(styles.swap, className)} property={property} />;
};
