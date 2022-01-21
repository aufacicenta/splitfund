import { useState } from "react";

import { WalletSelectorChain, WalletSelectorContextType } from "context/wallet-selector/WalletSelectorContext.types";

export const useWalletState = () => {
  const network = useState<string | undefined>(undefined);
  const chain = useState<WalletSelectorChain | undefined>(undefined);
  const address = useState<WalletSelectorContextType["address"]>(undefined);
  const balance = useState("0.00");
  const isConnected = useState(false);

  return {
    network,
    chain,
    address,
    balance,
    isConnected,
  };
};
