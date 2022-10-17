import React from "react";
import clsx from "clsx";
import { Trans, useTranslation } from "react-i18next";

import { Card } from "ui/card/Card";
import { Grid } from "ui/grid/Grid";
import { Typography } from "ui/typography/Typography";

import styles from "./BusinessCampaignCard.module.scss";
import { BusinessCampaignCardProps } from "./BusinessCampaign.types";

const truncateRaisedAmount = (raised: number) => {
  if (!raised) return "0";

  const truncated = Intl.NumberFormat("en-US", {
    notation: "compact",
  }).format(raised);

  return truncated;
};

export const BusinessCampaignCard: React.FC<BusinessCampaignCardProps> = ({ campaign, className, ...props }) => {
  const { t } = useTranslation("i");

  return (
    <div className={clsx(styles["campaign-card"], className)} {...props}>
      <Card shadow backgroundImageUrl={campaign.content.media.featuredImageUrl}>
        <Card.Content>
          <div className={styles["campaign-card__content"]}>
            <Typography.Headline4>{campaign.content.title}</Typography.Headline4>
            <Typography.Description>
              {campaign.content.country} - {campaign.content.category}
            </Typography.Description>
            <Typography.Text>{campaign.content.description}</Typography.Text>
          </div>
          <Grid.Row>
            <Grid.Col className={styles["campaign-card__short"]}>
              <Typography.Headline6>{truncateRaisedAmount(campaign.totalSatsInvested)} SAT</Typography.Headline6>
              <Typography.MiniDescription>{t("businessCampaignCard.funded")}</Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col className={styles["campaign-card__short"]}>
              <Typography.Headline6>{campaign.totalInvestors}</Typography.Headline6>
              <Typography.MiniDescription>
                <Trans count={campaign.totalInvestors}>{t("businessCampaignCard.investors")}</Trans>
              </Typography.MiniDescription>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col className={styles["campaign-card__short"]}>
              <Typography.Headline6>{campaign.investmentMultiple}x</Typography.Headline6>
              <Typography.MiniDescription>{t("businessCampaignCard.investmentMultiple")}</Typography.MiniDescription>
            </Grid.Col>
            <Grid.Col className={styles["campaign-card__short"]}>
              <Typography.Headline6>{campaign.daysLeft}</Typography.Headline6>
              <Typography.MiniDescription>{t("businessCampaignCard.daysLeft")}</Typography.MiniDescription>
            </Grid.Col>
          </Grid.Row>
        </Card.Content>
      </Card>
    </div>
  );
};
