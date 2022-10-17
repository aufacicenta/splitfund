import { ApolloClient, InMemoryCache } from "@apollo/client";

import { routes } from "hooks/useRoutes/useRoutes";

export const GQLClient = new ApolloClient({
  uri: routes.api.graphql,
  cache: new InMemoryCache(),
});
