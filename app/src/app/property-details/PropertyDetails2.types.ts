import { PropertyCard } from "api/codegen";
import { Contract } from "near-api-js";
import { ReactNode } from "react";

import { ConditionalEscrowMethods, ConditionalEscrowValues } from "providers/near/contract/conditional-escrow.types";

export type PropertyDetailsProps = {
  contractData: ConditionalEscrowValues;
  contract: (Contract & ConditionalEscrowMethods) | undefined;
  property: PropertyCard;
  isContractDataLoading: boolean;
  contractAddress: string;
  children?: ReactNode;
  className?: string;
};
