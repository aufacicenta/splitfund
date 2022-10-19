/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiRequest, NextApiResponse } from "next";

import date from "providers/date";
import splitfund from "providers/splitfund";

import { Property, StableEscrowProps, StrapiPropertyEntry } from "./types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @TODO parse a JWT token for security const { headers } = req;
    const data: StrapiPropertyEntry = req.body;

    if (!data || data?.model !== "property") {
      throw new Error("api/webhooks/splitfund/strapi-entry-update: invalid data.");
    }

    const { entry: property } = data as { entry: Property };

    if (!property.createNEARContract) {
      // eslint-disable-next-line no-console
      console.log(`api/webhooks/splitfund/strapi-entry-update: createNEARContract false for ${property.title}`);

      return;
    }

    // @TODO check for an existing contract by the metadata id and throw if exists

    const id = `SF${property.id}`;
    // @TODO build this URL through the IPFS utils
    const metadata_url = "";
    const expires_at = date.toNanoseconds(date.client(property.expirationDate).utc().valueOf());

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stableEscrowProps: StableEscrowProps = {
      metadata: {
        id,
        expires_at,
        funding_amount_limit: property.price.value,
        // Always zero. It is set in the contract anyway
        unpaid_amount: 0,
        // constant for now, but may be set through the UI in the future
        nep_141: splitfund.getConfig().stableEscrow.ft_metadata.address,
        maintainer_account_id: splitfund.getConfig().stableEscrow.maintainer_account_id,
        // @TODO build this url through the IPFS utils
        metadata_url,
      },
      fees: {
        percentage: splitfund.getConfig().stableEscrow.fees.percentage,
        // Always zero. It is set in the contract anyway
        balance: 0,
      },
      fungible_token_metadata: {
        // Random string, gets set in contract anyway
        spec: "ft-1.0.0",
        name: id,
        symbol: id,
        // Same as the NEP_141 stable collateral
        decimals: splitfund.getConfig().stableEscrow.ft_metadata.decimals,
      },
    };

    // @TODO deploy and init contract here...

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // @TODO log to error logger
    res.status(500).send(error);
  }
};
