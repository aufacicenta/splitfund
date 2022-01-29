import { MarkerProps } from "@react-google-maps/api";
import { ReactNode } from "react";

export type MapMarkerProps = {
  children?: ReactNode;
  className?: string;
} & MarkerProps;
