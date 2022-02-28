import { PropertyCard } from "api/codegen";
import { ReactNode } from "react";

export type PropertiesExplorerProps = {
  properties: PropertyCard[];
  children?: ReactNode;
  className?: string;
};
