import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";
import { ReactNode } from "react";

export type RefSwapWidgetProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
