import { PropertyCard } from "api/codegen";
import { ReactNode } from "react";

export type PropertyPreviewProps = {
  property: PropertyCard;
  children?: ReactNode;
  className?: string;
};
