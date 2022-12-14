import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";
import { ReactNode } from "react";

export type SwapProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
