import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";
import { ReactNode } from "react";

export type PropertyDetailsProps = {
  property: Property;
  isContractDataLoading: boolean;
  children?: ReactNode;
  className?: string;
};

export type PropertyDetailsContainerProps = {
  property: Property;
};
