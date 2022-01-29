import { PropertyContentFragment } from "api/codegen";
import { ReactNode } from "react";

export type PropertyContentProps = {
  content: PropertyContentFragment;
  children?: ReactNode;
  className?: string;
};
