import { ReactNode } from "react";

export type PropertyCardProps = {
  children?: ReactNode;
  className?: string;
  minimal?: boolean;
  action: ReactNode;
};