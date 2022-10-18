import { Property } from "api/property/types";
import { ReactNode } from "react";

import { ConditionalEscrow } from "providers/near/conditional-escrow";

export type PropertyDetailsProps = {
  property: Property;
  isContractDataLoading: boolean;
  contract?: ConditionalEscrow;
  children?: ReactNode;
  className?: string;
};

export type PropertyDetailsContainerProps = {
  property: Property;
};
