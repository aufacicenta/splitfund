/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from "react";

import { useNearWalletSelectorContext } from "hooks/useNearWalletSelectorContext/useNearWalletSelectorContext";
import currency from "providers/currency";
import { FungibleToken } from "providers/near/fungible-token";
import splitfund from "providers/splitfund";

export const useFungibleTokenContract = (contractAddress: string) => {
  const [balance, setBalance] = useState("0.00");

  const nearWalletSelectorContext = useNearWalletSelectorContext();

  const deposit = async (amount: string) => {
    try {
      if (!nearWalletSelectorContext.selector?.isSignedIn()) {
        throw new Error("wallet is not connected");
      }

      const wallet = await nearWalletSelectorContext.selector.wallet();

      const ft = new FungibleToken(wallet);

      const response = await ft.ftTransferCall({
        amount: currency.convert.toUIntAmount(amount).toString(),
        receiver_id: contractAddress,
        msg: "",
      });

      console.log(response);
    } catch (error) {
      console.log(error);
      // @TODO useToast
    }
  };

  const ftBalanceOf = async () => {
    try {
      if (!nearWalletSelectorContext.selector?.isSignedIn()) {
        throw new Error("wallet is not connected");
      }

      const wallet = await nearWalletSelectorContext.selector.wallet();
      const [account] = await wallet.getAccounts();

      const ft = new FungibleToken(wallet);

      const response = await ft.ftBalanceOf({
        account_id: account.accountId,
      });

      return response;
    } catch (error) {
      console.log(error);
      // @TODO useToast
    }

    return balance;
  };

  useEffect(() => {
    if (!nearWalletSelectorContext.selector?.isSignedIn()) {
      return;
    }

    (async () => {
      const ftBalance = await ftBalanceOf();

      setBalance(
        currency.convert.toDecimalsPrecisionString(ftBalance, splitfund.getConfig().stableEscrow.ft_metadata.decimals),
      );
    })();
  }, [nearWalletSelectorContext.selector]);

  return {
    deposit,
    ftBalanceOf,
    balance,
  };
};
