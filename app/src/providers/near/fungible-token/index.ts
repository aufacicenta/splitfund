/* eslint-disable @typescript-eslint/naming-convention */
import { BN } from "bn.js";
import { Wallet } from "@near-wallet-selector/core";
import { FinalExecutionStatus } from "near-api-js/lib/providers";

import near from "..";

import { FtBalanceOfArgs, FtTransferCallArgs, FungibleTokenMethods } from "./fungible-token.types";
import { VIEW_METHODS } from "./constants";

export class FungibleToken {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  static async getFromGuestConnection(contractAddress: string) {
    const guestAccount = await near.getGuestAccount();

    const contractMethods = { viewMethods: VIEW_METHODS, changeMethods: [] };

    return near.initContract<FungibleTokenMethods>(guestAccount, contractAddress, contractMethods);
  }

  async ftBalanceOf(args: FtBalanceOfArgs) {
    const gas = new BN("3000000000000");

    const response = await this.wallet.signAndSendTransaction({
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "ft_balance_of",
            args,
            gas: gas.toString(),
            deposit: "0",
          },
        },
      ],
    });

    console.log(response);

    if ((response?.status as FinalExecutionStatus)?.SuccessValue) {
      return atob((response?.status as FinalExecutionStatus)?.SuccessValue!).replaceAll('"', "");
    }

    return "0.00";
  }

  async ftTransferCall(args: FtTransferCallArgs) {
    const gas = new BN("33000000000000").toString();
    const deposit = "1";

    const response = await this.wallet.signAndSendTransaction({
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: "ft_transfer_call",
            args,
            gas,
            deposit,
          },
        },
      ],
    });

    return response;
  }
}
