import React from "react";
import { InfoWindow, Marker } from "@react-google-maps/api";

import { MapMarkerProps } from "./MapMarker.types";

export const MapMarker: React.FC<MapMarkerProps> = ({ children, ...props }) => {
  const [markerInstance, setMarkerInstance] = React.useState<google.maps.Marker>();
  const [isInfoWindowVisible, setInfoWindowVisibility] = React.useState(false);

  const onLoad = (marker: google.maps.Marker) => {
    setMarkerInstance(marker);
  };

  return (
    <>
      <Marker {...props} onClick={() => setInfoWindowVisibility(true)} onLoad={onLoad}>
        {children && isInfoWindowVisible && (
          <InfoWindow onCloseClick={() => setInfoWindowVisibility(false)} anchor={markerInstance}>
            {children}
          </InfoWindow>
        )}
      </Marker>
    </>
  );
};
