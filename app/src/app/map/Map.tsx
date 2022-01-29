import React from "react";

import { MapView } from "ui/map/map-view/MapView";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { WalletSelector } from "ui/wallet-selector/WalletSelector";

import { MapProps } from "./Map.types";
import styles from "./Map.module.scss";

export const Map: React.FC<MapProps> = () => {
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
          {/** Implement map markers */}
        </MapView>
      </div>
    </>
  );
};
