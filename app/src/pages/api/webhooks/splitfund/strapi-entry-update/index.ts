/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import date from "providers/date";
import logger from "providers/logger";
import { EscrowFactory } from "providers/near/escrow-factory";
import { StableEscrowProps } from "providers/near/stable-escrow/stable-escrow.types";
import splitfund from "providers/splitfund";
import strapi from "providers/strapi";
import supabase from "providers/supabase";
import near from "providers/near";
import currency from "providers/currency";

import { Property, StrapiPropertyEntry } from "./types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @TODO parse a JWT token for security const { headers } = req;
    const data: StrapiPropertyEntry = req.body;

    if (!data || data?.model !== "property") {
      throw new Error("invalid property data.");
    }

    const { entry: property } = data as { entry: Property };

    if (!property.createNEARContract || !property.gallery) {
      throw new Error(`createNEARContract false for "${property.title}" id:${property.id}.`);
    }

    if (await supabase.database.property.strapiPropertyExists(property)) {
      throw new Error(`supabase property ${property.id} exists.`);
    }

    const id = `splitfund-${property.id}-${uuidv4().slice(0, 4)}`;
    const name = `Splitfund.xyz Property ${property.id}`;
    const symbol = `SF${property.id}`;

    const expires_at = date.toNanoseconds(date.client(property.expirationDate).utc().valueOf());

    const metadata_url = await strapi.getIPFSUrlFromPropertyEntry(property);

    const {
      price: { value: funding_amount_limit },
    } = property;

    const {
      ft_metadata: { address: nep_141, decimals },
      maintainer_account_id,
      fees_account_id,
      fees: { percentage },
    } = splitfund.getConfig().stableEscrow;

    const stableEscrowProps: StableEscrowProps = {
      metadata: {
        expires_at,
        funding_amount_limit: currency.convert.toUIntAmount(Math.ceil(funding_amount_limit), decimals),
        // Always zero. It is set in the contract anyway
        unpaid_amount: 0,
        // constant for now, but may be set through the UI in the future
        nep_141,
        maintainer_account_id,
        // @TODO build this url through the IPFS utils
        metadata_url,
      },
      fees: {
        percentage,
        account_id: fees_account_id,
        amount: 0,
        claimed: false,
      },
      fungible_token_metadata: {
        // Random string, gets set in contract anyway
        spec: "ft-1.0.0",
        name,
        symbol,
        // Same as the NEP_141 stable collateral
        decimals,
      },
    };

    logger.info({ stableEscrowProps });

    // @TODO deploy and init contract here...
    await EscrowFactory.createEscrow(id, stableEscrowProps);
    const near_contract_address = `${id}.${near.getConfig().factoryWalletId}`;

    await supabase.database.property.insert({
      strapi_property_id: property.id,
      near_contract_address,
      ipfs_metadata_url: metadata_url,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    logger.error((error as Error).message);

    res.status(500).send(error);
  }
};
