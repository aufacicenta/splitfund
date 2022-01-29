import { Property, QueryGetPropertyBySlugArgs } from "api/codegen";
import { QueryResolvers } from "api/codegen/resolvers-types";

import { getPageContentByPropertySlug } from "providers/wordpress/getPageContentByPropertySlug";

const getPropertyBySlug: QueryResolvers["getPropertyBySlug"] = async (
  _,
  { input }: QueryGetPropertyBySlugArgs,
): Promise<Property> => {
  const { slug } = input;
  const content = await getPageContentByPropertySlug(slug);

  return {
    content,
  };
};

export default getPropertyBySlug;
