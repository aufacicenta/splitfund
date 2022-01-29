import { GoogleMapProps } from "@react-google-maps/api";
import { ReactNode } from "react";

export type MapViewProps = {
  children?: ReactNode;
  className?: string;
} & GoogleMapProps;
