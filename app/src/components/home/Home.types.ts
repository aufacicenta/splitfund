import { Property } from "api/codegen/strapi";

export type HomeProps = {
  featuredActiveHoldings: Property[];
  totalValueLocked: string;
  className?: string;
};
