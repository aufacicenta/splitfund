import BN from "bn.js";
import * as nearAPI from "near-api-js";

export const formatAccountBalance = (balance: string) => nearAPI.utils.format.formatNearAmount(balance);

export const formatAccountBalanceFlat = (balance: string) => nearAPI.utils.format.formatNearAmount(balance);

export function formatGasValue(gas: string | number): BN {
  return new BN(Number(gas) * 10 ** 12);
}
