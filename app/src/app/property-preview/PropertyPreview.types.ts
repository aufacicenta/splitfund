import { PropertyCard } from "api/codegen";
import { ReactNode } from "react";

export type PropertyPreviewProps = {
  property: PropertyCard;
  responseId: string;
  children?: ReactNode;
  className?: string;
};
