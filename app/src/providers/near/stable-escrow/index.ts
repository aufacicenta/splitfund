/* eslint-disable @typescript-eslint/naming-convention */
import { Contract } from "near-api-js";
import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";

import near from "providers/near";
import ipfs from "providers/ipfs";
import currency from "providers/currency";
import logger from "providers/logger";

import { StableEscrowMethods, StableEscrowValues } from "./stable-escrow.types";
import { VIEW_METHODS } from "./constants";

export class StableEscrow {
  values: StableEscrowValues | undefined;

  contract: Contract & StableEscrowMethods;

  contractAddress: string;

  constructor(contract: Contract & StableEscrowMethods) {
    this.contract = contract;
    this.contractAddress = contract.contractId;
  }

  static async getCurrentPriceEquivalence(price: number = 0): Promise<{ price: number; equivalence: number }> {
    const currentCoinPrice = await currency.getCoinCurrentPrice("near", currency.constants.DEFAULT_VS_CURRENCY);

    return { price: currentCoinPrice, equivalence: currentCoinPrice * price };
  }

  static async getPropertyFromMetadataUrl(url: string): Promise<Property> {
    const response = await fetch(ipfs.asHttpsURL(url), {
      method: "GET",
    });

    const data = await response.json();

    return data;
  }

  static async getFromGuestConnection(contractAddress: string) {
    const guestAccount = await near.getGuestAccount();

    const contractMethods = { viewMethods: VIEW_METHODS, changeMethods: [] };

    return near.initContract<StableEscrowMethods>(guestAccount, contractAddress, contractMethods);
  }

  static async getProperty(contractAddress: string): Promise<Property | null> {
    const contract = await this.getFromGuestConnection(contractAddress);

    const metadata = await contract.get_metadata();

    logger.info({ metadata });

    const { metadata_url } = metadata;

    const ipfsData = await ipfs.fetch<Property>(metadata_url);

    const {
      id,
      title,
      createdAt,
      updatedAt,
      publishedAt,
      shortDescription,
      longDescription,
      category,
      locale,
      createNEARContract,
      gallery,
      owner,
      localizations,
      location,
    } = ipfsData;

    // @TODO fill with values calculated from contract amounts
    const price = {
      fundedPercentage: "50%",
      fundedAmount: 75000,
    };

    // @TODO fill with data from contract
    const investors = {
      amount: 150,
      wallets: ["wallet1.near"],
    };

    return {
      id,
      title,
      createdAt,
      updatedAt,
      publishedAt,
      locale,
      shortDescription,
      longDescription,
      category,
      expirationDate: "2022-12-31T06:00:00.000Z",
      createNEARContract,
      gallery,
      owner,
      location,
      localizations,
      price: { id: 1, value: 154122.91, ...price },
      token: { id: 1, address: "usdt.fakes.testnet", symbol: "USDT", decimals: 6 },
      contract: {
        id: contractAddress,
      },
      investors,
    };
  }
}
