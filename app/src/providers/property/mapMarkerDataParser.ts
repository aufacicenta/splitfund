import _ from "lodash";
import { GetPropertiesQuery } from "api/codegen";
import { PropertyMapMarker } from "app/map/Map.types";

export function mapMarkerPropertiesDataParser(
  properties: GetPropertiesQuery["getProperties"],
): Array<PropertyMapMarker> | [] {
  if (!properties?.length) return [];

  const parsedPropertiesInfo = properties?.map((property) => {
    const title = property?.content.title;

    return {
      key: `property_${_.uniqueId(title)}`,
      title: title as string,
      shortDescription: property?.content.customFields.shortDescription as string,
      position: {
        lat: Number(property?.content?.customFields?.latitude),
        lng: Number(property?.content?.customFields?.longitude),
      },
    };
  });

  return parsedPropertiesInfo;
}
