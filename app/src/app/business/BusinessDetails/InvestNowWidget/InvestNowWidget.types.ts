import { BusinessCampaign } from "api/codegen";
import { ReactNode } from "react";

export type InvestNowWidgetProps = {
  children?: ReactNode;
  className?: string;
  campaign: BusinessCampaign;
};
