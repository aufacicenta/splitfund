import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";
import { ReactNode } from "react";

export type MarketProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};

export type MarketContainerProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
