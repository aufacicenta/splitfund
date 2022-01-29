import React from "react";
import clsx from "clsx";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";

import styles from "./MapView.module.scss";
import { MapViewProps } from "./MapView.types";

const apiKey = `${process.env.NEXT_PUBLIC_MAPS_API_KEY}`;
const mapId = `${process.env.NEXT_PUBLIC_MAP_ID}`;

export const MapView: React.FC<MapViewProps> = ({ children, className, ...props }) => (
  <LoadScriptNext googleMapsApiKey={apiKey} mapIds={[mapId]}>
    <GoogleMap mapContainerClassName={clsx(styles["map-view"], className)} {...props}>
      {children}
    </GoogleMap>
  </LoadScriptNext>
);
