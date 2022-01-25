import * as nearAPI from "near-api-js";
import { ConnectedWalletAccount, Contract } from "near-api-js";
import { ContractMethods } from "near-api-js/lib/contract";

export function initConditionalEscrowContract<M>(
  account: ConnectedWalletAccount,
  contractAddress: string,
  contractMethods: ContractMethods,
): Contract & M {
  const contract = new nearAPI.Contract(account, contractAddress, contractMethods);

  return contract as Contract & M;
}
