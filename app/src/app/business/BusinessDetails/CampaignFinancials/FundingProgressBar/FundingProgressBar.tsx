import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import convert from "providers/currency/convert";
import formatFiatCurrency from "providers/currency/formatFiatCurrency";
import { Typography } from "ui/typography/Typography";
import { Card } from "ui/card/Card";

import styles from "./FundingProgressBar.module.scss";
import { FundingProgressBarProps } from "./FundingProgressBar.types";

export const FundingProgressBar: React.FC<FundingProgressBarProps> = ({ className, funded, min, max }) => {
  const { t } = useTranslation("campaign");
  const [progress, setProgress] = useState(0);
  const [totalFiatFunded, setTotalFiatFunded] = useState(0);
  const [minProgress, setMinProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const btcFunded = convert.satoshi_btc(funded);
      const conversion = await convert.btc_usd(btcFunded);

      setTotalFiatFunded(conversion);
      setProgress((conversion / max) * 100);
      setMinProgress((min / max) * 100);
    })();
  }, [funded, max, min]);

  return (
    <>
      <Typography.Headline6>{t("fundingProgressBar.totalBitcoinCollected.title")}</Typography.Headline6>
      <Card shadow className={styles["funding-progress-bar__card"]}>
        <div className={styles["funding-progress-bar__digits"]}>
          <Typography.Text style={{ width: `${minProgress}%` }}>{formatFiatCurrency(min)} min.</Typography.Text>
          <Typography.Text>{formatFiatCurrency(max)} max.</Typography.Text>
        </div>
        <div className={clsx(styles["funding-progress-bar"], className)}>
          <Typography.Text className={styles["funding-progress-bar__funded-amount"]}>
            {formatFiatCurrency(totalFiatFunded)} {t("fundingProgressBar.totalBitcoinCollected.description")}
          </Typography.Text>
          <div className={styles["funding-progress-bar__funded-bar"]} style={{ width: `${progress}%` }} />
        </div>
      </Card>
    </>
  );
};
