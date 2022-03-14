import { Property } from "api/codegen";
import { ReactNode } from "react";

export type PropertyCardProps = {
  action: ReactNode;
  property: Property;
  children?: ReactNode;
  className?: string;
  minimal?: boolean;
};

export type PropertyCardContainerProps = {
  action: ReactNode;
  property: Property;
  priceEquivalence: string;
  fundedPercentage?: string;
  children?: ReactNode;
  className?: string;
  minimal?: boolean;
};
