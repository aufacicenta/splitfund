import { Property } from "api/codegen";
import { ReactNode } from "react";

export type InvestNowWidgetProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
