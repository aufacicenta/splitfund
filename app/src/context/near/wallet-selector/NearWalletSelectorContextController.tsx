import React, { useEffect, useState } from "react";
import { NetworkId, setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
import { setupModal, WalletSelectorModal } from "@near-wallet-selector/modal-ui";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupNearFi } from "@near-wallet-selector/nearfi";
import { setupHereWallet } from "@near-wallet-selector/here-wallet";
import { setupMathWallet } from "@near-wallet-selector/math-wallet";
import { setupSender } from "@near-wallet-selector/sender";
import { setupNightly } from "@near-wallet-selector/nightly";
import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupLedger } from "@near-wallet-selector/ledger";
// import { setupWalletConnect } from "@near-wallet-selector/wallet-connect";
// import { setupNightlyConnect } from "@near-wallet-selector/nightly-connect";
// import { setupDefaultWallets } from "@near-wallet-selector/default-wallets";
import { setupCoin98Wallet } from "@near-wallet-selector/coin98-wallet";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

import near from "providers/near";

import { NearWalletSelectorContextControllerProps } from "./NearWalletSelectorContext.types";
import { NearWalletSelectorContext } from "./NearWalletSelectorContext";

export const NearWalletSelectorContextController = ({ children }: NearWalletSelectorContextControllerProps) => {
  const [selector, setSelector] = useState<WalletSelector>();
  const [modal, setModal] = useState<WalletSelectorModal>();

  useEffect(() => {
    (async () => {
      const walletSelector = await setupWalletSelector({
        network: near.getConfig().networkId as NetworkId,
        modules: [
          setupNearWallet(),
          setupMyNearWallet(),
          setupNearFi(),
          setupHereWallet(),
          setupMathWallet(),
          setupSender(),
          setupNightly(),
          setupMeteorWallet(),
          setupLedger(),
          setupCoin98Wallet(),
        ],
      });

      setSelector(walletSelector);
    })();
  }, []);

  const initModal = (contractId: string) => {
    setModal(
      setupModal(selector!, {
        contractId,
      }),
    );
  };

  return (
    <NearWalletSelectorContext.Provider value={{ selector, modal, initModal }}>
      {children}
    </NearWalletSelectorContext.Provider>
  );
};
