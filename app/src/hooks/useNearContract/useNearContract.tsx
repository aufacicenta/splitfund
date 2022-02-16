import { Contract } from "near-api-js";
import { ContractMethods } from "near-api-js/lib/contract";
import { useEffect, useState } from "react";

import { WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";
import near from "providers/near";

export function useNearContract<M>(
  wallet: WalletSelectorContextType,
  contractAddress: string,
  contractMethods: ContractMethods,
) {
  const [contract, setContract] = useState<(Contract & M) | undefined>(undefined);

  useEffect(() => {
    if ((wallet.isConnected && contract?.account.accountId === wallet.context.guest.address) || !contractAddress) {
      setContract(undefined);
    }

    const getAccount = () => {
      if (!wallet.isConnected) {
        return wallet.context.provider?.account(wallet.context.guest.address);
      }

      return wallet.context.connection?.account();
    };

    const initContract = async () => {
      if (contract) {
        return;
      }

      const account = await getAccount();

      if (!account) {
        // @TODO error toast
        return;
      }

      setContract(near.initContract<M>(account, contractAddress, contractMethods));
    };

    initContract();
  }, [
    contract,
    contractAddress,
    contractMethods,
    wallet.context.connection,
    wallet.context.guest.address,
    wallet.context.provider,
    wallet.isConnected,
  ]);

  return contract;
}
