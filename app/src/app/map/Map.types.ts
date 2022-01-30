import { ReactNode } from "react";

export type MapProps = {
  children?: ReactNode;
  className?: string;
  properties: PropertyMapMarker[];
};

export type PropertyMapMarker = {
  key: string;
  title: string;
  shortDescription: string;
  position: {
    lat: number;
    lng: number;
  };
};
