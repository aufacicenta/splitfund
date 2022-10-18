import { Property } from "api/property/types";
import { ReactNode } from "react";

export type InvestNowWidgetProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
