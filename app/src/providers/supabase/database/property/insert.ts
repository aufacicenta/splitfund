import logger from "providers/logger";
import { client } from "providers/supabase/client";

const insert = async ({
  strapi_property_id,
  near_contract_address,
  ipfs_metadata_url,
}: {
  strapi_property_id: number;
  near_contract_address: string;
  ipfs_metadata_url: string;
}) => {
  logger.info(`inserting supabase property [strapi_property_id ${strapi_property_id}]`);

  const { error } = await client
    .from("property")
    .insert([{ strapi_property_id, near_contract_address, ipfs_metadata_url }]);

  if (error) {
    throw new Error(error.message);
  }

  logger.info(`successful property record`);
};

export default insert;
