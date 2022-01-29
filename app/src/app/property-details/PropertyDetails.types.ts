import { Property } from "api/codegen";
import { ReactNode } from "react";

export type PropertyDetailsProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
