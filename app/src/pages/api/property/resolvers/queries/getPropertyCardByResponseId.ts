import { QueryGetPropertyCardByResponseIdArgs } from "api/codegen";
import { QueryResolvers } from "api/codegen/resolvers-types";

import typeform from "providers/typeform";

const getPropertyCardByResponseId: QueryResolvers["getPropertyCardByResponseId"] = async (
  _,
  { input }: QueryGetPropertyCardByResponseIdArgs,
) => {
  const { responseId } = input;

  const content = await typeform.getResponseById(responseId);

  return content;
};

export default getPropertyCardByResponseId;
