import { useGetActiveBusinessCampaignsQuery } from "api/codegen";

import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { CampaignsGrid } from "./CampaignsGrid";

export const CampaignsGridContainer = () => {
  const {
    data: getBusinessCampaignsQueryData,
    error: getBusinessCampaignsQueryError,
    loading: isGetBusinessByCampaignsQueryLoading,
  } = useGetActiveBusinessCampaignsQuery();

  if (isGetBusinessByCampaignsQueryLoading) {
    return <GenericLoader />;
  }

  if (getBusinessCampaignsQueryError || !getBusinessCampaignsQueryData?.getActiveBusinessCampaigns) {
    // @TODO redirect to generic error page

    return null;
  }

  const campaigns = getBusinessCampaignsQueryData.getActiveBusinessCampaigns;

  return <CampaignsGrid campaigns={campaigns} />;
};
