import { Property } from "api/codegen";
import { QueryResolvers } from "api/codegen/resolvers-types";
import { ResolversContext } from "api/graphql";

import { getPropertiesContent } from "providers/wordpress/getPropertiesContent";

const getProperties: QueryResolvers["getProperties"] = async (
  _,
  _params,
  { res }: ResolversContext,
): Promise<Array<Property>> => {
  const properties = await getPropertiesContent();

  if (!properties.length) {
    res.writeHead(404, { Location: "/404" });
    res.end();
  }

  return properties;
};

export default getProperties;
