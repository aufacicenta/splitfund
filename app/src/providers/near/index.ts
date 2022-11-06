import getConfig from "./getConfig";
import initWalletConnection from "./initWalletConnection";
import getAccountBalance from "./getAccountBalance";
import parseNearAmount from "./parseNearAmount";
import initContract from "./initContract";
import { formatAccountBalance, formatAccountBalanceFlat, formatGasValue } from "./format";
import getGuestAccount from "./getGuestAccount";

export default {
  getGuestAccount,
  getConfig,
  initWalletConnection,
  getAccountBalance,
  formatAccountBalance,
  formatAccountBalanceFlat,
  parseNearAmount,
  formatGasValue,
  initContract,
};
