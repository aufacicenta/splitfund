import clsx from "clsx";

import { NearHoldingsIcon } from "ui/icons/NearHoldingsIcon";

import { GenericLoaderProps } from "./GenericLoader.types";
import styles from "./GenericLoader.module.scss";

export const GenericLoader: React.FC<GenericLoaderProps> = ({ className }) => (
  <div className={clsx(styles["generic-loader"], className)}>
    <div className={clsx(styles["generic-loader__logo"], className)}>
      <NearHoldingsIcon />
    </div>
  </div>
);
