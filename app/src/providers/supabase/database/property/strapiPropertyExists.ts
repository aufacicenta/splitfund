import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";

import logger from "providers/logger";
import { client } from "providers/supabase/client";

const strapiPropertyExists = async (property: Property) => {
  logger.info(`querying supabase property for "${property.title}" id:${property.id}`);

  const { data: existingSupabaseProperty, error: onQueryPropertyError } = await client
    .from("property")
    .select("*")
    .eq("strapi_property_id", property.id);

  if (onQueryPropertyError) {
    throw new Error(onQueryPropertyError.message);
  }

  return existingSupabaseProperty?.length && existingSupabaseProperty[0].strapi_property_id === property.id;
};

export default strapiPropertyExists;
