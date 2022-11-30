import { ftGetTokenMetadata, init_env } from "@ref-finance/ref-sdk";
import { NextApiRequest, NextApiResponse } from "next";

import logger from "providers/logger";
import near from "providers/near";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @TODO parse a JWT token for security const { headers } = req;
    logger.info(req.query);
    const data: Partial<{ accountId: string }> = req.query;

    if (!data.accountId) {
      throw new Error("invalid accountId.");
    }

    init_env(near.getConfig().networkId);

    const ftMetadata = await ftGetTokenMetadata(data.accountId);

    res.status(200).json({
      success: true,
      ftMetadata,
    });
  } catch (error) {
    logger.error(error);

    res.status(500).json({
      success: false,
    });
  }
};
