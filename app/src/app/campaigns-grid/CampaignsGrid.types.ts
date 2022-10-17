import { GetActiveBusinessCampaignsQuery } from "api/codegen";

export type CampaignsGridProps = {
  className?: string;
  campaigns: GetActiveBusinessCampaignsQuery["getActiveBusinessCampaigns"];
};
