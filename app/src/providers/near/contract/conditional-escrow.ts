import * as nearAPI from "near-api-js";
import { Account, Contract } from "near-api-js";
import { ContractMethods } from "near-api-js/lib/contract";

import near from "providers/near";
import date from "providers/date";
import getCoinCurrentPrice from "providers/currency/getCoinCurrentPrice";
import { WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";

import { ConditionalEscrowMethods, ConditionalEscrowValues } from "./conditional-escrow.types";

export const VIEW_METHODS = [
  "deposits_of",
  "get_deposits",
  "get_total_funds",
  "get_expiration_date",
  "get_funding_amount_limit",
  "get_unpaid_funding_amount",
  "get_recipient_account_id",
  "is_deposit_allowed",
  "is_withdrawal_allowed",
];

export const CHANGE_METHODS = ["deposit", "withdraw", "delegate_funds"];

export const getDefaultContractValues = (): ConditionalEscrowValues => ({
  totalFunds: near.formatAccountBalance("0"),
  fundingAmountLimit: near.formatAccountBalance("0"),
  unpaidFundingAmount: near.formatAccountBalance("0"),
  depositsOf: "0",
  depositsOfPercentage: 0,
  currentCoinPrice: 0,
  priceEquivalence: 0,
  totalFundedPercentage: 0,
  expirationDate: date.toNanoseconds(date.now().toDate().getTime()),
  recipientAccountId: "",
  isDepositAllowed: false,
  isWithdrawalAllowed: false,
  deposits: [],
});

export const getConstantValues = async (
  contract: Contract & ConditionalEscrowMethods,
  wallet: WalletSelectorContextType,
) => {
  const getTotalFundsResponse = await contract.get_total_funds();
  const getFundingAmountLimitResponse = await contract.get_funding_amount_limit();
  const getUnpaidFundingAmountResponse = await contract.get_unpaid_funding_amount();
  const totalFundedPercentage = (BigInt(getTotalFundsResponse) * BigInt(100)) / BigInt(getFundingAmountLimitResponse);

  const isDepositAllowed = await contract.is_deposit_allowed();
  const isWithdrawalAllowed = await contract.is_withdrawal_allowed();

  const deposits = await contract.get_deposits();
  const expirationDate = await contract.get_expiration_date();
  const depositsOfResponse = await contract.deposits_of({ payee: wallet.address ?? wallet.context.guest.address });
  const depositsOfPercentage = (BigInt(depositsOfResponse) * BigInt(100)) / BigInt(getFundingAmountLimitResponse);

  const currentCoinPrice = await getCoinCurrentPrice("near", "usd");
  const priceEquivalence =
    currentCoinPrice *
    Number(near.formatAccountBalanceFlat(BigInt(getFundingAmountLimitResponse).toString()).replace(",", ""));

  const recipientAccountId = await contract.get_recipient_account_id();

  return {
    totalFunds: near.formatAccountBalance(BigInt(getTotalFundsResponse).toString()),
    fundingAmountLimit: near.formatAccountBalance(BigInt(getFundingAmountLimitResponse).toString()),
    unpaidFundingAmount: near.formatAccountBalance(BigInt(getUnpaidFundingAmountResponse).toString()),
    depositsOf: BigInt(depositsOfResponse).toString(),
    totalFundedPercentage: Number(totalFundedPercentage),
    depositsOfPercentage: Number(depositsOfPercentage),
    currentCoinPrice,
    priceEquivalence,
    deposits,
    expirationDate,
    isDepositAllowed,
    isWithdrawalAllowed,
    recipientAccountId,
  };
};

export function initConditionalEscrowContract<M>(
  account: Account,
  contractAddress: string,
  contractMethods: ContractMethods,
): Contract & M {
  const contract = new nearAPI.Contract(account, contractAddress, contractMethods);

  return contract as Contract & M;
}