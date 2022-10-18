import { Contract } from "near-api-js";
import * as nearAPI from "near-api-js";
import { Property } from "api/property/types";
import { Enum_Componentlocationlocation_Countrycode, Enum_Property_Category } from "api/codegen/strapi";

import nearUtils from "providers/near";
import ipfs from "providers/ipfs";
import date from "providers/date";
import currency from "providers/currency";
import { WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";
import getCoinCurrentPrice from "providers/currency/getCoinCurrentPrice";

import { StableEscrowMethods, StableEscrowValues, PropertyMetadata } from "./stable-escrow.types";
import { VIEW_METHODS } from "./constants";

export class StableEscrow {
  values: StableEscrowValues | undefined;

  contract: Contract & StableEscrowMethods;

  contractAddress: string;

  constructor(contract: Contract & StableEscrowMethods) {
    this.contract = contract;
    this.contractAddress = contract.contractId;
  }

  static getDefaultContractValues = (): StableEscrowValues => ({
    totalFunds: "0",
    fundingAmountLimit: nearUtils.formatAccountBalance("0"),
    unpaidFundingAmount: nearUtils.formatAccountBalance("0"),
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

  static async getCurrentPriceEquivalence(price: number = 0): Promise<{ price: number; equivalence: number }> {
    const currentCoinPrice = await currency.getCoinCurrentPrice("near", currency.constants.DEFAULT_VS_CURRENCY);

    return { price: currentCoinPrice, equivalence: currentCoinPrice * price };
  }

  static async getPropertyFromMetadataUrl(url: string): Promise<PropertyMetadata> {
    const response = await fetch(ipfs.asHttpsURL(url), {
      method: "GET",
    });

    const data = await response.json();

    return data;
  }

  static async getFromConnection(contractAddress: string) {
    const near = await nearAPI.connect({
      keyStore: new nearAPI.keyStores.InMemoryKeyStore(),
      headers: {},
      ...nearUtils.getConfig(),
    });

    const account = await near.account(nearUtils.getConfig().guestWalletId);
    const contractMethods = { viewMethods: VIEW_METHODS, changeMethods: [] };

    return nearUtils.initContract<StableEscrowMethods>(account, contractAddress, contractMethods);
  }

  static async getProperty(contractAddress: string): Promise<Property | null> {
    return {
      category: Enum_Property_Category.RealEstate,
      contract: { id: contractAddress },
      expirationDate: "2022-10-25",
      gallery: { data: [{ attributes: { url: "", alternativeText: "alt" } }] },
      id: contractAddress,
      longDescription: "Long description",
      media: { featuredImageUrl: "", ipfsURL: "" },
      owner: { id: "id", name: "Remax", url: "url" },
      investors: { amount: 100 },
      location: {
        id: "id",
        country: "México",
        city: "Mérida",
        state: "Yucatán",
        latitude: "0.1234",
        longitude: "1.2345",
        countryCode: Enum_Componentlocationlocation_Countrycode.Mx,
      },
      price: {
        id: "0",
        value: 25000,
        fundedPercentage: "70%",
        fundedAmount: 15000,
      },
      shortDescription: "Short description",
      title: "A Property",
    };
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

  async delegateFunds(args: { dao_name: string }, gas: string | number): Promise<boolean> {
    const response = await this.contract.delegate_funds(args, gas);

    return response;
  }

  async withdraw(): Promise<void> {
    const response = await this.contract.withdraw();

    return response;
  }

  async deposit(args: Record<string, string>, gas?: number, amount?: string | null): Promise<void> {
    const response = await this.contract.deposit(args, gas, amount);

    return response;
  }

  async setConstantValues(wallet: WalletSelectorContextType) {
    const getTotalFundsResponse = await this.getTotalFunds();
    const getFundingAmountLimitResponse = await this.getFundingAmountLimit();
    const totalFundedPercentage = await this.getTotalFundedPercentage();

    const getUnpaidFundingAmountResponse = await this.contract.get_unpaid_funding_amount();

    const isDepositAllowed = await this.contract.is_deposit_allowed();
    const isWithdrawalAllowed = await this.contract.is_withdrawal_allowed();

    const deposits = await this.contract.get_deposits();
    const expirationDate = await this.contract.get_expiration_date();
    const depositsOfResponse = await this.contract.deposits_of({
      payee: wallet.address ?? wallet.context.guest.address,
    });
    const depositsOfPercentage = (BigInt(depositsOfResponse) * BigInt(100)) / BigInt(getFundingAmountLimitResponse);

    const currentCoinPrice = await getCoinCurrentPrice("near", "usd");
    const { equivalence: priceEquivalence } = await StableEscrow.getCurrentPriceEquivalence(
      Number(nearUtils.formatAccountBalanceFlat(BigInt(getFundingAmountLimitResponse).toString()).replace(",", "")),
    );

    const daoFactoryAccountId = await this.contract.get_dao_factory_account_id();
    const ftFactoryAccountId = await this.contract.get_ft_factory_account_id();
    const daoName = await this.contract.get_dao_name();
    const metadataURL = await this.contract.get_metadata_url();

    this.values = {
      totalFunds: BigInt(getTotalFundsResponse).toString(),
      fundingAmountLimit: nearUtils.formatAccountBalance(BigInt(getFundingAmountLimitResponse).toString(), 8),
      unpaidFundingAmount: nearUtils.formatAccountBalance(BigInt(getUnpaidFundingAmountResponse).toString(), 8),
      depositsOf: BigInt(depositsOfResponse).toString(),
      totalFundedPercentage: Number(totalFundedPercentage),
      depositsOfPercentage: Number(depositsOfPercentage),
      currentCoinPrice,
      priceEquivalence,
      deposits,
      expirationDate,
      isDepositAllowed,
      isWithdrawalAllowed,
      daoFactoryAccountId,
      ftFactoryAccountId,
      daoName,
      metadataURL,
    };
  }
}
