import getConfig from "./getConfig";
import initWalletConnection from "./initWalletConnection";
import getAccountBalance from "./getAccountBalance";
import parseNearAmount from "./parseNearAmount";
import initContract from "./initContract";
import { formatAccountBalance, formatAccountBalanceFlat, formatGasValue } from "./format";
import getGuestAccount from "./getGuestAccount";
import getPrivateKeyConnection from "./getPrivateKeyConnection";
import getAccount from "./getAccount";

export default {
  getAccount,
  getPrivateKeyConnection,
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
