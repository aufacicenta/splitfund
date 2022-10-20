import { ApolloServer } from "apollo-server-micro";
import { Driver } from "@bancosatoshi/database";
import { loadTypedefsSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { BusinessDAO } from "@bancosatoshi/database/dao/types";
import { DocumentNode } from "graphql";
import { Resolvers } from "api/codegen/resolvers-types";

import { routes } from "hooks/useRoutes/useRoutes";

const schemas = loadTypedefsSync([path.join(process.cwd(), "/src/pages/api/property/schema.graphql")], {
  loaders: [new GraphQLFileLoader()],
});

const typeDefs = schemas.map((schema) => schema.document) as DocumentNode[];

const resolvers: Resolvers = {
  Query: {},
};

export type ResolversContext = {
  req: NextApiRequest;
  database: {
    driver: typeof Driver;
    dao: BusinessDAO;
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apolloServer = new ApolloServer({ typeDefs, resolvers, context: { req } });
  const startServer = apolloServer.start();

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "https://studio.apollographql.com");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    res.end();

    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: routes.api.graphql,
  })(req, res);

  return null;
}

export const config = {
  api: {
    bodyParser: false,
  },
};
