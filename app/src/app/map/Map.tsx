import React from "react";

import { MapView } from "ui/map/map-view/MapView";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { WalletSelector } from "ui/wallet-selector/WalletSelector";

import { MapProps, PropertyMapMarker } from "./Map.types";
import styles from "./Map.module.scss";
import { MapMarker } from "ui/map/map-marker/MapMarker";

export const Map: React.FC<MapProps> = ({ properties }) => {
  const countryCenter = {
    lat: 14.62,
    lng: -90.53,
  };

  return (
    <>
      <WalletSelectorNavbar>
        <WalletSelector />
      </WalletSelectorNavbar>
      <div className={styles.map}>
        <MapView center={countryCenter} zoom={8} options={{ mapTypeControl: false }}>
          {properties?.map((property: PropertyMapMarker) => (
            <MapMarker key={property?.key} position={property?.position} />
          ))}
        </MapView>
      </div>
    </>
  );
};
