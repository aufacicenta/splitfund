import { useGetBusinessCampaignBySlugQuery } from "api/codegen";
import { useRouter } from "next/router";
import React from "react";

import { GenericLoader } from "ui/generic-loader/GenericLoader";

import { BusinessDetails } from "./BusinessDetails";

export const BusinessDetailsContainer = () => {
  const router = useRouter();

  const { campaignSlug } = router.query;

  const {
    data: getBusinessCampaignBySlugQueryData,
    error: getBusinessCampaignBySlugQueryError,
    loading: isGetBusinessByCampaignSlugQueryLoading,
  } = useGetBusinessCampaignBySlugQuery({ variables: { input: { slug: campaignSlug as string } } });

  if (isGetBusinessByCampaignSlugQueryLoading) {
    return <GenericLoader />;
  }

  if (
    getBusinessCampaignBySlugQueryError ||
    !getBusinessCampaignBySlugQueryData?.getBusinessCampaignBySlug?.activeCampaign
  ) {
    // @TODO redirect to generic error page

    return null;
  }

  const campaign = getBusinessCampaignBySlugQueryData.getBusinessCampaignBySlug.activeCampaign;

  return <BusinessDetails campaign={campaign} />;
};
