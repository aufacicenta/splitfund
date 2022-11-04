/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextApiRequest, NextApiResponse } from "next";

import date from "providers/date";
import { StableEscrowProps } from "providers/near/stable-escrow/stable-escrow.types";
import splitfund from "providers/splitfund";
import strapi from "providers/strapi";
import { client as supabase } from "providers/supabase/client";

import { Property, StrapiPropertyEntry } from "./types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // @TODO parse a JWT token for security const { headers } = req;
    const data: StrapiPropertyEntry = req.body;

    if (!data || data?.model !== "property") {
      throw new Error("api/webhooks/splitfund/strapi-entry-update: invalid data.");
    }

    const { entry: property } = data as { entry: Property };

    if (!property.createNEARContract || !property.gallery) {
      console.log(
        `api/webhooks/splitfund/strapi-entry-update: createNEARContract false for ${property.title} id:${property.id}`,
      );

      res.status(200).json({
        success: true,
      });

      return;
    }

    try {
      const { data: existingSupabaseProperty, error: onQueryPropertyError } = await supabase
        .from("property")
        .select("*")
        .eq("strapi_property_id", property.id);

      if (onQueryPropertyError) {
        throw new Error(onQueryPropertyError.message);
      }

      if (existingSupabaseProperty) {
        throw new Error("property exists");
      }
    } catch (error) {
      console.log(
        `api/webhooks/splitfund/strapi-entry-update: query supabase property ${property.title} id:${property.id}`,
        error,
      );

      return;
    }

    const id = `splitfund-${property.id}`;
    const name = `Splitfund.xyz Property ${property.id}`;
    const symbol = `SF${property.id}`;

    const expires_at = date.toNanoseconds(date.client(property.expirationDate).utc().valueOf());

    console.log(
      `api/webhooks/splitfund/strapi-entry-update: fetching metadata_url for ${property.title} id:${property.id}`,
    );

    const metadata_url = await strapi.getIPFSUrlFromPropertyEntry(property);

    const {
      price: { value: funding_amount_limit },
    } = property;

    const {
      ft_metadata: { address: nep_141, decimals },
      maintainer_account_id,
      fees: { percentage },
    } = splitfund.getConfig().stableEscrow;

    const stableEscrowProps: StableEscrowProps = {
      metadata: {
        id,
        expires_at,
        funding_amount_limit,
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
        // Always zero. It is set in the contract anyway
        balance: 0,
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

    console.log({ stableEscrowProps });

    // @TODO deploy and init contract here...
    const near_contract_address = "";

    try {
      // @TODO insert property row
      const { data: newSupabaseProperty, error: onInsertPropertyError } = await supabase
        .from("property")
        .insert([{ strapi_property_id: property.id, near_contract_address }]);

      if (onInsertPropertyError) {
        throw new Error(onInsertPropertyError.message);
      }

      console.log(
        `api/webhooks/splitfund/strapi-entry-update: successful supabase property record ${property.title} id:${property.id}`,
        newSupabaseProperty,
      );
    } catch (error) {
      console.log(
        `api/webhooks/splitfund/strapi-entry-update: inserting supabase property record ${property.title} id:${property.id}`,
        error,
      );

      return;
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // @TODO log to error logger
    res.status(500).send(error);
  }
};
