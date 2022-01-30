import React from "react";
import { Property, useGetPropertiesQuery } from "api/codegen";

import { GenericLoader } from "ui/generic-loader/GenericLoader";
import { mapMarkerPropertiesDataParser } from "providers/property/mapMarkerDataParser";

import { Map } from "./Map";

export const MapContainer = () => {
  const {
    data: getPropertiesQueryData,
    error: getPropertiesQueryError,
    loading: isGetPropertiesQueryLoading,
  } = useGetPropertiesQuery();

  if (isGetPropertiesQueryLoading) {
    return <GenericLoader />;
  }

  if (getPropertiesQueryError) {
    return null;
  }

  const properties = mapMarkerPropertiesDataParser(getPropertiesQueryData?.getProperties as Property[]);

  return <Map properties={properties} />;
};
