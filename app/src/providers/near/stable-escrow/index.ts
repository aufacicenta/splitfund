/* eslint-disable @typescript-eslint/naming-convention */
import { Contract } from "near-api-js";
import { Property } from "api/webhooks/splitfund/strapi-entry-update/types";
import { BN } from "bn.js";

import near from "providers/near";
import ipfs from "providers/ipfs";
import currency from "providers/currency";
import splitfund from "providers/splitfund";
import { FungibleToken } from "../fungible-token";
import date from "providers/date";

import { DepositArgs, StableEscrowMethods, StableEscrowValues } from "./stable-escrow.types";
import { CHANGE_METHODS, VIEW_METHODS } from "./constants";

export class StableEscrow {
  values: StableEscrowValues | undefined;

  contract: Contract & StableEscrowMethods;

  contractAddress: string;

  constructor(contract: Contract & StableEscrowMethods) {
    this.contract = contract;
    this.contractAddress = contract.contractId;
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

  static async getFromConnection(contractAddress: string, accountId: string) {
    const account = await near.getAccount(accountId);

    const contractMethods = { viewMethods: VIEW_METHODS, changeMethods: CHANGE_METHODS };

    return near.initContract<StableEscrowMethods>(account, contractAddress, contractMethods);
  }

  static async getProperty(contractAddress: string): Promise<Property | null> {
    const escrow = await this.getFromGuestConnection(contractAddress);

    const metadata = await escrow.get_metadata();

    const { metadata_url, funding_amount_limit, unpaid_amount, nep_141, expires_at } = metadata;

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

    const expirationDate = date.fromNanoseconds(expires_at);

    const value = currency.convert.fromUIntAmount(
      funding_amount_limit,
      splitfund.getConfig().stableEscrow.ft_metadata.decimals,
    );

    const fundedAmount = currency.convert.fromUIntAmount(
      new BN(funding_amount_limit).sub(new BN(unpaid_amount)).toString(),
      splitfund.getConfig().stableEscrow.ft_metadata.decimals,
    );

    const fundedPercentage = `${new BN(unpaid_amount).div(new BN(funding_amount_limit)).toString()}%`;

    const price = {
      fundedPercentage,
      fundedAmount,
      value,
    };

    const ft = await FungibleToken.getFromGuestConnection(nep_141);

    const { symbol, decimals } = await ft.ft_metadata();

    const token = { address: nep_141, symbol, decimals };

    const depositAccounts = await escrow.get_deposit_accounts();

    const investors = {
      amount: depositAccounts.length,
      wallets: depositAccounts,
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
      expirationDate,
      createNEARContract,
      gallery,
      owner,
      location,
      localizations,
      price,
      token,
      contract: {
        id: contractAddress,
      },
      investors,
    };
  }

  async deposit(args: DepositArgs) {
    const gas = new BN("3000000000000");

    const response = await this.contract.deposit(args, gas.toString());

    return response;
  }
}
