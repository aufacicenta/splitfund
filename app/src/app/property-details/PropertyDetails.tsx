import clsx from "clsx";

import { WalletSelector } from "ui/wallet-selector/WalletSelector";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MainPanel } from "ui/mainpanel/MainPanel";

import { PropertyDetailsProps } from "./PropertyDetails.types";
import styles from "./PropertyDetails.module.scss";

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ children, className }) => (
  <div className={clsx(styles["property-details"], className)}>
    <WalletSelectorNavbar>
      <WalletSelector />
    </WalletSelectorNavbar>
    <MainPanel>{children}</MainPanel>
  </div>
);
