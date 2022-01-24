import * as nearAPI from "near-api-js";
import { ConnectedWalletAccount, Contract } from "near-api-js";
import { ContractMethods } from "near-api-js/lib/contract";

export const initConditionalEscrowContract = (
  account: ConnectedWalletAccount,
  contractAddress: string,
  contractMethods: ContractMethods,
): Contract => new nearAPI.Contract(account, contractAddress, contractMethods);
