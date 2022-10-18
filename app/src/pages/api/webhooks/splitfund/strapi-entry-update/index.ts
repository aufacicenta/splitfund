import { Property } from "api/codegen/strapi";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @TODO parse a JWT token for security const { headers } = req;
    const data = req.body;

    if (!data || data?.model !== "property" || !data?.entry?.createNEARContract) {
      throw new Error("api/webhooks/splitfund/strapi-entry-update: invalid data.");
    }

    const { entry: property } = data as { entry: Property };

    if (property.createNEARContract) {
      // @TODO check for an existing contract by the medatata id
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // @TODO log to error logger
    res.status(500).send(error);
  }
};
