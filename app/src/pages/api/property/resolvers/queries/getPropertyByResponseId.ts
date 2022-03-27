import { QueryGetPropertyByResponseIdArgs, QueryResolvers } from "api/codegen/resolvers-types";

import typeform from "providers/typeform";

const getPropertyByResponseId: QueryResolvers["getPropertyByResponseId"] = async (
  _,
  { input }: QueryGetPropertyByResponseIdArgs,
) => {
  const { responseId } = input;

  const content = await typeform.getResponseById(responseId);

  return content;
};

export default getPropertyByResponseId;
