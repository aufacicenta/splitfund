import { Property } from "api/codegen";
import { ReactNode } from "react";

export type PropertyDetailsProps = {
  property: Property;
  isContractDataLoading: boolean;
  children?: ReactNode;
  className?: string;
};

export type PropertyDetailsContainerProps = {
  property: Property;
};
