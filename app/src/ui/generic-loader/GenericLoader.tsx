import clsx from "clsx";

import { SplitfundIcon } from "ui/icons/SplitfundIcon";

import styles from "./GenericLoader.module.scss";
import { GenericLoaderProps } from "./GenericLoader.types";

export const GenericLoader: React.FC<GenericLoaderProps> = ({ className }) => (
  <div className={clsx(styles["generic-loader"], className)}>
    <div className={clsx(styles["generic-loader__logo"], className)}>
      <SplitfundIcon />
    </div>
  </div>
);
