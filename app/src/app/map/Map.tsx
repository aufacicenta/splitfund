import React from "react";

import { MapView } from "ui/map/map-view/MapView";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { MapMarker } from "ui/map/map-marker/MapMarker";

import { MapProps, PropertyMapMarker } from "./Map.types";
import styles from "./Map.module.scss";

export const Map: React.FC<MapProps> = ({ properties }) => {
  const [location, setLocation] = React.useState({ lat: 14.62, lng: -90.53 });

  const setUserLocation = (position: GeolocationPosition) => {
    const {
      coords: { longitude: lng, latitude: lat },
    } = position;

    setLocation({ lat, lng });
  };

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(setUserLocation);
    }
  }, []);

  return (
    <>
      <WalletSelectorNavbar />
      <div className={styles.map}>
        <MapView center={location} zoom={8} options={{ mapTypeControl: false }}>
          {properties?.map((property: PropertyMapMarker) => (
            <MapMarker key={property?.key} position={property?.position} />
          ))}
        </MapView>
      </div>
    </>
  );
};
