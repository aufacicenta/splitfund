import { Property } from "api/codegen";
import { ReactNode } from "react";

export type PropertiesExplorerProps = {
  properties: Property[];
  children?: ReactNode;
  className?: string;
};
