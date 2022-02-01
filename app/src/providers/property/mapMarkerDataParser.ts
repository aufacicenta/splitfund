import _ from "lodash";
import { Property } from "api/codegen";

import { PropertyMapMarker } from "app/map/Map.types";

export function mapMarkerPropertiesDataParser(properties: Array<Property>): Array<PropertyMapMarker> | [] {
  if (!properties?.length) return [];

  const parsedPropertiesInfo = properties!.map((property) => {
    const { title } = property.content;

    return {
      key: `property_${_.uniqueId(title)}`,
      title,
      shortDescription: property.content.customFields.shortDescription,
      position: {
        lat: Number(property.content.customFields.latitude),
        lng: Number(property.content.customFields.longitude),
      },
    };
  });

  return parsedPropertiesInfo;
}
