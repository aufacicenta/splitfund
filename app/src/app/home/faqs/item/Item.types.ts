import { ReactNode } from "react";

export type ItemProps = {
  children?: ReactNode;
  className?: string;
  title: string;
  description: string;
};
