import { PropertyCard } from "api/codegen";
import { ReactNode } from "react";

export type PropertyCardProps = {
  action: ReactNode;
  property: PropertyCard;
  children?: ReactNode;
  className?: string;
  minimal?: boolean;
};

export type PropertyCardContainerProps = {
  action: ReactNode;
  property: PropertyCard;
  priceEquivalence: string;
  fundedPercentage?: string;
  children?: ReactNode;
  className?: string;
  minimal?: boolean;
};
