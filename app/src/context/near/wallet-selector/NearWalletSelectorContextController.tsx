import React, { useEffect, useState } from "react";
import { AccountState, NetworkId, setupWalletSelector, WalletSelector } from "@near-wallet-selector/core";
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

export const ACCOUNT_ID_KEY = "SPLITFUND_STATE_SYNC_ACCOUNT_ID";

export const NearWalletSelectorContextController = ({ children }: NearWalletSelectorContextControllerProps) => {
  const [selector, setSelector] = useState<WalletSelector>();
  const [modal, setModal] = useState<WalletSelectorModal>();
  const [accountId, setAccountId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<Array<AccountState>>([]);

  const syncAccountState = (currentAccountId: string | null, newAccounts: Array<AccountState>) => {
    if (!newAccounts.length) {
      localStorage.removeItem(ACCOUNT_ID_KEY);
      setAccountId(null);
      setAccounts([]);

      return;
    }

    const validAccountId = currentAccountId && newAccounts.some((x) => x.accountId === currentAccountId);
    const newAccountId = validAccountId ? currentAccountId : newAccounts[0].accountId;

    localStorage.setItem(ACCOUNT_ID_KEY, newAccountId);
    setAccountId(newAccountId);
    setAccounts(newAccounts);
  };

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

      const state = walletSelector.store.getState();
      syncAccountState(localStorage.getItem(ACCOUNT_ID_KEY), state.accounts);

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
    <NearWalletSelectorContext.Provider value={{ selector, modal, initModal, accountId, accounts }}>
      {children}
    </NearWalletSelectorContext.Provider>
  );
};
