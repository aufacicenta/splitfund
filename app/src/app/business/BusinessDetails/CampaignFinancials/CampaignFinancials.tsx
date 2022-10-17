import clsx from "clsx";

import { Typography } from "ui/typography/Typography";

import { CampaignFinancialsProps } from "./CampaignFinancials.types";
import styles from "./CampaignFinancials.module.scss";
import { FundingProgressBar } from "./FundingProgressBar/FundingProgressBar";
import { IntendedUseOfFunds } from "./IntendedUseOfFunds/IntendedUseOfFunds";

export const CampaignFinancials: React.FC<CampaignFinancialsProps> = ({ className, campaign }) => (
  <div className={clsx(styles["campaign-financials"], className)}>
    <FundingProgressBar
      min={campaign.minFundingInUSD}
      max={campaign.maxFundingInUSD}
      funded={campaign.totalSatsInvested}
    />

    <IntendedUseOfFunds />

    <Typography.Headline6>Financial Forecasts</Typography.Headline6>
    <Typography.Text>...</Typography.Text>
    <Typography.Headline6>Documents</Typography.Headline6>
    <Typography.Text>...</Typography.Text>
    <Typography.Headline6>Summary of Terms</Typography.Headline6>
    <Typography.Text>...</Typography.Text>
    <Typography.Headline5>Financial Condition</Typography.Headline5>
    <Typography.Headline6>Operating History</Typography.Headline6>
    <Typography.Text>...</Typography.Text>
    <Typography.Headline6>Other outstanding debt or equity</Typography.Headline6>
    <Typography.Text>...</Typography.Text>
    <Typography.Headline5>Risk Factors</Typography.Headline5>
    <Typography.Text>...</Typography.Text>
  </div>
);
