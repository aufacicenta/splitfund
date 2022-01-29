import { Property } from "api/codegen";
import { ReactNode } from "react";

export type PropertyHeaderProps = {
  property: Property;
  children?: ReactNode;
  className?: string;
};
