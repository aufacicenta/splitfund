import { Property } from "api/codegen";

export type HomeProps = {
  featuredActiveHoldings: Property[];
  totalValueLocked: string;
  className?: string;
};
