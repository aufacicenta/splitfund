import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "next-i18next";

import { Typography } from "ui/typography/Typography";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";

import { TotalValueLockedWidgetProps } from "./TotalValueLockedWidget.types";
import styles from "./TotalValueLockedWidget.module.scss";

export const TotalValueLockedWidget: React.FC<TotalValueLockedWidgetProps> = ({ className }) => {
  const [totalValueLocked] = useState("0.00");

  const { t } = useTranslation(["home", "common"]);
  const wallet = useWalletSelectorContext();

  return (
    <div className={clsx(styles["total-value-locked-widget"], className)}>
      <Typography.Description>
        {t("navbar.totalValueLocked", { ns: "common" })} · {wallet.network}
      </Typography.Description>
      <Typography.Text className={styles["total-value-locked-widget__amount"]}>{totalValueLocked}</Typography.Text>
    </div>
  );
};
