import { useState } from "react";

import { FungibleToken } from "providers/near/fungible-token";
import currency from "providers/currency";
import splitfund from "providers/splitfund";

const withdraw = () => "{}";

const delegateFunds = () => "{}";

export const useEscrowContract = (contractAddress: string) => {
  const [balanceOf, setBalanceOf] = useState("0.00");

  const getBalanceOf = async (accountId: string) => {
    try {
      const escrow = await FungibleToken.getFromGuestConnection(contractAddress);
      const balance = await escrow.ft_balance_of({ account_id: accountId });

      setBalanceOf(currency.convert.fromUIntAmount(balance, splitfund.getConfig().stableEscrow.ft_metadata.decimals));
    } catch (error) {
      console.log(error);
      // @TODO useToast
    }
  };

  return {
    getBalanceOf,
    balanceOf,
    withdraw,
    delegateFunds,
  };
};
