import { Contract } from "near-api-js";

import ipfs from "providers/ipfs";
import near from "providers/near";
import date from "providers/date";
import currency from "providers/currency";

import { ConditionalEscrowMethods, ConditionalEscrowValues } from "./conditional-escrow.types";

export class ConditionalEscrow {
  contract: Contract & ConditionalEscrowMethods;

  constructor(contract: Contract & ConditionalEscrowMethods) {
    this.contract = contract;
  }

  static getDefaultContractValues = (): ConditionalEscrowValues => ({
    totalFunds: "0",
    fundingAmountLimit: near.formatAccountBalance("0"),
    unpaidFundingAmount: near.formatAccountBalance("0"),
    depositsOf: "0",
    depositsOfPercentage: 0,
    currentCoinPrice: 0,
    priceEquivalence: 0,
    totalFundedPercentage: 0,
    expirationDate: date.toNanoseconds(date.now().toDate().getTime()),
    daoFactoryAccountId: "",
    ftFactoryAccountId: "",
    daoName: "",
    metadataURL: "",
    isDepositAllowed: false,
    isWithdrawalAllowed: false,
    deposits: [],
  });

  static async getCurrentPriceEquivalence(price: number): Promise<number> {
    const currentCoinPrice = await currency.getCoinCurrentPrice("near", "usd");

    return currentCoinPrice * price;
  }

  static async getPropertyFromMetadataUrl(url: string) {
    const response = await fetch(ipfs.asHttpsURL(url), {
      method: "GET",
    });

    const data = await response.json();

    return data;
  }

  async getMetadataUrl(): Promise<string> {
    const metadataURL = await this.contract.get_metadata_url();

    return metadataURL;
  }

  async getTotalFundedPercentage(): Promise<bigint> {
    return (BigInt(await this.getTotalFunds()) * BigInt(100)) / BigInt(await this.getFundingAmountLimit());
  }

  async getTotalFunds(): Promise<number> {
    const response = await this.contract.get_total_funds();

    return response;
  }

  async getFundingAmountLimit(): Promise<number> {
    const response = await this.contract.get_funding_amount_limit();

    return response;
  }
}
