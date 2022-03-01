import { PropertyCard } from "api/codegen";

export type HomeProps = {
  featuredActiveHoldings: PropertyCard[];
  totalValueLocked: string;
  className?: string;
};
