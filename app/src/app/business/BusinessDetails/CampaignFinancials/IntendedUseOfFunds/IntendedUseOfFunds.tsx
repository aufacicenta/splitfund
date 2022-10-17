import clsx from "clsx";

import { Typography } from "ui/typography/Typography";

import { IntendedUseOfFundsProps } from "./IntendedUseOfFunds.types";
import styles from "./IntendedUseOfFunds.module.scss";

export const IntendedUseOfFunds: React.FC<IntendedUseOfFundsProps> = ({ className }) => (
  <div className={clsx(styles["intended-use-of-funds"], className)}>
    <Typography.Headline6>Intended Use of Funds</Typography.Headline6>
    <iframe
      width="100%"
      height="371"
      seamless
      frameBorder="0"
      title="use-of-funds"
      scrolling="no"
      src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSYJ8HWsfZIzeDSTuery2meer1UWz3MGxUBn5LDxFV29vWUMtWrO7nwOmPJ7hIbfwsuQZxyOUk6CdzF/pubchart?oid=184349402&amp;format=interactive"
    />
  </div>
);
