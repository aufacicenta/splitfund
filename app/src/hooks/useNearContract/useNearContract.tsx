import { Contract } from "near-api-js";
import { ContractMethods } from "near-api-js/lib/contract";
import { useEffect, useState } from "react";

import { initConditionalEscrowContract } from "providers/near/contract";
import { WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";

export const useNearContract = (
  wallet: WalletSelectorContextType,
  contractAddress: string,
  contractMethods: ContractMethods,
) => {
  const [contract, setContract] = useState<Contract | undefined>(undefined);

  useEffect(() => {
    if (!wallet.isConnected || !!contract) {
      return;
    }

    const account = wallet.context.connection?.account()!;
    setContract(initConditionalEscrowContract(account, contractAddress, contractMethods));
  }, [contract, contractAddress, contractMethods, wallet.context.connection, wallet.isConnected]);

  return contract;
};
