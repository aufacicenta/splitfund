import { BusinessCampaign } from "api/codegen";
import { ReactNode } from "react";

export type BusinessDetailsMedia = {
  featuredImageUrl?: string;
};

export type BusinessFundingCampaignContainerProps = {
  children?: ReactNode;
};

export type BusinessDetailsProps = {
  children?: ReactNode;
  campaign: BusinessCampaign;
};
