import { BusinessCampaign } from "api/codegen";

export type BusinessCampaignCardProps = {
  className?: string;
  campaign: BusinessCampaign;
  onClick?: () => void;
};
